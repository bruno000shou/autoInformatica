
/**
 * Modulo que verifica se o que vem pelo input de pesquisa é um numero ou um texto e faz o tratamento inicial desse conteudo
 * @param {*} req - parametro objeto de requisição do express vindo do endpoint
 * @param {*} res - parametro objeto de resposta do express vindo do endpoint
 * @returns {object} - retorna o conteudo pesquisado no banco de dados cliente e devolve como um json que vem da variavel dados
 */


async function osSearchBtn (req, res) {
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
         
    }
    res.json(dados);
};
   

    module.exports = osSearchBtn;