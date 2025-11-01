Aplicativo para uma loja/ assistencia tecnica de informatica. Tem como objetivo uma aparencia minimalista e intuitiva, voltado para
ser operado por pessoas que não tem muita experiencia com operação de sistemas. Será utilizardo um banco de dados relacional online 
(Supabase). O app irá rodar localmente acessando o banco de dados online. 
Escolhi o Bootstrap para renderizar o front end pela praticidade em ajustar pequenas coisas no template.
Pagina ordem de serviço esta pronta, mas as outras páginas estão em lenta construção. 

=========================
= ESTRUTURA DE ARQUIVOS =
=========================
    O diretório SRC contem os arquivos de rotas do nosso app, assim como controladores.
    Em VIEWS teremos nossos templates de bootstrap.
    No diretório PUBLIC teremos modulos e funcções especificas.

=============
= TEMPLATES =
=============
    Estamos usando o BOOTSTRAP no projeto, então seus templates estão como padrão, no diretório VIEWS.


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
    valorfloat4, observacao:text. Possui uma view onde os campos de telefone são lidos como texto.

    clientes: nome:text, telefone_um:text, telefone_dois:text

===========================
= PAGINA ORDEM DE SERVIÇO =
===========================
    Tem como função cadastrar, editar, imprimir e deletar ordens de servico. É possivel pesquisar as ordens de servico por nome ou por
    telefone, tembem podemos pesquisar clientes cadastrados para serem utitlizados na criação da ordem de serviço. 

