
//importar pacotes 
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var produtorouter = require('./app/routes/produtoroutes');
var clienterouter = require('./app/routes/clienteroutes');
var pedidorouter = require('./app/routes/pedidoroutes');


//PERSISTÊNCIA
mongoose.connect('mongodb://localhost/bdCrud');

//Configurar a app para usar o body-parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Definindo a porta onde o servidor vai responder
var port = process.env.port || 8000;

//Vinculo da app com o motor de rotas
//Dedfinindo uma rota padrão para as minhas apis
app.use('/api', produtorouter);
app.use('/api', clienterouter);
app.use('/api', pedidorouter);

app.listen(port);
console.log("API up and running! on port " + port);
