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

let idEmEdicao = null;

const formulario = document.getElementById("form-cadastro");
const mensagem = document.getElementById("mensagem");
const botaoCadastro = formulario.querySelector("button");
const secaoCadastro = document.getElementById("cadastrar-animal");
const tituloCadastro = secaoCadastro.querySelector("h2");

const pesquisa = document.getElementById("pesquisa");
const filtroEspecie = document.getElementById("filtro-especie");
const ordenacao = document.getElementById("ordenacao");

function listarAnimais() {
    const tabela = document.getElementById("lista-animais");

    tabela.innerHTML = "";

    const textoPesquisa = pesquisa.value.trim().toLowerCase();
    const especieSelecionada = filtroEspecie.value;

    let animaisFiltrados = animais.filter(function (animal) {
        const nome = animal.nome.toLowerCase();
        const tutor = animal.tutor.toLowerCase();
        const especie = animal.especie.toLowerCase();

        const correspondePesquisa =
            nome.includes(textoPesquisa) ||
            tutor.includes(textoPesquisa);

        const correspondeEspecie =
            especieSelecionada === "todos" ||
            especie === especieSelecionada;

        return correspondePesquisa && correspondeEspecie;
    });

    if (ordenacao.value === "nome") {
        animaisFiltrados.sort(function (a, b) {
            return a.nome.localeCompare(b.nome);
        });
    } else if (ordenacao.value === "idade") {
        animaisFiltrados.sort(function (a, b) {
            return a.idade - b.idade;
        });
    }

    if (animaisFiltrados.length === 0) {
        const linha = document.createElement("tr");
        const coluna = document.createElement("td");

        coluna.colSpan = 6;
        coluna.textContent = "Nenhum animal encontrado.";

        linha.appendChild(coluna);
        tabela.appendChild(linha);

        return;
    }

    for (let animal of animaisFiltrados) {
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

        botaoDetalhes.addEventListener("click", function () {
            mostrarDetalhes(animal.id, true);
        });

        const botaoEditar = document.createElement("button");
        botaoEditar.type = "button";
        botaoEditar.textContent = "Editar";

        botaoEditar.addEventListener("click", function () {
            editarAnimal(animal.id);
        });

        const botaoExcluir = document.createElement("button");
        botaoExcluir.type = "button";
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.className = "botao-excluir";

        botaoExcluir.addEventListener("click", function () {
            excluirAnimal(animal.id);
        });

        colunaAcoes.appendChild(botaoDetalhes);
        colunaAcoes.appendChild(botaoEditar);
        colunaAcoes.appendChild(botaoExcluir);

        linha.appendChild(colunaAcoes);
        tabela.appendChild(linha);
    }
}

function mostrarDetalhes(id, mover = false) {
    const animal = animais.find(function (item) {
        return item.id === id;
    });

    const artigo = document.querySelector("#detalhes article");
    artigo.innerHTML = "";

    if (!animal) {
        const aviso = document.createElement("p");
        aviso.textContent = "Nenhum animal selecionado.";
        artigo.appendChild(aviso);
        return;
    }

    const titulo = document.createElement("h3");
    titulo.textContent = animal.nome;
    artigo.appendChild(titulo);

    if (animal.id === 1) {
        const imagem = document.createElement("img");
        imagem.src = "assets/img/thor.jpg";
        imagem.alt = "Foto do cachorro Thor";
        artigo.appendChild(imagem);
    }

    const campos = [
        ["Espécie", animal.especie],
        ["Raça", animal.raca],
        ["Idade", animal.idade + " anos"],
        ["Coloração", animal.cor],
        ["Tutor", animal.tutor]
    ];

    for (let campo of campos) {
        const paragrafo = document.createElement("p");
        const destaque = document.createElement("strong");

        destaque.textContent = campo[0] + ": ";
        paragrafo.appendChild(destaque);
        paragrafo.appendChild(document.createTextNode(campo[1]));

        artigo.appendChild(paragrafo);
    }

    const tituloVacinas = document.createElement("h4");
    tituloVacinas.textContent = "Histórico Vacinal";
    artigo.appendChild(tituloVacinas);

    const vacinas = document.createElement("p");
    vacinas.textContent = animal.vacinas || "Não informado.";
    artigo.appendChild(vacinas);

    const tituloProntuario = document.createElement("h4");
    tituloProntuario.textContent = "Prontuário";
    artigo.appendChild(tituloProntuario);

    const prontuario = document.createElement("p");
    prontuario.textContent = animal.prontuario || "Não informado.";
    artigo.appendChild(prontuario);

    const botaoEditar = document.createElement("button");
    botaoEditar.type = "button";
    botaoEditar.textContent = "Editar";

    botaoEditar.addEventListener("click", function () {
        editarAnimal(animal.id);
    });

    const botaoExcluir = document.createElement("button");
    botaoExcluir.type = "button";
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.className = "botao-excluir";

    botaoExcluir.addEventListener("click", function () {
        excluirAnimal(animal.id);
    });

    artigo.appendChild(botaoEditar);
    artigo.appendChild(botaoExcluir);

    if (mover) {
        document.getElementById("detalhes").scrollIntoView({
            behavior: "smooth"
        });
    }
}

function editarAnimal(id) {
    const animal = animais.find(function (item) {
        return item.id === id;
    });

    if (!animal) {
        return;
    }

    idEmEdicao = animal.id;

    document.getElementById("nome").value = animal.nome;
    document.getElementById("especie").value = animal.especie;
    document.getElementById("raca").value = animal.raca;
    document.getElementById("idade").value = animal.idade;
    document.getElementById("cor").value = animal.cor;
    document.getElementById("tutor").value = animal.tutor;
    document.getElementById("vacinas").value = animal.vacinas;
    document.getElementById("prontuario").value = animal.prontuario;

    tituloCadastro.textContent = "Editar Animal";
    secaoCadastro.classList.add("modo-edicao");

    botaoCadastro.textContent = "Salvar Alterações";
    mensagem.textContent = "Altere os dados e clique em Salvar Alterações.";

    secaoCadastro.scrollIntoView({
        behavior: "smooth"
    });
}

function excluirAnimal(id) {
    const animal = animais.find(function (item) {
        return item.id === id;
    });

    if (!animal) {
        return;
    }

    const confirmar = confirm("Deseja excluir " + animal.nome + "?");

    if (!confirmar) {
        return;
    }

    animais = animais.filter(function (item) {
        return item.id !== id;
    });

    if (idEmEdicao === id) {
        idEmEdicao = null;
        formulario.reset();
        botaoCadastro.textContent = "Cadastrar Animal";
        tituloCadastro.textContent = "Cadastrar Animal";
        secaoCadastro.classList.remove("modo-edicao");
    }

    listarAnimais();

    if (animais.length > 0) {
        mostrarDetalhes(animais[0].id);
    } else {
        mostrarDetalhes(null);
    }

    mensagem.textContent = "Animal excluído com sucesso!";
}

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

    let id = idEmEdicao;

    if (id === null) {
        id = 1;

        for (let animal of animais) {
            if (animal.id >= id) {
                id = animal.id + 1;
            }
        }
    }

    const animalAtualizado = {
        id: id,
        nome: nome,
        especie: especie,
        raca: raca,
        idade: idade,
        cor: cor,
        tutor: tutor,
        vacinas: vacinas,
        prontuario: prontuario
    };

    if (idEmEdicao === null) {
        animais.push(animalAtualizado);
        mensagem.textContent = "Animal cadastrado com sucesso!";
    } else {
        const indice = animais.findIndex(function (animal) {
            return animal.id === idEmEdicao;
        });

        if (indice !== -1) {
            animais[indice] = animalAtualizado;
        }

        mensagem.textContent = "Animal atualizado com sucesso!";
    }

    idEmEdicao = null;
    botaoCadastro.textContent = "Cadastrar Animal";
    tituloCadastro.textContent = "Cadastrar Animal";
    secaoCadastro.classList.remove("modo-edicao");

    formulario.reset();

    listarAnimais();
    mostrarDetalhes(id);
});

pesquisa.addEventListener("input", listarAnimais);

filtroEspecie.addEventListener("change", listarAnimais);

ordenacao.addEventListener("change", listarAnimais);

document.querySelector("#animais form").addEventListener("submit", function (evento) {
    evento.preventDefault();
    listarAnimais();
});

document.querySelector("#animais form button").addEventListener("click", listarAnimais);

listarAnimais();
mostrarDetalhes(1);