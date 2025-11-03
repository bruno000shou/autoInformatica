 //Modulo de criação de pdf temporario para enviar a impressao

const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const os = require('os');


function gerarPdfOrdemServico(conteudo) {
  return new Promise((resolve, reject) => {
    try {
      // Caminho temporário do arquivo
      const arquivoPDF = path.join(os.tmpdir(), `ordemServico_${Date.now()}.pdf`);
      // Criar documento PDF
      const doc = new PDFDocument({ margin: 40 });
      const writeStream = fs.createWriteStream(arquivoPDF);
      doc.pipe(writeStream);

      let larguraNome = 145;
      let larguraInfo = 385;
      function escrevePdf (conteudo, posY){
        
        doc.y = posY;
        doc.x = 40;

        doc.font('Times-Bold').fontSize(20).text('Informática.com', { align: 'center' });
        doc.font('Times-Bold').fontSize(20).text('Assistência Técnica venda de acessórios', { align: 'center' });
        doc.font('Times-Roman').fontSize(18).text('Ordem de Serviço nº "colocar elemento id', { align: 'center' });
        doc.moveDown();

        doc.font('Times-Bold').fontSize(12).text('Cliente: ', { continued: true });
        doc.font('Times-Roman').text(`${conteudo.nome || ''}`, { continued: true });
        doc.font('Times-Bold').text('               Data: ', { continued: true });
        doc.font('Times-Roman').text(` ${conteudo.dataEntrada || new Date().toLocaleDateString()}`);
        doc.font('Times-Bold').text('Telefone 1: ', { continued: true });
        doc.font('Times-Roman').text(`${conteudo.telefone_um || ''}`, { continued: true });
        doc.font('Times-Bold').text('               Telefone 2: ', { continued: true }); 
        doc.font('Times-Roman').text(`${conteudo.telefone_dois || ''}`);
        doc.moveDown();

        doc.font('Times-Bold').text('Equipamento deixado: ')
        .font('Times-Roman').text(`${conteudo.equipamento || ''}`);
        doc.font('Times-Bold').text('Defeito reclamado: ')
        .font('Times-Roman').text(`${conteudo.defeito || ''}`);
        doc.font('Times-Bold').text(`Valor do orçamento: R$ ${conteudo.valor || '0,00'},00`, { continued: true })
        .font('Times-Roman').text(` , o valor do orçamento pode mudar, e será avisado previamento o cliente`);
        if (conteudo.observacao) {
          doc.moveDown();
          doc.font('Times-Bold').text('Observações: ')
          .font('Times-Roman').text(`${conteudo.observacao}`);
        }
        doc.moveDown(1);
        const assinaturaY = doc.y + 20;
        doc.text('_____________________________________   _____________________________________', { align: 'center' });
        doc.text(`Cliente ${conteudo.nome || ''}`, larguraNome, assinaturaY)
        .text('Informatica.com', larguraInfo, assinaturaY);
      };

      escrevePdf(conteudo, 50)
      doc.moveDown(3);
      escrevePdf(conteudo, 410)

      doc.end();

      // Aguarda finalização do stream
      writeStream.on('finish', () => {
        resolve(arquivoPDF); 
      });

      writeStream.on('error', (erro) => {
        reject(erro);
      });

    } catch (erro) {
      reject(erro);
    }
  });
}

module.exports = gerarPdfOrdemServico;