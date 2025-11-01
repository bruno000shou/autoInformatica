const express = require('express');
const router = express.Router();
const { getFormData } = require('./services');
const fs = require('fs');
const { print } = require('pdf-to-printer');
const PDFDocument = require('pdfkit');


const postOrdemServicoInst = require('./supabaseServices');
const osSearchBtn = require('../public/js/ordemServico/osSearchBtn');
const printOrdemServico = require('../public/js/ordemServico/printOrdemServico')
const createPdfOrdemServico = require('../public/js/ordemServico/createPdfOrdemServico')



//rota da pagina principal
router.get('/', (req,res) => {
    res.render('mainPage')
});



// rota da pagina de ordem de servico
router.get('/ordemServico',  async (req,res) => {
    return res.render('paginaOrdemServico');
});

router.get('/api/ordemServico',  async (req,res) => {
     await osSearchBtn(req, res);
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

router.post('/ordemServico/print', async (req, res) => {
    try {
    const conteudo = req.body;
    console.log('Conteúdo recebido para impressão:', req.body);

    // Cria o PDF temporário
    const arquivoPdf = await createPdfOrdemServico(conteudo);

    // Envia para impressão
    await printOrdemServico(arquivoPdf, print);

    res.json({ sucesso: true, mensagem: 'Impressão enviada com sucesso!' });

    } catch (erro) {
        console.error('Erro ao imprimir no endpoint /ordemServico/print:', erro);
        res.status(500).json({ sucesso: false, mensagem: 'Erro ao imprimir: ' + erro.message });
    }
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