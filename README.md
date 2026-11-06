# VetSystem

Sistema web para gerenciamento de animais em uma clínica veterinária.

## Objetivo

O VetSystem tem como objetivo organizar as informações dos animais atendidos por uma clínica veterinária, permitindo o cadastro e o gerenciamento de dados como nome, espécie, raça, idade, coloração, tutor, histórico vacinal e prontuário.

O sistema também permite armazenar informações de contato e endereço dos tutores.

## Funcionalidades

- Cadastro de animais
- Listagem dinâmica de animais
- Visualização dos detalhes dos animais
- Edição de informações
- Exclusão de animais
- Pesquisa por nome do animal ou tutor
- Filtro por espécie
- Ordenação por nome ou idade
- Validação dos campos obrigatórios
- Mensagens de confirmação das operações
- Armazenamento dos dados utilizando localStorage
- Consulta automática de endereços pela API ViaCEP
- Cadastro de telefone e e-mail dos tutores
- Cadastro de CEP, endereço, número e complemento
- Informações da clínica
- Interface responsiva para computadores e dispositivos móveis

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- localStorage
- API ViaCEP
- Git e GitHub
- GitHub Pages

## Desenvolvimento

O projeto foi desenvolvido em três etapas.

### Etapa 1 — HTML

Criação da estrutura inicial da aplicação, incluindo formulários, listagem de animais, navegação e organização das informações da clínica.

### Etapa 2 — CSS

Implementação da identidade visual, estilização dos componentes, utilização de Flexbox e CSS Grid, além de ajustes de responsividade e acessibilidade.

### Etapa 3 — JavaScript

Implementação das funcionalidades interativas da aplicação:

- Operações de cadastro, leitura, edição e exclusão de animais (CRUD)
- Manipulação dinâmica do DOM
- Pesquisa, filtros e ordenação
- Validação dos dados do formulário
- Persistência dos registros no localStorage
- Integração com a API ViaCEP

## Integração com API pública — ViaCEP

Inicialmente, o projeto previa a utilização da API do Google Maps.

Durante o desenvolvimento da Etapa 3, optei por utilizar a API ViaCEP, por oferecer uma integração mais simples e diretamente relacionada às funcionalidades de cadastro dos tutores.

Essa escolha permitiu implementar a consulta automática de endereços a partir do CEP informado pelo usuário.

### Funcionamento

1. O usuário informa o CEP do tutor.
2. Ao clicar em **Buscar CEP**, o sistema realiza uma requisição à API ViaCEP utilizando JavaScript.
3. A API retorna as informações de endereço.
4. O campo de endereço é preenchido automaticamente.
5. O usuário informa o número e o complemento.
6. As informações são armazenadas junto ao cadastro do animal no localStorage.

O sistema também apresenta mensagens em caso de CEP inválido, não encontrado ou falha na consulta.

**API utilizada:** https://viacep.com.br/

## Persistência de dados

O VetSystem utiliza o localStorage do navegador para armazenar os registros dos animais.

Dessa forma, os dados cadastrados, editados ou excluídos são mantidos entre atualizações da página, enquanto permanecerem armazenados no navegador utilizado.

## Validação do cadastro

Todos os campos do formulário são obrigatórios.

O sistema verifica o preenchimento dos dados, a validade da idade, o formato do telefone e do e-mail e a realização da consulta do CEP antes de permitir o cadastro.

## Publicação

A aplicação está disponível no GitHub Pages:

https://pedrobragambleme.github.io/vetsystem/

## Repositório

Código-fonte disponível no GitHub:

https://github.com/pedrobragambleme/vetsystem

## Autor

Pedro Braga Morgan Bleme