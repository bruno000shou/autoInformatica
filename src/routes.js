const express = require('express');
const router = express.Router();
const { getFormData } = require('./services');

router.get('/', (req,res) => {
    res.render('mainPage')
});

router.get('/ordemServico',  (req,res) => {
   // const ordemServico = getFormData(req, 'nomeNome', 'nomeTelefoneUm', 'nomeTelefoneDois', 'nomeEquipamento', 'nomeDefeito', 'nomeDataEntrada', 
      //  'nomeValor', 'nomeObservacoes');
   // const supabase = req.app.locals.supabase;
   // const { data, error } = await supabase.from('ordemServico').insert()
        
    res.render('paginaOrdemServico');
});

router.post('/ordemServico', async (req, res) => {
    const supabase = req.app.locals.supabase;
    const data = {
        nome:req.body.nomeNome,
        telefoneUm:req.body.nomeTelefoneUm,
        telefoneDois:req.body.nomeTelefoneDois,
        equipamento:req.body.nomeEquipamento,
        defeito:req.body.nomeDefeito,
        dataEntrada:req.body.nomeDataEntrada,
        valor:req.body.nomeValor, 
        observacao:req.body.nomeObservacoes
    };
    try {
        const {data:resultado, error} = await supabase
            .from('ordemServico').insert([data])
        if (error) {
            console.error('Erro ao inserir dados no Supabase', error);
            return res.status(500).send('Erro ao salvar no banco de dados');
        } 
        console.log('Registro inserido no banco de dados com sucesso', data);
        res.redirect('/ordemServico');
        } catch (err) {
            console.error('erro inesperado', err);
            return res.status(500).send('erro inesperado');
        };
    res.redirect('/ordemServico');
})

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