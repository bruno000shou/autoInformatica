// modulo para impressao da ordem de servico
const fs = require('fs');

/**
 * Envia o arquivo previsamente criado em pdf para a impressão
 * @param {function} print - Funcão de impressão que vem do routers
 * @param {string} arquivoPdf - Caminho completo do nosso arquivo temporario pdf
 */


async function printOrdemServico(arquivoPdf, print) {
    try {
        await print(arquivoPdf);
        return true;
    } catch (erro) {
        throw new Error('Falha ao enviar para a impressora: ' + erro.message);
    }
}

module.exports = printOrdemServico;