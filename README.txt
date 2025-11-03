Aplicativo para uma loja/ assistencia tecnica de informatica. Tem como objetivo uma aparencia minimalista e intuitiva, voltado para
ser operado por pessoas que não tem muita experiencia com operação de sistemas. Será utilizardo um banco de dados relacional online 
(Supabase). O app irá rodar localmente acessando o banco de dados online. 
Escolhi o Bootstrap para renderizar o front end pela praticidade em ajustar pequenas coisas no template.
Pagina ordem de serviço esta pronta, mas as outras páginas estão em lenta construção. 

=========================
= ESTRUTURA DE ARQUIVOS =
=========================
  
  Colocar a estrutura de arquivos aqui

======================
= TECNOLOGIAS USADAS =
======================

    Boostrap, handlebars, javascript, html, css, supabase.

===================
= BANCO DE DADOS =
===================
    Usaremos uma ferramenta gratuita que é o SUPABASE. Para um banco de dados relacional e gratis baseado em SQL. 
    O login e senha usado são os mesmos do github.
    Organização: brunoSercundo
    /// remover/// Nome do projeto: autoInformatica
    /// remover /// senha do banco de dados: sercundoautoinfo
    /// remover /// anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNscXZkb2ltZ2xzY25jeGhrb2diIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyMzQzOTYsImV4cCI6MjA3NjgxMDM5Nn0.YjFphNwSUF2S6W03rflKE6OvbQIjqWPhRY9WrSWVfZo

    url: https://supabase.com/dashboard/project/clqvdoimglscncxhkogb

    As tabelas estão organizadas e estruturadas da seguinte forma:

    ordemServico: nome:string, telefone_um:bigint, telefone_doi:bigint, equipamento:text, defeito:text, dataEntrada:date, 
    valorfloat4, observacao:text. Possui uma VIEW onde os campos de telefone são lidos como texto.

    clientes: nome:text, telefone_um:text, telefone_dois:text

===========================
= PAGINA ORDEM DE SERVIÇO =
===========================
    Tem como função cadastrar, editar, imprimir e deletar ordens de servico. É possivel pesquisar as ordens de servico por nome ou por
    telefone, tembem podemos pesquisar clientes cadastrados para serem utitlizados na criação da ordem de serviço. 


    ===================
    = /src/services.js=
    ===================
        Modulo que contem funcoes diversas para varios fins.
        - capitalizarNome - funcao pra colocar a primeira letra de cada nome maiuscula.
        - validarTelefone - função para validar o numeros dos telefones verificando se sao caracteres numericos apenas.


    ===========================
    = /src/supabaseServices.js=
    ===========================
        arquivo para conter as manipulacoes do supabase como um todo
        - postOrdemServico - insere dados no banco de dados ordemservico apos validação e tratamento de dados

    ===========================================
    = public\js\ordemServico\clickBtnPrint.js =
    ===========================================
        Modulo para o botão de imprimir em ordem de serviço chamar o endpoint

    ==================================================
    = public\js\ordemServico\createPdfOrdemServico.js=
    ==================================================
        Modulo de criação de pdf temporario para enviar a impressao
        - gerarPdfOrdemServico - funcao responsavel por toda criacao e exportacao do caminho do pdf

    =====================================
    = public\js\ordemServico\osBlocks.js=
    =====================================
         MOdulo responsavel pela criação do sminiblocos da area de pesquisa da ordem de serviço
         - O primeiro evento é referente  ao botão de  OS na ordem de servico, envia para o back end o que foi pesquisado no botão de cliente
        e cria para cara retorno do back end um bloco com os dados (nome, telefone_um e telefone_dois). Após isso, cria um evento de 
        click nas divs criadas, e alimenta os campos do formulário com o conteudo dessas divs. 
        - temos um evento de click no botao de imprimir onde chamamos o endpoint '/ordemServico/print' e enviamos o json com o 
        conteudo que sera impresso. 
        - abaixo temos um evento de captura para a pesquisa e consulta no banco de dados ordemservico, onde criaremos os blocos
        e alimentaremos os campos do formulario com todo o conteudo do elemento clicado nas divs criadas
