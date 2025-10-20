const express = require('express');
const app = express();
const { engine } = require ('express-handlebars');

//importando css e bootstrap para o app
app.use('/bootstrap', express.static(__dirname+'/node_modules/bootstrap/dist'));
app.use('/css', express.static(__dirname+'/css'));

//indicando que usaremos json nesse app
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// configurações obrigatórias do handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

//rotas
app.get('/ordemServico', (req,res) => {
    res.render('paginaOrdemServico')
})

app.get('/caixa', (req,res) => {
    res.render('paginaCaixa')
})

app.get('/recibo', (req,res) => {
    res.render('paginaRecibo')
})

app.get('/cliente', (req,res) => {
    res.render('paginaCliente')
})

app.get('/agenda', (req,res) => {
    res.render('paginaAgenda')
})

app.get('/produto', (req,res) => {
    res.render('paginaProduto')
})

app.get('/', (req,res) => {
    res.render('mainPage')
})

app.listen(8080);