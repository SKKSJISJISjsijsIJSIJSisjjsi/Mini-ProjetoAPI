const api = 'http://localhost:3000/aluno';

function criarTarefaHTML(cadastro) {
    const data = new Date(cadastro.data);
    return `
                <li data-id="${cadastro.id}" class="${cadastro.status ? 'concluida' : ''}">
                <span>
                    <i class="fa-regular fa-circle${cadastro.status ? '-check' : ''}"></i>
                    <strong>${cadastro.id_aluno}</strong> - ${cadastro.nome_aluno} 
                    <small><i class="fa-regular fa-calendar"></i> ${data.toLocaleDateString('pt-BR')}</small>
                </span>
                <div class="acoes">
                    <button class="concluir" title="Concluir"><i class="fa-solid fa-check"></i></button>
                    <button class="remover" title="Remover"><i class="fa-solid fa-trash"></i></button>
                </div>
                </li>
            `;
}

function carregarcadastro() {
    fetch(api)
        .then(res => res.json())
        .then(cadastro => {
            const ul = document.getElementById('lista-cadastro');
            ul.innerHTML = '';
            cadastro.forEach(cad => {
                ul.innerHTML += criarTarefaHTML(cad);
            });
        });
}
document.getElementById('form-cadastro').addEventListener('submit', async (e) => {
    e.preventDefault();

    const novo_aluno = {
        nome_aluno: document.getElementById('nome_aluno').value,
        cep: document.getElementById('cep').value,
        data: document.getElementById('data').value
    };

    try {
        const response = await fetch('http://localhost:3000/aluno', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novo_aluno)
        });

        console.log(response);
        if (response.ok) {
            alert('Aluno cadastrado!');
            // Atualize a lista de alunos aqui, se necessário
        } else {
            alert('Erro ao cadastrar aluno.');
        }
    } catch (error) {
        alert('Erro de conexão.');
    }
});

document.getElementById('lista-cadastro').addEventListener('click', function (e) {
    const li = e.target.closest('li');
    if (!li) return;
    const id = li.getAttribute('data-id');
    if (e.target.closest('.remover')) {
        fetch(`${api}/${id}`, { method: 'DELETE' }).then((resposta) => {
            if (resposta.ok) {
                return resposta.json();
            }
        }).then((retorno) => {
            console.log(retorno);
            carregarcadastro();
        });
    }
    if (e.target.closest('.concluir')) {
        fetch(`${api}/${id}/concluir`, { method: 'PATCH' }).then((resposta) => {
            if (resposta.ok) {
                return resposta.json();
            }
        }).then((retorno) => {
            console.log(retorno);
            carregarcadastro();
        });
    }
});
carregarcadastro();
