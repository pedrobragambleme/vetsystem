let animais = [
    {
        id: 1,
        nome: "Thor",
        especie: "Cachorro",
        raca: "Golden Retriever",
        idade: 5,
        cor: "Dourado",
        tutor: "João Silva",
        vacinas: "Vacinas em dia.",
        prontuario: "Animal saudável, sem alterações no último atendimento."
    },
    {
        id: 2,
        nome: "Luna",
        especie: "Gato",
        raca: "Siamês",
        idade: 3,
        cor: "Creme",
        tutor: "Maria Souza",
        vacinas: "Vacinas em dia.",
        prontuario: "Animal saudável."
    }
];

function listarAnimais() {
    const tabela = document.getElementById("lista-animais");

    tabela.innerHTML = "";

    for (let animal of animais) {
        const linha = document.createElement("tr");

        const dados = [
            animal.nome,
            animal.especie,
            animal.raca,
            animal.idade + " anos",
            animal.tutor
        ];

        for (let dado of dados) {
            const coluna = document.createElement("td");
            coluna.textContent = dado;
            linha.appendChild(coluna);
        }

        const colunaAcoes = document.createElement("td");

        const botaoDetalhes = document.createElement("button");
        botaoDetalhes.type = "button";
        botaoDetalhes.textContent = "Ver detalhes";

        const botaoEditar = document.createElement("button");
        botaoEditar.type = "button";
        botaoEditar.textContent = "Editar";

        const botaoExcluir = document.createElement("button");
        botaoExcluir.type = "button";
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.className = "botao-excluir";

        colunaAcoes.appendChild(botaoDetalhes);
        colunaAcoes.appendChild(botaoEditar);
        colunaAcoes.appendChild(botaoExcluir);

        linha.appendChild(colunaAcoes);
        tabela.appendChild(linha);
    }
}

listarAnimais();