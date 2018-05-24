var Produto = require('../models/produto');
var express = require('express');
//Definindo as rotas
var router = express.Router();//intercepta todas as rotas

//MIDDLEWARE
router.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

router.get('/', function(req, res){
    res.json({'message':'Ok, rota principal funcionando'});
});
router.route('/produto')
//POST para produtos (CREATE)
.post(function(req,res){
    var produto = new Produto();
    produto.set(req.body)

    produto.save(function(error){
        if(error)
            res.send("Erro ao tentar salvar um novo produto"+ error);

        res.status(201).json(produto);    
    });
})

.get(function(req, res){
    Produto.find(function(err, prods){
        if(err){
            res.send(err);
        }
        res.status(200).json(prods);
    });
})

.put(function(req, res){
    const id = req.body._id;
    Produto.findById(id, function(err, produto){
        if(err){
            res.status(500).json({
               message: "Id mal formado, erro ao encontrar produto" 
            });
        } else if(produto == null){
            res.status(400).json({
                message:"Produto não encontrado"
            });
        } else {
            produto.set(req.body);
            produto.save(function(err){
                if(err){
                    res.send("Erro ao tentar atualizar o produto"+ err)
                }
                res.status(200).json(produto);
            });
        }
    });
});

    //Get By Id
router.route('/produto/:productId')
.get(function(req,res){
    const id = req.params.productId;

    Produto.findById(id, function(err,produto){
        if(err){
            res.status(500).json({
                message:"Erro ao tentar encontrar produto, Id mal formado"
            });
        } else if(produto== null){
            res.status(400).json({
                message:"Produto não encontrado"
            });
        } else {
            res.status(200).json(produto);
        }
    });
})

.delete(function(req,res){
    Produto.findByIdAndRemove(req.params.productId, (err, produto) => {
        if(err) return res.status(500).send(err);
        const response = {
            message: "Produto removido com sucesso",
            id: produto.id
        };
        return res.status(200).send(response);
    });
});

module.exports = router;