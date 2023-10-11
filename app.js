const express = require('express');
const app = express();
const port = 3000;

// Configurar middleware para processar dados JSON
app.use(express.json());

// Servir arquivos estáticos a partir do diretório 'public'
app.use(express.static('public'));

// Dados em memória para as contas bancárias
const contas = [];

// Rota para listar todas as contas bancárias
app.get('/contas', (req, res) => {
  res.json(contas);
});

// Rota para criar uma nova conta bancária
app.post('/contas', (req, res) => {
  const novaConta = req.body;
  contas.push(novaConta);
  res.status(201).json(novaConta);
});

// Rota para visualizar o saldo de uma conta por número
app.get('/contas/:numero', (req, res) => {
  const numeroConta = req.params.numero;
  const conta = contas.find(c => c.numero === numeroConta);

  if (!conta) {
    res.status(404).json({ erro: 'Conta não encontrada' });
  } else {
    res.json({ saldo: conta.saldo });
  }
});

app.listen(port, () => {
  console.log(`A aplicação está rodando em http://localhost:${port}`);
});
