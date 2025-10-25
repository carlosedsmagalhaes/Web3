async function cadastrarVinil(event){
    event.preventDefault()

    const vinil = {
        titulo: document.getElementById('titulo').value,
        artista: document.getElementById('artista').value,
        ano: document.getElementById('ano').value,
        genero: document.getElementById('genero').value,
        formato: document.getElementById('formato').value,
        preco: document.getElementById('preco').value
    }

    const response = await fetch('/api/vinil', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(vinil)
    });
    const data = await response.json();
    document.getElementById('vinil-form').reset();
    atualizarListaDeVinis();

}

async function atualizarListaDeVinis() {
    const response = await fetch('/api/vinil');
    const vinis = await response.json();
    console.log(vinis);
    const lista = document.getElementById('lista-vinis');
    lista.innerHTML = '';

    vinis.forEach(vinil => {
        const div = document.createElement('div');
        div .className = 'vinil-item';
        div.innerHTML = `
            <strong>${vinil.titulo}</strong> por ${vinil.artista} (${vinil.ano})
            <button onclick="editarVinil('${vinil._id}')">Editar</button>
            <button onclick="excluirVinil('${vinil._id}')">Excluir</button>
        `;
        lista.appendChild(div);
        
    }); 

}

async function atualizarListaDeVinis() {
    const response = await fetch('/api/vinil');
    const vinis = await response.json();
    const lista = document.getElementById('lista-vinis');
    lista.innerHTML = '';

vinis.forEach(vinil => {
    const div = document.createElement('div');
    div.className = 'vinil-item';

    div.innerHTML = `
        <span><strong>${vinil.titulo}</strong> por ${vinil.artista} (${vinil.ano})</span>
        <div class="actions-item">
            <button onclick="editarVinil('${vinil._id}')">Editar</button>
            <button onclick="excluirVinil('${vinil._id}')">Excluir</button>
        </div>
    `;

    lista.appendChild(div);
});
}

async function editarVinil(id) {
  const novoTitulo = prompt('Novo título:');
  const novoArtista = prompt('Novo artista:');
  const novoAno = parseInt(prompt('Novo ano:'));
  const novoGenero = prompt('Novo gênero:');
  const novoFormato = prompt('Novo formato:');
  const novoPreco = parseFloat(prompt('Novo preço (R$):'));

  if (!novoTitulo || !novoArtista || isNaN(novoAno) || !novoGenero || !novoFormato || isNaN(novoPreco)) {
    alert('Todos os campos são obrigatórios!');
    return;
  }

  const response = await fetch(`/api/vinil/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      titulo: novoTitulo,
      artista: novoArtista,
      ano: novoAno,
      genero: novoGenero,
      formato: novoFormato,
      preco: novoPreco
    })
  });

  if (!response.ok) {
    alert('Erro ao atualizar vinil!');
    return;
  }

  await atualizarListaDeVinis();
  alert('Vinil atualizado com sucesso!');
}

async function excluirVinil(id) {
    if (!confirm('Tem certeza que deseja excluir este vinil?')) return;

    const response = await fetch(`/api/vinil/${id}`, {
        method: 'DELETE'
    });
    const data = await response.json();
    atualizarListaDeVinis();
    
}

document.getElementById('vinil-form').addEventListener('submit', cadastrarVinil);
window.onload = atualizarListaDeVinis;