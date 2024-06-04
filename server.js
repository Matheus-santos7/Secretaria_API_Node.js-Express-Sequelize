// Importa o módulo 'app' do arquivo './src/app.js'.
// Esse 'app' geralmente é uma instância de um aplicativo Express, que você configurou em outro arquivo.
const app = require('./src/app.js');

// Define uma constante 'PORT' que armazena o número da porta em que o servidor vai escutar.
// No caso, está configurado para a porta 3000.
const PORT = 3000;

// Chama o método 'listen' do 'app' para iniciar o servidor.
// 'listen' recebe dois argumentos:
// 1. O número da porta (neste caso, a constante PORT).
// 2. Uma função de callback que é executada quando o servidor começa a escutar a porta.
// No caso, essa função apenas imprime no console a mensagem 'servidor escutando!'.
app.listen(PORT, () => {
  console.log('servidor escutando!');
});
