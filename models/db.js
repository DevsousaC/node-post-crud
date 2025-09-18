const mongoose = require('mongoose');

const dbURI = process.env.MONGO_URI || 'mongodb://blog-db:27017/meu-blog';

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {});
    console.log(`MongoDB conectado com sucesso em: ${dbURI}`);
  } catch (err) {
    console.error('Erro ao conectar com o MongoDB:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;