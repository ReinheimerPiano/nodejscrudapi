var Pedido = require('../models/pedido');
var express = require('express');
//Definindo as rotas
var router = express.Router();//intercepta todas as rotas

//MIDDLEWARE
router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

router.get('/', function (req, res) {
    res.json({ 'message': 'Ok, rota principal funcionando' });
});
router.route('/pedido')
    //POST para pedido (CREATE)
    .post(function (req, res) {
        var pedido = new Pedido();
        pedido.set(req.body);

        pedido.save(function (error) {
            if (error)
                res.send("Erro ao tentar salvar um novo pedido" + error);

            res.status(201).json({ message: 'pedido inserido com sucesso' });
        });
    })

    .get(function (req, res) {
        Pedido.find().populate("produto").populate("cliente").exec(function (err, pedidos) {
            if (err)
                res.send(err);

            res.status(200).json(pedidos);
        });
    });

//Get By Id
router.route('/pedido/:pedidoId')
    .get(function (req, res) {
        const id = req.params.pedidoId;

        Pedido.findOne({ _id: id }).populate("produto").populate("cliente").exec(function (err, pedido) {
            if (err) {
                res.status(500).json({
                    message: "Erro ao tentar encontrar pedido, Id mal formado"
                });
            } else if (pedido == null) {
                res.status(400).json({
                    message: "Pedido não encontrado"
                });
            } else {
                res.status(200).json(pedido);
            }
        });
    })

module.exports = router;