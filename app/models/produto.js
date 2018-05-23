const mongoose = require('mongoose');
const produtoSchema = mongoose.Schema({
    nome: String,
    preco: Number,
    descricao: String
});
module.exports = mongoose.model('Produto', produtoSchema);