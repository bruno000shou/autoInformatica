const express = require('express');
const router = express.Router();
const { getFormData } = require('./services');
const postOrdemServicoInst = require('./supabaseServices')

router.get('/', (req,res) => {
    res.render('mainPage')
});

router.get('/ordemServico',  (req,res) => {
    res.render('paginaOrdemServico');
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