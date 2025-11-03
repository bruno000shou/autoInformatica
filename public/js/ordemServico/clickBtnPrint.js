// MOdulo impressao para o botao imprimir da ordem de servico
document.getElementById("btnImprimir").addEventListener("click", async () => {
    try {
        // faz a requisição POST
        const resposta = await fetch("/ordemServico/print", { method: "POST" });
        // lê a resposta JSON do servidor
        const dados = await resposta.json();
            alert(dados.mensagem);
    } catch (err) {
        alert("Erro2: " + err.message);
    }
});


