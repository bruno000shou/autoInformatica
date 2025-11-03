 // modulo que contem funções simples para diversos fins


function capitalizarNome(nome) {
  return nome
    .toLowerCase()
    .split(' ')
    .filter(palavra => palavra.trim() !== '')
    .map(palavra => palavra[0].toUpperCase() + palavra.slice(1))
    .join(' ');
};



function validarTelefone(telefone) {
  // remove tudo que não for dígito
  const apenasNumeros = String(telefone).replace(/\D/g, '');

  // se não sobrar dígito, retorna 0
  if (!apenasNumeros) return 0;

  // converte para Number inteiro (base 10)
  const numero = parseInt(apenasNumeros, 10);

  // se parseInt falhar (NaN), retorna 0
  return Number.isFinite(numero) ? numero : 0;
}


module.exports = { validarTelefone, capitalizarNome}
