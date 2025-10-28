// arquivo que contem os funcoes e operacoes.

//funcao para deixar as primeiras letras dos nomes maiusculas
function capitalizarNome(nome) {
  return nome
    .toLowerCase() // transforma tudo em minúsculas primeiro
    .split(' ')    // separa as palavras por espaço
    .filter(palavra => palavra.trim() !== '') // remove espaços extras
    .map(palavra => palavra[0].toUpperCase() + palavra.slice(1)) // capitaliza
    .join(' ');    // junta tudo de volta com espaço
};


//função para validar o numeros dos telefones 
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
