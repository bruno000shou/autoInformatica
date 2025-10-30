// arquivo responsavel pela criacao dos mini blocos da area de pesquisa da ordem de servico
// capturando os dados do input de pesquisa e jogando nos elementos

window.addEventListener('DOMContentLoaded', () => {
    const inputPesquisa = document.getElementById('pesquisaCliente');
    const btnPesquisar = document.getElementById('btnPesquisar');
    const btnPesquisarDois = document.getElementById('btnPesquisarDois');
    const divResultados = document.getElementById('searchResultsContainer');

    // 🔹 Inputs do formulário principal (onde colocaremos os dados)
    const inputNome = document.querySelector('input[name="nomeNome"]');
    const inputTelefoneUm = document.querySelector('input[name="nomeTelefoneUm"]');
    const inputTelefoneDois = document.querySelector('input[name="nomeTelefoneDois"]');
    const inputEquipamento = document.querySelector(('input[name="nomeEquipamento"]'));
    const inputDefeito = document.querySelector(('input[name="nomeDefeito"]'));
    const inputData = document.querySelector(('input[name="nomeDataEntrada"]'));
    const inputValor = document.querySelector(('input[name="nomeValor"]'));
    const inputObservacao = document.querySelector(('textarea[name="nomeObservacoes"]'));
  
    
    
    //evento do botão de  OS na ordem de servico. 
    btnPesquisarDois.addEventListener('click', async () => {
        const termo = inputPesquisa.value.trim();
         if (!termo) {
            divResultados.textContent = 'Digite algo para pesquisar.';
            return;
        }

        try {
            const response = await fetch(`/api/ordemServicoCliente?nomePesquisaCliente=${encodeURIComponent(termo)}`);
            const dados = await response.json();
            let divContentAll = [];
            divResultados.innerHTML = ''; // Limpa os resultados anteriores

            if (!dados || dados.length === 0) {
                divResultados.textContent = 'Nenhum resultado encontrado.';
                return;
            }

            // Criar os blocos de resultados
            dados.forEach((item, index) => {
                const div = document.createElement('div');
                div.classList.add('miniCardsSearch');
                div.id = `divBlocks${index}`;  

                div.innerHTML = `
                <strong>${item.nome}</strong><br>
                Telefone 1: ${item.telefone_um_text}<br>
                Telefone 2: ${item.telefone_dois_text}
                `;

                const divContent = {
                    nome: item.nome,
                    telefone_um: item.telefone_um_text,
                    telefone_dois: item.telefone_dois_text,
                    equipamento : item.equipamento,
                    defeito : item.defeito,
                    dataEntrada : item.dataEntrada,
                    valor : item.valor,
                    observacao : item.observacao
                };

                divContentAll.push(divContent);
                divResultados.appendChild(div);

                // Evento de clique em cada div
            div.addEventListener('click', () => {
            // 🔹 Remove o destaque de todas as outras divs
            document.querySelectorAll('.miniCardsSearch').forEach(el => {
                el.style.border = '4px solid transparent';
            });

            // 🔹 Adiciona destaque à div clicada
            div.style.border = '2px solid #4da6ff';
            div.style.borderRadius = '6px';

            // 🔹 Obtém o índice e o conteúdo da div clicada
            const id = div.id;
            const indexStr = id.replace('divBlocks', '');
            const indexNum = parseInt(indexStr);
            const conteudo = divContentAll[indexNum];

            // 🔹 Preenche os campos do formulário principal
            inputNome.value = conteudo.nome || '';
            inputTelefoneUm.value = conteudo.telefone_um || '';
            inputTelefoneDois.value = conteudo.telefone_dois || '';
            inputEquipamento.value = conteudo.equipamento ||'';
            inputDefeito.value = conteudo.defeito ||'';
            inputData.value = conteudo.dataEntrada ||'';
            inputValor.value = conteudo.valor ||'';
            inputObservacao.value = conteudo.observacao ||'';

            // 🔹 (opcional) log para depuração
            console.log(`Preenchendo inputs com dados da div ${indexNum}`);
        });
            });          
        } catch {
            console.error('Erro ao buscar no backend:', err);
            divResultados.textContent = 'Erro ao buscar resultados.';
        };
    })
    


    // evento do botao de  cliente ,    na pagina de ordem de servico
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

        // Criar os blocos de resultados
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

            // Evento de clique em cada div
            div.addEventListener('click', () => {
            // 🔹 Remove o destaque de todas as outras divs
            document.querySelectorAll('.miniCardsSearch').forEach(el => {
                el.style.border = '4px solid transparent';
            });

            // 🔹 Adiciona destaque à div clicada
            div.style.border = '2px solid #4da6ff';
            div.style.borderRadius = '6px';

            // 🔹 Obtém o índice e o conteúdo da div clicada
            const id = div.id;
            const indexStr = id.replace('divBlocks', '');
            const indexNum = parseInt(indexStr);
            const conteudo = divContentAll[indexNum];

            // 🔹 Preenche os campos do formulário principal
            inputNome.value = conteudo.nome || '';
            inputTelefoneUm.value = conteudo.telefone_um || '';
            inputTelefoneDois.value = conteudo.telefone_dois || '';

            // 🔹 (opcional) log para depuração
            console.log(`Preenchendo inputs com dados da div ${indexNum}`);
            });
        });

        } catch (err) {
        console.error('Erro ao buscar no backend:', err);
        divResultados.textContent = 'Erro ao buscar resultados.';
        }
    });


});