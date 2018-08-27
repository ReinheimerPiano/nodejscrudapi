var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pessoaSchema = new Schema({
    nome: String,
    email: String
});

module.exports = mongoose.model('Pessoa', pessoaSchema);
