const express = require('express');
const app = express();
const { engine } = require ('express-handlebars');
const routes = require('./src/routes');

//dados e conexão com o banco de dado SUPABASE
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://clqvdoimglscncxhkogb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNscXZkb2ltZ2xzY25jeGhrb2diIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyMzQzOTYsImV4cCI6MjA3NjgxMDM5Nn0.YjFphNwSUF2S6W03rflKE6OvbQIjqWPhRY9WrSWVfZo';
const supabase = createClient(supabaseUrl, supabaseKey);
//comando para deixar o supabase acessível de toda a aplicação
app.locals.supabase = supabase;

//importando css e bootstrap para o app
app.use('/bootstrap', express.static(__dirname+'/node_modules/bootstrap/dist'));
app.use('/css', express.static(__dirname+'/css'));
app.use(express.static('public'));

//indicando que usaremos json nesse app
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//rotear para o arquivo routes
app.use('/', routes);

// configurações obrigatórias do handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

//rotas


app.listen(8080);