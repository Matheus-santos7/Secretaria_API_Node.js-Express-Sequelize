// Exporta uma função anônima que recebe um parâmetro 'cpf'.
// 'cpf' é esperado ser uma string representando um número de CPF (Cadastro de Pessoas Físicas, usado no Brasil).
module.exports = (cpf) => {
  // Verifica se o comprimento de 'cpf' é diferente de 11.
  // Um CPF válido tem exatamente 11 dígitos. Se não tiver, a função retorna 'false'.
  if (cpf.length !== 11) return false;
  
  // Se o comprimento for 11, a função retorna 'true'.
  return true;
};
