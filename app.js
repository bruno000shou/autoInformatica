const express = require('express');
const app = express();
const { engine } = require ('express-handlebars');
const routes = require('./src/routes')

//importando css e bootstrap para o app
app.use('/bootstrap', express.static(__dirname+'/node_modules/bootstrap/dist'));
app.use('/css', express.static(__dirname+'/css'));

//rotear para o arquivo routes
app.use('/', routes);

//indicando que usaremos json nesse app
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// configurações obrigatórias do handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

//rotas


app.listen(8080);