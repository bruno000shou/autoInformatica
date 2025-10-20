const express = require('express');
const app = express();
const { engine } = require ('express-handlebars');

//importando css e bootstrap para o app
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'));
app.use('/css', express.static('./css'));

//indicando que usaremos json nesse app
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// configurações obrigatórias do handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');


app.get('/', (req,res) => {
    res.render('mainPage')
})

app.listen(8080);