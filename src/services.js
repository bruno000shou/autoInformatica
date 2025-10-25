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
function validarTelefone(numero) {
  // Remove tudo que não for número
  const telefone = numero.replace(/\D/g, '');
  // Lista dos DDDs válidos no Brasil
  const dddsValidos = [
    '11','12','13','14','15','16','17','18','19',
    '21','22','24','27','28',
    '31','32','33','34','35','37','38',
    '41','42','43','44','45','46',
    '47','48','49',
    '51','53','54','55',
    '61','62','64','63','65','66','67','68','69',
    '71','73','74','75','77','79',
    '81','82','83','84','85','86','87','88','89',
    '91','92','93','94','95','96','97','98','99'
  ];
  //Verifica se tem menos de 9 ou 10 dígitos → inválido
  if (telefone.length < 9 || telefone.length === 10) {
    return "00000000000";
  }
  //Se tiver exatamente 9 dígitos
  if (telefone.length === 9) {
    const doisPrimeiros = telefone.substring(0, 2);
    // Se os dois primeiros forem um DDD, é inválido
    if (dddsValidos.includes(doisPrimeiros)) {
      return "00000000000";
    }
    // Caso contrário, adiciona DDD 21 automaticamente
    return "21" + telefone;
  }
  //Se tiver 11 dígitos
  if (telefone.length === 11) {
    const ddd = telefone.substring(0, 2);
    if (dddsValidos.includes(ddd)) {
      return telefone; // número válido
    } else {
      return "00000000000";
    }
  }
  //Qualquer outro caso inesperado
  return "00000000000";
}


module.exports = { validarTelefone, capitalizarNome}
