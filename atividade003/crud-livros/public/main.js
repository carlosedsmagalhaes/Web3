async function cadastrarLivro(event) {
    event.preventDefault();

    const livro = {
        titulo: document.getElementById('titulo').value,
        autor: document.getElementById('autor').value,
        anoPublicacao: parseInt(document.getElementById('ano').value),
    };

    const response = await fetch('/api/livros', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(livro)
    });
    const data = await response.json();
    document.getElementById('formLivro').reset();
    atualizarListaDeLivros();
    
}

async function atualizarListaDeLivros() {
    const response = await fetch('/api/livros');
    const livros = await response.json();
    const lista = document.getElementById('listaLivros');
    lista.innerHTML = '';

    livros.forEach(livro => {
        const div = document.createElement('div');
        div .className = 'livro-item';
        div.innerHTML = `
            <strong>${livro.titulo}</strong> por ${livro.autor} (${livro.anoPublicacao})
            <button onclick="editarLivro('${livro._id}')">Editar</button>
            <button onclick="excluirLivros('${livro._id}')">Excluir</button>
        `;
        lista.appendChild(div);
        
    }); 

}

async function editarLivro(id) {

    const novoTitulo = prompt('Novo título:');
    const novoAutor = prompt('Novo autor:');
    const novoAno = parseInt(prompt('Novo ano:'));

    if (!novoTitulo || !novoAutor || isNaN(novoAno)) {
        alert('Todos os campos são obrigatórios!');
        return;
    }

    const response = await fetch(`/api/livros/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ titulo: novoTitulo, autor: novoAutor, anoPublicacao: novoAno })
    });
    const data = await response.json();
    atualizarListaDeLivros();
}

async function excluirLivros(id) {
    if (!confirm('Tem certeza que deseja excluir este livro?')) return;

    const response = await fetch(`/api/livros/${id}`, {
        method: 'DELETE'
    });
    const data = await response.json();
    atualizarListaDeLivros();
    
}

document.getElementById('formLivro').addEventListener('submit', cadastrarLivro);
window.onload = atualizarListaDeLivros;