var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.port || 8000;

var router = express.Router();

router.use(function(req,res,next){
    console.log("Interceptação pelo middleware ok");
    next();
});

router.get('/', function(req,res){
    res.json({'message':'OK, rota de teste está funcionando'});
});

app.use('/api', router);

app.listen(port);
console.log("API Server is uo and running! on port" + port)