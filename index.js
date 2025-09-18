const express = require("express");
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const Post = require('./models/Post');
const User = require('./models/User');

// Conectar ao MongoDB
const connectDB = require('./models/db');
connectDB();

// Configuração da Sessão
const mongoUrl = process.env.MONGO_URI || 'mongodb://blog-db:27017/meu-blog';
app.use(session({
  secret: 'chave123',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl })
}));

// Configuração handlebars
app.engine('handlebars', handlebars.engine({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials')
}));

app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use("/static", express.static('public/'));

// Rota para exibir o formulário de login
app.get('/login', (req, res) => {
  res.render('login', {layout: 'auth-layout'});
});

// Rota para processar o login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.redirect('/register');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) {
    req.session.userId = user._id;
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});

// Rota de Logout
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.redirect('/');
    }
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
});

app.get('/register', (req, res) => {
  res.render('register', {layout: 'auth-layout'}); 
});

app.post('/register', async (req, res) => {
  const { username, name, email, password } = req.body;
  const userExists = await User.findOne({ username });
  if (userExists) { return res.send('Usuário já existe!'); }

  const user = new User({ username, name, email, password });
  if(user) {
    await user.save();
    res.redirect('/login');
  } else {

  }
});


// Middleware para verificar se o usuário está logado
const hasAuth = async (req, res, next) => {
  const userId = req.session.userId;

  if (!userId) { return res.redirect('/'); }

  try {
    const user = await User.findById(userId);
    if (!user) {
        req.session.destroy();
        return res.redirect('/login');
    }
    req.user = user;
    next();
  } catch (error) {
      console.error(error);
      return res.redirect('/login');
  }
};

// Middleware para adicionar dados do usuário a `res.locals`
app.use(async (req, res, next) => {
  if (req.session.userId) {
    try {
      const user = await User.findById(req.session.userId);
      if (user) {
        res.locals.hasUser = true;
      }
    } catch (error) {
      console.error(error);
    }
  }
  next();
});

app.get('/', async (req, res) => {
  let username = "DevSousa";
  const user = await User.findOne(username);

  console.log(res.locals);

  try {
    const posts = await Post.find().populate('autor', 'username').sort({createdAt: 'desc'}).lean();
    res.render('home', { posts, layout: 'dashboard-layout' });
  } catch (err) {
    res.send("Erro ao carregar postagens.");
  }
});

//rota para o cadastro
app.get('/cad', hasAuth , function(req, res){
  const bgColor = "#27ae60";
  res.render('form', {
    bgColor: bgColor,
    layout: 'dashboard-layout'
  });
});

app.post('/add', hasAuth, async (req, res) => {
  try {
    await Post.create({
      titulo: req.body.insereTitulo,
      conteudo: req.body.insereConteudo,
      autor: req.session.userId
    });
    res.redirect('/');
  } catch (err) {
    res.send("Houve um erro ao criar a postagem: " + err);
  }
});

// rota para alterar
app.get('/alterar/:id', hasAuth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).lean();
    const bgColor = "#3498db";
    res.render('alterar', {
      post,
      bgColor: bgColor,  
      layout: 'dashboard-layout'
    });
  } catch (err) {
    res.send("Post não encontrado.");
  }
});

// alteração no banco
app.post('/update', hasAuth, async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.body.id, {
      titulo: req.body.titulo,
      conteudo: req.body.conteudo
    });
    res.redirect('/');
  } catch (err) {
    res.send("Erro ao atualizar a postagem: " + err);
  }
});

// Deletar postagem
app.get('/deletar/:id', hasAuth, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (err) {
    res.send("Erro ao deletar a postagem: " + err);
  }
});

app.listen(3000, function(){
  console.log("Servidor Rodando na porta 3000");
});