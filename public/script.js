document.addEventListener('DOMContentLoaded', () => {
    const contasList = document.getElementById('contas');
    const formulario = document.getElementById('formulario');
    const numeroSaldoForm = document.getElementById('saldo-form');
    const saldoResultado = document.getElementById('saldo-resultado');
  
    // Função para atualizar a lista de contas
    const atualizarListaContas = async () => {
      contasList.innerHTML = '';
  
      const response = await fetch('/contas');
      const contas = await response.json();
  
      contas.forEach(conta => {
        const item = document.createElement('li');
        item.textContent = `Conta ${conta.numero}, Saldo: $${conta.saldo.toFixed(2)}`;
        contasList.appendChild(item);
      });
    };
  
    // Função para criar uma nova conta
    formulario.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const numero = document.getElementById('numero').value;
      const saldo = parseFloat(document.getElementById('saldo').value);
  
      const response = await fetch('/contas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ numero, saldo }),
      });
  
      if (response.status === 201) {
        await atualizarListaContas();
      }
    });
  
    // Função para visualizar o saldo de uma conta
    numeroSaldoForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const numero = document.getElementById('numero-saldo').value;
  
      const response = await fetch(`/contas/${numero}`);
      const data = await response.json();
  
      if (response.status === 200) {
        saldoResultado.textContent = `Saldo: $${data.saldo.toFixed(2)}`;
      } else {
        saldoResultado.textContent = 'Conta não encontrada.';
      }
    });
  
    // Inicializar a lista de contas
    atualizarListaContas();
  });
  