const express = require("express");
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Post = require('./models/Post');
const path = require('path')



// Configuração handlebars
app.engine('handlebars', handlebars.engine({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials')
}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use("/abacaxi", express.static('public/estilos'));
app.use("/imagens", express.static("public/img"));

//rota principal
app.get('/', function(req, res){
  Post.findAll().then(function(posts){
    posts=posts.map((post) => {return post.toJSON()});
    res.render('home', {posts: posts, layout: 'content-layout'})
  });
});

//rota para o cadastro
app.get('/cad', function(req, res){
  res.render('form', {layout: 'content-layout'});
});

//fazendo a inserção no banco
app.post('/add', function(req, res){
  Post.create({
    titulo: req.body.insereTitulo,
    conteudo: req.body.insereConteudo
  }).then(function(){
    //redirecionando para home com o barra
    res.redirect('/')
  }).catch(function(erro){
    res.send('"Houve um erro: '+erro);
  });
});

// rota para alterar
app.get   ('/alterar/:id', function(req, res) {
  Post.findAll({where: {id: req.params.id}}).
    then(function(posts) {

      posts=posts.map((post) => {return post.toJSON()});
      res.render('alterar', {posts: posts, layout: 'content-layout'})
    });
});

// alteração no banco
app.post('/update', function(req, res) {
  Post.update({
    titulo: req.body.titulo,
    conteudo: req.body.conteudo
  },{
    where: {id: req.body.id}
  }).then(function(){
    res.redirect('/');
  }).catch(function(erro){
    res.send("Está postagem não existe" + erro)
  });
});

// Deletar postagem
app.get('/deletar/:id', function(req, res){
  Post.destroy({where: {'id': req.params.id}}).
    then(function() {
      res.redirect('/');
    }).catch(function(erro) {
      res.send("Está postagem não existe");
    })
})

app.listen(8081, function(){
  console.log("Servidor Rodando");
});
