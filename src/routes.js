const express = require('express');
const router = express.Router();
const { getFormData } = require('./services');
const postOrdemServicoInst = require('./supabaseServices')

router.get('/', (req,res) => {
    res.render('mainPage')
});



router.get('/ordemServico',  async (req,res) => {
    //verifica se pesquisa esta vazio
    const pesquisa = req.query.nomePesquisaCliente;
    if (!pesquisa) {
        return res.render('paginaOrdemServico');
    };
    //verifica se pesquisa é uma string de numeros ou letras
    if (/^\d+$/.test(pesquisa)) {
        const { data: resultadosTelefone, error: erroTelefone } = await req.app.locals.supabase
        .from('clientes')
        .select('*')
        .or(`telefoneUm.ilike.%${pesquisa}%,telefoneDois.ilike.%${pesquisa}%`);
        res.send(resultadosTelefone);
    if (erroTelefone) {
        console.error('Erro ao buscar por telefone:', erroTelefone);
        return res.status(500).send('Erro ao buscar por telefone');
    };
    } else {
        try {
        // Sendo um texto, busca no banco registros cujo nome contém a string digitada na tabela de clientes 
        const { data: resultados, error } = await req.app.locals.supabase
            .from('clientes')
            .select('*')
            .ilike('nome', `%${pesquisa}%`); 
        //aqui ja tenho em resultados a minha pesquisa
        if (error) {
            console.error('Erro ao buscar dados:', error);
            return res.status(500).send('Erro ao buscar dados');
        };
        res.send(resultados)
    } catch (err) {
        console.error('Erro inesperado:', err);
        res.status(500).send('Erro inesperado');
    };
    }; 
});
router.post('/ordemServico', async (req, res) => {
    postOrdemServicoInst.postOrdemServico(req, res)
});



router.get('/caixa', (req,res) => {
    res.render('paginaCaixa')
});

router.get('/recibo', (req,res) => {
    res.render('paginaRecibo')
});

router.get('/cliente', (req,res) => {
    res.render('paginaCliente')
});

router.get('/agenda', (req,res) => {
    res.render('paginaAgenda')
});

router.get('/produto', (req,res) => {
    res.render('paginaProduto')
});

module.exports = router;