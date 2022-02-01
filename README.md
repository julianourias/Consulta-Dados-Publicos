# Consulta de Dados Públicos
Repositório criado para atividade extensionista do curso "Análise e Desenvolvimento de Sistemas - UNINTER", com objetivo de ser uma aplicação que fornece dados públicos (disponíveis em: https://dados.gov.br/), por meio de API que retorna-os no formato JSON, além de trazer um exemplo de aplicação Web que consome dados dessa API. A aplicação Web foi desenvolvida em Angular e a API foi desenvolvida em Node.js com Express.js.

Para executar as aplicações você precisará ter o <a href="https://nodejs.org/en/download/">Node.js</a> instalado, e depois executar os seguintes comandos no terminal (na pasta raíz de ambas aplicações): 

```
npm install
npm start
```

Após esses passos você terá sua API Node.js rodando em `http://localhost:3000`, e poderá acessar seus dados nas seguintes rotas:

`http://localhost:3000/dados`: Fornece o nome, tamanho e tipo dos dados disponíveis.<br />
`http://localhost:3000/dados/:nome`: Passando o nome do arquivo como paramêtro, você receberá seus dados em formato JSON como retorno.

E a aplicação Angular ficará disponível em `http://localhost:4200/`, e tem a interface apresentada <a href="https://www.youtube.com/watch?v=6nAIlWxtmxA">Neste vídeo </a>.


A API foi alimentada com <a href="https://dados.gov.br/dataset?organization=instituto-federal-de-educacao-ciencia-e-tecnologia-do-parana-ifpr&q=IFPR"> dados da instuição IFPR </a>, e a aplicação Web consume apenas os dados da rota `http://localhost:3000/dados/projetos-de-pesquisa-extensao-e-inovacao`, mas ambas aplicações podem ser expandidas para consumo de outros dados públicos.
