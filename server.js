
//importar pacotes 
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var pessoarouter = require('./app/routes/pessoaroutes');

//PERSISTÊNCIA
mongoose.connect('mongodb://admin:admin123@ds018258.mlab.com:18258/pessoa');

//Configurar a app para usar o body-parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Definindo a porta onde o servidor vai responder
var port = process.env.port || 8000;

//Vinculo da app com o motor de rotas
//Dedfinindo uma rota padrão para as minhas apis
app.use('/api', pessoarouter);

app.listen(port);
console.log("API up and running! on port " + port);
