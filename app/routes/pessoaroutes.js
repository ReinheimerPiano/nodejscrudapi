var Pessoa = require('../models/pessoa');
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
router.route('/pessoa')
    //POST para pessoa (CREATE)
    .post(function (req, res) {
        var pessoa = new Pessoa();
        pessoa.set(req.body);

        pessoa.save(function (error) {
            if (error)
                res.send("Erro ao tentar salvar uma nova pessoa" + error);
            res.status(201).json(pessoa);
        });
    })

    .get(function (req, res) {
        Pessoa.find(function (err, pessoas) {
            if (err)
                res.send(err);

            res.status(200).json(pessoas);
        });
    })
    .put(function (req, res) {
        Pessoa.findById(req.body._id, function (err, pessoa) {
            if (err) {
                res.status(500).json({
                    message: "Id mal formado, erro ao encontrar pessoa"
                });
            } else if (pessoa == null) {
                res.status(400).json({
                    message: "pessoa não encontrada"
                });
            } else {
                pessoa.set(req.body);
                pessoa.save(function (err) {
                    if (err) {
                        res.send("Erro ao tentar atualizar a pessoa" + err)
                    }
                    res.status(200).json({ message: "pessoa atualizada com suscesso" });
                });
            }
        });
    });

//Get By Id
router.route('/pessoa/:pessoaId')
    .get(function (req, res) {
        const id = req.params.pessoaId;

        Pessoa.findById(id, function (err, pessoa) {
            if (err) {
                res.status(500).json({
                    message: "Erro ao tentar encontrar pessoa, Id mal formado"
                });
            } else if (pessoa == null) {
                res.status(400).json({
                    message: "pessoa não encontrada"
                });
            } else {
                res.status(200).json(pessoa);
            }
        });
    })

    .delete(function (req, res) {
        console.log("Removing: ", req.params.pessoaId)
        Pessoa.findByIdAndRemove(req.params.pessoaId, (err, pessoa) => {
            if (err) return res.status(500).send(err);
            const response = {
                message: "pessoa removida com sucesso",
                id: pessoa._id
            };
            return res.status(200).send(response);
        });
    });

module.exports = router;