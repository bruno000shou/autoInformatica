const express = require('express');
const router = express.Router();
const { getFormData } = require('./services');
const postOrdemServicoInst = require('./supabaseServices')

//rota da pagina principal
router.get('/', (req,res) => {
    res.render('mainPage')
});

// rota da pagina de ordem de servico
router.get('/ordemServico',  async (req,res) => {
    return res.render('paginaOrdemServico');
});

router.get('/api/ordemServico',  async (req,res) => {
    const pesquisa = req.query.nomePesquisaCliente;
    const searchButton = req.query.searchButton;
    var dados = {};

    //verifica se pesquisa é uma string de numeros
    if (/^\d+$/.test(pesquisa)) {
        const { data: resultadosTelefone, error: erroTelefone } = await req.app.locals.supabase
        .from('clientes')
        .select('*')
        .or(`telefone_um.ilike.%${pesquisa}%,telefone_dois.ilike.%${pesquisa}%`)
        dados = resultadosTelefone;
        if (erroTelefone) {
        console.error('Erro ao buscar por telefone:', erroTelefone);
        return res.status(500).send('Erro ao buscar por telefone');
    };
    } else {
        try {
        // tratamento caso sejam letras
        const { data: resultados, error } = await req.app.locals.supabase
        .from('clientes')
        .select('*')
        .ilike('nome', `%${pesquisa}%`);
            dados = resultados;
        if (error) {
            console.error('Erro ao buscar dados:', error);
            return res.status(500).send('Erro ao buscar dados');
        };
    } catch (err) {
        console.error('Erro inesperado:', err);
        return res.status(500).send('Erro inesperado');
    };
    }; 
    res.json(dados);
});

router.get('/api/ordemServicoCliente', async (req, res) => {
    const pesquisa = req.query.nomePesquisaCliente;
    let dados = [];

    if (/^\d+$/.test(pesquisa)) {
        const { data: resultadosTelefone, error: erroTelefone } = await req.app.locals.supabase
            .from('ordemservico_view')
            .select('*')
            .or(`telefone_um_text.ilike.%${pesquisa}%,telefone_dois_text.ilike.%${pesquisa}%`);
        
        dados = resultadosTelefone;

        if (erroTelefone) {
            console.error('Erro ao buscar por telefone:', erroTelefone);
            return res.status(500).send('Erro ao buscar por telefone');
        }
    } else {
        try {
            const { data: resultados, error } = await req.app.locals.supabase
                .from('ordemservico_view')
                .select('*')
                .ilike('nome', `%${pesquisa}%`);
            
            dados = resultados;

            if (error) {
                console.error('Erro ao buscar dados:', error);
                return res.status(500).send('Erro ao buscar dados');
            }
        } catch (err) {
            console.error('Erro inesperado:', err);
            return res.status(500).send('Erro inesperado');
        }
    }

    res.json(dados);
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