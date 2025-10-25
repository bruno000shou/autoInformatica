//arquivo para conter as manipulacoes do supabase como um todo
const services = require('./services');
const valTelefone = require('./services')


async function postOrdemServico(req, res) {
    const supabase = req.app.locals.supabase;

    const data = {
        nome: services.capitalizarNome(req.body.nomeNome),
        telefoneUm: valTelefone.validarTelefone(req.body.nomeTelefoneUm),
        telefoneDois: valTelefone.validarTelefone(req.body.nomeTelefoneDois),
        equipamento: req.body.nomeEquipamento,
        defeito: req.body.nomeDefeito,
        //coloca no valor data a data atual tratada caso o valor do body seja vazio
        dataEntrada: req.body.nomeDataEntrada || new Date().toISOString().split('T')[0],
        valor: req.body.nomeValor || 0,
        observacao: req.body.nomeObservacoes
    };
                console.log(data.telefoneUm, data.telefoneDois, typeof(data.telefoneUm), typeof(data.telefoneDois))

    try {
        //Validação de telefone enviando json para o front caso haja erro
        if (data.telefoneUm === "00000000000" || data.telefoneDois === "00000000000") {  
            console.log('Houveram erros nos telefones e o banco de dados não foi alcançado');  
            return res.render('paginaOrdemServico', {
                erro:true,
                mensagem: 'Telefone inválido - verifique os números informados',
                valores:data
            })
        } 
        // Inserção no banco
        const { data: resultado, error } = await supabase
            .from('ordemServico')
            .insert([data]);

        if (error) {
            console.error('Erro ao inserir dados no Supabase', error);
            return res.status(500).send('Erro ao salvar no banco de dados');
        }
        console.log('Registro inserido no banco de dados com sucesso', data);
        return res.redirect('/ordemServico'); // só chega aqui se estiver tudo ok

    } catch (err) {
        console.error('Erro inesperado', err);
        return res.status(500).send('Erro inesperado');
    }
}

module.exports = { postOrdemServico };

