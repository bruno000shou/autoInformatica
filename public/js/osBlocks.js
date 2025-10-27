// arquivo responsavel pela criacao dos mini blocos da area de pesquisa da ordem de servico
// capturando os dados do input de pesquisa e jogando nos elementos

window.addEventListener('DOMContentLoaded', () => {
const inputPesquisa = document.getElementById('pesquisaCliente');
const btnPesquisar = document.getElementById('btnPesquisar');
const divResultados = document.getElementById('searchResultsContainer');

btnPesquisar.addEventListener('click', async () => {
const termo = inputPesquisa.value.trim();
if (!termo) {
    divResultados.textContent = 'Digite algo para pesquisar.';
    return;
}

try {
    const response = await fetch(`/api/ordemServico?nomePesquisaCliente=${encodeURIComponent(termo)}`);
    const dados = await response.json();
    let divContentAll = [];

    divResultados.innerHTML = ''; // Limpa os resultados anteriores

    if (!dados || dados.length === 0) {
    divResultados.textContent = 'Nenhum resultado encontrado.';
    return;
    }

    // Mostrar resultados em quadrados pequenos 2 por linha
    dados.forEach((item, index) => {
    const div = document.createElement('div');
    div.classList.add('miniCardsSearch');
    div.id = `divBlocks${index}`;

    div.innerHTML = `
        <strong>${item.nome}</strong><br>
        Telefone 1: ${item.telefone_um}<br>
        Telefone 2: ${item.telefone_dois}
    `;
    const divContent = {
        nome: item.nome,
        telefone_um: item.telefone_um,
        telefone_dois: item.telefone_dois
    };
    divContentAll.push(divContent);
    divResultados.appendChild(div);

    //criar um evento ce click para cara uma das divs que foi criada, capturando o conteudo da div com innerhtml
    div.addEventListener('click', () => {
    const elemento = document.getElementById(div.id);
    const conteudo = elemento.innerHTML;
    console.log('Clicou na div com id:', div.id);
    console.log('Conteúdo da div:', conteudo);
    
    // Aqui você pode usar a variável "conteudo" como quiser


div.addEventListener('click', () => {
          const id = div.id; // ex: "divBlocks3"
          const indexStr = id.replace('divBlocks', ''); // remove o prefixo
          const indexNum = parseInt(indexStr); // converte pra número
          
          // pega o conteúdo correspondente
          const conteudo = divContentAll[indexNum];

          // mostra no alert o índice e o conteúdo
          alert(`Índice: ${indexNum}\n\nNome: ${conteudo.nome}\nTel1: ${conteudo.telefone_um}\nTel2: ${conteudo.telefone_dois}`);
        });







   });

    });

} catch (err) {
    console.error('Erro ao buscar no backend:', err);
    divResultados.textContent = 'Erro ao buscar resultados.';
}
});
});