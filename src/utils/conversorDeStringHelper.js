// Exporta uma função anônima que recebe um parâmetro 'objetoParams'.
// 'objetoParams' é esperado ser um objeto cujas propriedades podem conter valores que precisam ser convertidos para números.
module.exports = (objetoParams) => {
  // Utiliza um loop 'for...in' para iterar sobre todas as propriedades do objeto 'objetoParams'.
  for (let propriedade in objetoParams) {
    // Verifica se o nome da propriedade contém 'Id' ou 'id' usando uma expressão regular.
    // A expressão regular /Id|id/ testa se a string da propriedade contém 'Id' ou 'id' em qualquer lugar.
    if (/Id|id/.test(propriedade)) {
      // Converte o valor da propriedade para um número usando a função 'Number' e o atribui de volta à propriedade.
      objetoParams[propriedade] = Number(objetoParams[propriedade]);
    }
  }
  // Retorna o objeto modificado.
  return objetoParams;
};
