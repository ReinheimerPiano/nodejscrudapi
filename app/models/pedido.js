
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pedidoSchema = new Schema({
    quantidade: Number,
    total: Number,
    data: Date,
    produto:{type:Schema.Types.ObjectId, ref: 'Produto'},
    cliente:{type:Schema.Types.ObjectId, ref: 'Cliente'}
});

module.exports = mongoose.model('Pedido', pedidoSchema);
