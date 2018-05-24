var Cliente = require('../models/cliente');
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
router.route('/cliente')
    //POST para cliente (CREATE)
    .post(function (req, res) {
        var cliente = new Cliente();
        cliente.set(req.body);

        cliente.save(function (error) {
            if (error)
                res.send("Erro ao tentar salvar um novo produto" + error);
            res.status(201).json(cliente);
        });
    })

    .get(function (req, res) {
        Cliente.find(function (err, clientes) {
            if (err)
                res.send(err);

            res.status(200).json(clientes);
        });
    })
    .put(function (req, res) {
        Cliente.findById(req.body._id, function (err, cliente) {
            if (err) {
                res.status(500).json({
                    message: "Id mal formado, erro ao encontrar cliente"
                });
            } else if (cliente == null) {
                res.status(400).json({
                    message: "Cliente não encontrado"
                });
            } else {
                cliente.set(req.body);
                cliente.save(function (err) {
                    if (err) {
                        res.send("Erro ao tentar atualizar o cliente" + err)
                    }
                    res.status(200).json({ message: "Cliente atualizado com suscesso" });
                });
            }
        });
    });

//Get By Id
router.route('/cliente/:clienteId')
    .get(function (req, res) {
        const id = req.params.clienteId;

        Cliente.findById(id, function (err, cliente) {
            if (err) {
                res.status(500).json({
                    message: "Erro ao tentar encontrar cliente, Id mal formado"
                });
            } else if (cliente == null) {
                res.status(400).json({
                    message: "Cliente não encontrado"
                });
            } else {
                res.status(200).json(cliente);
            }
        });
    })

    .delete(function (req, res) {
        console.log("Removing: ", req.params.clienteId)
        Cliente.findByIdAndRemove(req.params.clienteId, (err, cliente) => {
            if (err) return res.status(500).send(err);
            const response = {
                message: "Cliente removido com sucesso",
                id: cliente._id
            };
            return res.status(200).send(response);
        });
    });

module.exports = router;