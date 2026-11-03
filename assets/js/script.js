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

const formulario = document.getElementById("form-cadastro");
const mensagem = document.getElementById("mensagem");

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const especie = document.getElementById("especie").value;
    const raca = document.getElementById("raca").value.trim();
    const idadeTexto = document.getElementById("idade").value;
    const cor = document.getElementById("cor").value.trim();
    const tutor = document.getElementById("tutor").value.trim();
    const vacinas = document.getElementById("vacinas").value.trim();
    const prontuario = document.getElementById("prontuario").value.trim();

    if (nome === "" || especie === "" || raca === "" ||
        idadeTexto === "" || tutor === "") {
        mensagem.textContent = "Preencha todos os campos obrigatórios.";
        return;
    }

    const idade = Number(idadeTexto);

    if (!Number.isInteger(idade) || idade < 0) {
        mensagem.textContent = "Informe uma idade válida.";
        return;
    }

    const novoAnimal = {
        id: animais.length > 0 ? Math.max(...animais.map(animal => animal.id)) + 1 : 1,
        nome: nome,
        especie: especie,
        raca: raca,
        idade: idade,
        cor: cor,
        tutor: tutor,
        vacinas: vacinas,
        prontuario: prontuario
    };

    animais.push(novoAnimal);

    listarAnimais();

    mensagem.textContent = "Animal cadastrado com sucesso!";

    formulario.reset();
});

listarAnimais();