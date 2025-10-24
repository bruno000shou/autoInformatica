//metodo para pegar os dados dos formulários
function getFormData(req, data1, data2, data3, data4, data5, data6, data7, data8) {
     const ordemServico = {
        nome:req.query[data1],
        telefoneUm:req.query[data2],
        telefoneDois:req.query[data3],
        equipamento:req.query[data4],
        defeito:req.query[data5],
        data:req.query[data6],
        valor:req.query[data7],
        observacoes:req.query[data8]
    };
};



module.exports = { getFormData };