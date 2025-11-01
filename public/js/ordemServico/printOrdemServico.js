// modulo para impressao da ordem de servico
const fs = require('fs');

/**
 * Envia o arquivo previsamente criado em pdf para a impressão
 * @param {object} res - Objeto de resposta do express
 * @param {function} print - Funcão de impressão que vem do routers
 * @param {string} caminhoPdf - Caminho completo do nosso arquivo temporario pdf
 */


async function printOrdemServico (caminhoPdf,res, print) {
    try {
        //verifica se o arquivo existe antes da impressão
        if (!fs.existsSync(caminhoPdf)) {
            return res.status(404).json({
                sucesso: false,
                message: 'Arquivo pdf não encontrado. modulo printOrdemServico'      
            });
        };
        await print(caminhoPdf);
        res.json({
            sucesso: true,
            message: 'Impressão enviada com sucesso! Aguardo o término da impressão.'
        })
    } catch (erro) {
        console.error('Erro ao imprimr', erro);
        res.status(500).json({sucesso: false, message: erro.message});
    }
};

module.exports = printOrdemServico;