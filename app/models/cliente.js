var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clienteSchema = new Schema({
    nome: String,
    dataNascimento: Date,
    email: String
});

module.exports = mongoose.model('Cliente', clienteSchema);
