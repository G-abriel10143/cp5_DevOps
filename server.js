const express = require('express');
const app = express();
const port = 3000;

const mssql = require('mssql');
const bodyParser = require('body-parser');
const dbConfig = require('./db-config');

app.use(express.json());

// Importe a configuração do banco de dados
const dbConfig = require('./db-config');

// Função para criar a tabela de contas bancárias no banco de dados SQL Server
async function createAccountsTable() {
  try {
    const pool = await mssql.connect(dbConfig);
    const request = pool.request();

    await request.query(`
      CREATE TABLE Contas (
        numero INT PRIMARY KEY,
        nome VARCHAR(255),
        saldo DECIMAL(10, 2)
      );
    `);

    console.log('Tabela de contas bancárias criada com sucesso.');
  } catch (error) {
    console.error('Erro ao criar tabela de contas bancárias:', error);
  }
}

createAccountsTable();

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
