const API_URL = 'http://localhost:3101/shopping-list/produtos';
const produtoForm = document.getElementById('produtoForm');
const produtoList = document.getElementById('produtoList');

async function carregarProdutos() {
  const response = await fetch(API_URL);
  const produtos = await response.json();
  produtoList.innerHTML = '';
  produtos.forEach(produto => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = `${produto.nome} - R$${produto.preco.toFixed(2)}`;
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Remover';
    deleteButton.onclick = async () => {
      await fetch(`${API_URL}/${produto._id}`, { method: 'DELETE' });
      carregarProdutos();
    };
    
    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.onclick = () => {
      const novoNome = prompt('Novo nome:', produto.nome);
      const novoPreco = prompt('Novo preço:', produto.preco);
      if (novoNome && novoPreco) {
        fetch(`${API_URL}/${produto._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome: novoNome, preco: parseFloat(novoPreco) })
        }).then(() => carregarProdutos());
      }
    };

    const actions = document.createElement('div');
    actions.classList.add('actions');
    
    actions.appendChild(editButton);
    actions.appendChild(deleteButton);

    li.appendChild(span);
    li.appendChild(actions);
    produtoList.appendChild(li);
  });
}

produtoForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nome = document.getElementById('nome').value;
  const preco = parseFloat(document.getElementById('preco').value);
  console.log({ nome, preco });
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, preco })
  });
  
  produtoForm.reset();
  carregarProdutos();
});


carregarProdutos();

