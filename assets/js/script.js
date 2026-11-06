// ========================================
// VETSYSTEM - ETAPA 3
// ========================================

// ========================================
// 1. DADOS INICIAIS
// ========================================

const animaisIniciais = [
    {
        id: 1,
        nome: "Thor",
        especie: "Cachorro",
        raca: "Golden Retriever",
        idade: 5,
        cor: "Dourado",
        tutor: "João Silva",
        telefone: "",
        email: "",
        cep: "",
        endereco: "",
        numero: "",
        complemento: "",
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
        telefone: "",
        email: "",
        cep: "",
        endereco: "",
        numero: "",
        complemento: "",
        vacinas: "Vacinas em dia.",
        prontuario: "Animal saudável."
    }
];

// ========================================
// 2. LOCALSTORAGE
// ========================================

let animais = animaisIniciais;

try {
    const dadosSalvos = localStorage.getItem("vetsystem_animais");

    if (dadosSalvos !== null) {
        const dados = JSON.parse(dadosSalvos);

        if (Array.isArray(dados)) {
            animais = dados;
        }
    }

} catch (erro) {
    console.error("Erro ao carregar os animais:", erro);
}

function salvarAnimais() {
    localStorage.setItem(
        "vetsystem_animais",
        JSON.stringify(animais)
    );
}

// ========================================
// 3. VARIÁVEIS E ELEMENTOS HTML
// ========================================

let idEmEdicao = null;

const formulario = document.getElementById("form-cadastro");

const mensagem = document.getElementById("mensagem");

const botaoCadastro = formulario.querySelector(
    'button[type="submit"]'
);

const secaoCadastro = document.getElementById("cadastrar-animal");

const tituloCadastro = secaoCadastro.querySelector("h2");

const pesquisa = document.getElementById("pesquisa");

const filtroEspecie = document.getElementById("filtro-especie");

const ordenacao = document.getElementById("ordenacao");

const campoCep = document.getElementById("cep");

const campoEndereco = document.getElementById("endereco");

const botaoBuscarCep = document.getElementById("buscar-cep");

let cepConsultado = "";

// ========================================
// 4. INTEGRAÇÃO COM API VIACEP
// ========================================

// Se o usuário alterar o CEP, o endereço
// consultado anteriormente será apagado.

campoCep.addEventListener("input", function () {

    const cepAtual = campoCep.value.replace(/\D/g, "");

    if (cepAtual !== cepConsultado) {
        campoEndereco.value = "";
        cepConsultado = "";
    }

});

// Consultar endereço utilizando ViaCEP.

botaoBuscarCep.addEventListener("click", async function () {

    const cep = campoCep.value.replace(/\D/g, "");

    // Verifica se o CEP tem 8 números.

    if (cep.length !== 8) {
        mensagem.textContent = "Digite um CEP válido com 8 números.";
        return;
    }

    mensagem.textContent = "Consultando CEP...";

    botaoBuscarCep.disabled = true;

    try {

        const resposta = await fetch(
            `https://viacep.com.br/ws/${cep}/json/`
        );

        if (!resposta.ok) {
            throw new Error("Falha na consulta.");
        }

        const dados = await resposta.json();

        // CEP não encontrado.

        if (dados.erro) {

            campoEndereco.value = "";
            cepConsultado = "";

            mensagem.textContent = "CEP não encontrado.";

            return;
        }

        // Verifica se o CEP não foi alterado
        // durante a consulta.

        if (campoCep.value.replace(/\D/g, "") !== cep) {

            mensagem.textContent =
                "O CEP foi alterado. Faça uma nova consulta.";

            return;
        }

        // Monta o endereço recebido da API.

        const partesEndereco = [
            dados.logradouro,
            dados.bairro,
            dados.localidade,
            dados.uf
        ].filter(Boolean);

        const enderecoCompleto = partesEndereco.join(", ");

        if (enderecoCompleto === "") {

            mensagem.textContent =
                "Não foi possível obter o endereço.";

            return;
        }

        // Preenche automaticamente o campo.

        campoEndereco.value = enderecoCompleto;

        cepConsultado = cep;

        mensagem.textContent =
            "Endereço encontrado com sucesso! Preencha o número e o complemento.";

    } catch (erro) {

        console.error("Erro ao consultar ViaCEP:", erro);

        campoEndereco.value = "";
        cepConsultado = "";

        mensagem.textContent =
            "Não foi possível consultar o CEP. Tente novamente.";

    } finally {

        botaoBuscarCep.disabled = false;

    }

});

// ========================================
// 5. LISTAR ANIMAIS
// ========================================

function listarAnimais() {

    const tabela = document.getElementById("lista-animais");

    tabela.innerHTML = "";

    const textoPesquisa = pesquisa.value.trim().toLowerCase();

    const especieSelecionada = filtroEspecie.value;

    // Pesquisa por nome ou tutor e filtra espécie.

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

    // Ordenar por nome.

    if (ordenacao.value === "nome") {

        animaisFiltrados.sort(function (a, b) {
            return a.nome.localeCompare(b.nome, "pt-BR");
        });

    }

    // Ordenar por idade.

    else if (ordenacao.value === "idade") {

        animaisFiltrados.sort(function (a, b) {
            return a.idade - b.idade;
        });

    }

    // Nenhum animal encontrado.

    if (animaisFiltrados.length === 0) {

        const linha = document.createElement("tr");

        const coluna = document.createElement("td");

        coluna.colSpan = 6;

        coluna.textContent = "Nenhum animal encontrado.";

        linha.appendChild(coluna);

        tabela.appendChild(linha);

        return;
    }

    // Criar linhas da tabela.

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

        // Coluna de ações.

        const colunaAcoes = document.createElement("td");

        // Botão detalhes.

        const botaoDetalhes = document.createElement("button");

        botaoDetalhes.type = "button";

        botaoDetalhes.textContent = "Ver detalhes";

        botaoDetalhes.addEventListener("click", function () {
            mostrarDetalhes(animal.id, true);
        });

        // Botão editar.

        const botaoEditar = document.createElement("button");

        botaoEditar.type = "button";

        botaoEditar.textContent = "Editar";

        botaoEditar.addEventListener("click", function () {
            editarAnimal(animal.id);
        });

        // Botão excluir.

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

// ========================================
// 6. MOSTRAR DETALHES
// ========================================

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

    // Nome do animal.

    const titulo = document.createElement("h3");

    titulo.textContent = animal.nome;

    artigo.appendChild(titulo);

    // Foto do Thor.

    if (animal.id === 1 && animal.nome === "Thor") {

        const imagem = document.createElement("img");

        imagem.src = "assets/img/thor.jpg";

        imagem.alt = "Foto do cachorro Thor";

        artigo.appendChild(imagem);
    }

    // Dados do animal e do tutor.

    const campos = [
        ["Espécie", animal.especie],
        ["Raça", animal.raca],
        ["Idade", animal.idade + " anos"],
        ["Coloração", animal.cor || "Não informada"],
        ["Tutor", animal.tutor],
        ["Telefone do tutor", animal.telefone || "Não informado"],
        ["E-mail do tutor", animal.email || "Não informado"],
        ["CEP do tutor", animal.cep || "Não informado"],
        ["Endereço do tutor", animal.endereco || "Não informado"],
        ["Número", animal.numero || "Não informado"],
        ["Complemento", animal.complemento || "Não informado"]
    ];

    for (let campo of campos) {

        const paragrafo = document.createElement("p");

        const destaque = document.createElement("strong");

        destaque.textContent = campo[0] + ": ";

        paragrafo.appendChild(destaque);

        paragrafo.appendChild(
            document.createTextNode(String(campo[1]))
        );

        artigo.appendChild(paragrafo);
    }

    // Histórico vacinal.

    const tituloVacinas = document.createElement("h4");

    tituloVacinas.textContent = "Histórico Vacinal";

    artigo.appendChild(tituloVacinas);

    const vacinas = document.createElement("p");

    vacinas.textContent = animal.vacinas || "Não informado.";

    artigo.appendChild(vacinas);

    // Prontuário.

    const tituloProntuario = document.createElement("h4");

    tituloProntuario.textContent = "Prontuário";

    artigo.appendChild(tituloProntuario);

    const prontuario = document.createElement("p");

    prontuario.textContent = animal.prontuario || "Não informado.";

    artigo.appendChild(prontuario);

    // Botão editar.

    const botaoEditar = document.createElement("button");

    botaoEditar.type = "button";

    botaoEditar.textContent = "Editar";

    botaoEditar.addEventListener("click", function () {
        editarAnimal(animal.id);
    });

    // Botão excluir.

    const botaoExcluir = document.createElement("button");

    botaoExcluir.type = "button";

    botaoExcluir.textContent = "Excluir";

    botaoExcluir.className = "botao-excluir";

    botaoExcluir.addEventListener("click", function () {
        excluirAnimal(animal.id);
    });

    artigo.appendChild(botaoEditar);

    artigo.appendChild(botaoExcluir);

    // Rolar até os detalhes, se solicitado.

    if (mover) {

        document.getElementById("detalhes").scrollIntoView({
            behavior: "smooth"
        });
    }

}

// ========================================
// 7. EDITAR ANIMAL
// ========================================

function editarAnimal(id) {

    const animal = animais.find(function (item) {
        return item.id === id;
    });

    if (!animal) {
        return;
    }

    idEmEdicao = animal.id;

    // Dados do animal.

    document.getElementById("nome").value = animal.nome;

    document.getElementById("especie").value = animal.especie;

    document.getElementById("raca").value = animal.raca;

    document.getElementById("idade").value = animal.idade;

    document.getElementById("cor").value = animal.cor || "";

    // Dados do tutor.

    document.getElementById("tutor").value = animal.tutor;

    document.getElementById("telefone").value =
        animal.telefone || "";

    document.getElementById("email").value =
        animal.email || "";

    // Endereço.

    campoCep.value = animal.cep || "";

    campoEndereco.value = animal.endereco || "";

    document.getElementById("numero").value =
        animal.numero || "";

    document.getElementById("complemento").value =
        animal.complemento || "";

    // Se já existia endereço consultado,
    // permite manter o mesmo CEP.

    cepConsultado = animal.endereco
        ? (animal.cep || "").replace(/\D/g, "")
        : "";

    // Dados veterinários.

    document.getElementById("vacinas").value =
        animal.vacinas || "";

    document.getElementById("prontuario").value =
        animal.prontuario || "";

    // Alterar a aparência do formulário.

    tituloCadastro.textContent = "Editar Animal";

    secaoCadastro.classList.add("modo-edicao");

    botaoCadastro.textContent = "Salvar Alterações";

    mensagem.textContent =
        "Altere os dados e clique em Salvar Alterações.";

    secaoCadastro.scrollIntoView({
        behavior: "smooth"
    });

}

// ========================================
// 8. EXCLUIR ANIMAL
// ========================================

function excluirAnimal(id) {

    const animal = animais.find(function (item) {
        return item.id === id;
    });

    if (!animal) {
        return;
    }

    const confirmar = confirm(
        "Deseja excluir " + animal.nome + "?"
    );

    if (!confirmar) {
        return;
    }

    // Remove o animal do array.

    animais = animais.filter(function (item) {
        return item.id !== id;
    });

    // Atualiza o localStorage.

    salvarAnimais();

    // Se estava editando o animal excluído,
    // limpa o formulário.

    if (idEmEdicao === id) {

        idEmEdicao = null;

        formulario.reset();

        cepConsultado = "";

        botaoCadastro.textContent = "Cadastrar Animal";

        tituloCadastro.textContent = "Cadastrar Animal";

        secaoCadastro.classList.remove("modo-edicao");
    }

    // Atualiza a interface.

    listarAnimais();

    if (animais.length > 0) {
        mostrarDetalhes(animais[0].id);
    } else {
        mostrarDetalhes(null);
    }

    mensagem.textContent = "Animal excluído com sucesso!";

}

// ========================================
// 9. CADASTRAR E ATUALIZAR ANIMAL
// ========================================

formulario.addEventListener("submit", function (evento) {

    evento.preventDefault();

    // Dados do animal.

    const nome = document.getElementById("nome").value.trim();

    const especie = document.getElementById("especie").value;

    const raca = document.getElementById("raca").value.trim();

    const idadeTexto = document.getElementById("idade").value;

    const cor = document.getElementById("cor").value.trim();

    // Dados do tutor.

    const tutor = document.getElementById("tutor").value.trim();

    const telefone = document.getElementById("telefone").value.trim();

    const email = document.getElementById("email").value.trim();

    // Endereço do tutor.

    const cep = campoCep.value.replace(/\D/g, "");

    const endereco = campoEndereco.value.trim();

    const numero = document.getElementById("numero").value.trim();

    const complemento = document.getElementById("complemento").value.trim();

    // Dados veterinários.

    const vacinas = document.getElementById("vacinas").value.trim();

    const prontuario = document.getElementById("prontuario").value.trim();

    // ========================================
    // VALIDAÇÃO DE CAMPOS OBRIGATÓRIOS
    // ========================================

    if (
        nome === "" ||
        especie === "" ||
        raca === "" ||
        idadeTexto === "" ||
        cor === "" ||
        tutor === "" ||
        telefone === "" ||
        email === "" ||
        cep === "" ||
        endereco === "" ||
        numero === "" ||
        complemento === "" ||
        vacinas === "" ||
        prontuario === ""
    ) {

        mensagem.textContent =
            "Todos os campos são obrigatórios.";

        return;
    }

    // Validar idade.

    const idade = Number(idadeTexto);

    if (!Number.isInteger(idade) || idade < 0) {

        mensagem.textContent =
            "Informe uma idade válida.";

        return;
    }

    // Validar telefone com DDD.

    const telefoneNumeros = telefone.replace(/\D/g, "");

    if (
        telefoneNumeros.length !== 10 &&
        telefoneNumeros.length !== 11
    ) {

        mensagem.textContent =
            "Informe um telefone válido com DDD.";

        return;
    }

    // Validar e-mail.

    const campoEmail = document.getElementById("email");

    if (!campoEmail.checkValidity()) {

        mensagem.textContent =
            "Informe um e-mail válido.";

        return;
    }

    // Validar CEP e consulta à API.

    if (
        cep.length !== 8 ||
        cep !== cepConsultado ||
        endereco === ""
    ) {

        mensagem.textContent =
            "Consulte um CEP válido antes de cadastrar.";

        return;
    }

    // ========================================
    // GERAR ID
    // ========================================

    let id = idEmEdicao;

    if (id === null) {

        id = 1;

        for (let animal of animais) {

            if (animal.id >= id) {
                id = animal.id + 1;
            }

        }

    }

    // ========================================
    // CRIAR OBJETO DO ANIMAL
    // ========================================

    const animalAtualizado = {
        id: id,
        nome: nome,
        especie: especie,
        raca: raca,
        idade: idade,
        cor: cor,
        tutor: tutor,
        telefone: telefone,
        email: email,
        cep: cep,
        endereco: endereco,
        numero: numero,
        complemento: complemento,
        vacinas: vacinas,
        prontuario: prontuario
    };

    // ========================================
    // CADASTRO OU EDIÇÃO
    // ========================================

    if (idEmEdicao === null) {

        // Novo cadastro.

        animais.push(animalAtualizado);

        mensagem.textContent =
            "Animal cadastrado com sucesso!";

    } else {

        // Atualização de cadastro existente.

        const indice = animais.findIndex(function (animal) {
            return animal.id === idEmEdicao;
        });

        if (indice !== -1) {
            animais[indice] = animalAtualizado;
        }

        mensagem.textContent =
            "Animal atualizado com sucesso!";

    }

    // ========================================
    // SALVAR NO LOCALSTORAGE
    // ========================================

    salvarAnimais();

    // ========================================
    // RESTAURAR FORMULÁRIO
    // ========================================

    idEmEdicao = null;

    cepConsultado = "";

    botaoCadastro.textContent = "Cadastrar Animal";

    tituloCadastro.textContent = "Cadastrar Animal";

    secaoCadastro.classList.remove("modo-edicao");

    formulario.reset();

    // ========================================
    // ATUALIZAR INTERFACE
    // ========================================

    listarAnimais();

    mostrarDetalhes(id);

});

// ========================================
// 10. PESQUISA, FILTROS E ORDENAÇÃO
// ========================================

pesquisa.addEventListener("input", listarAnimais);

filtroEspecie.addEventListener("change", listarAnimais);

ordenacao.addEventListener("change", listarAnimais);

// Impedir recarregamento pelo formulário de busca.

document.querySelector("#animais form").addEventListener(
    "submit",
    function (evento) {

        evento.preventDefault();

        listarAnimais();

    }
);

// Botão pesquisar.

document.querySelector("#animais form button").addEventListener(
    "click",
    listarAnimais
);

// ========================================
// 11. INICIALIZAR SISTEMA
// ========================================

listarAnimais();

if (animais.length > 0) {

    mostrarDetalhes(animais[0].id);

} else {

    mostrarDetalhes(null);

}