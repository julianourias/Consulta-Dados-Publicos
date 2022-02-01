# Consulta de Dados Públicos IFPR
Repositório criado para atividade extensionista do curso "Análise e Desenvolvimento de Sistemas - UNINTER", com objetivo de ser uma aplicação que fornece dados públicos (disponíveis em "https://dados.gov.br/") por meio de API no formato JSON, além de trazer um exemplo de aplicação Web que consome dados dessa API. A aplicação Web foi desenvolvida em Angular e a API foi desenvolvida em Node.js com Express.js.

Para executar ambas aplicações você precisará ter o <a href="https://nodejs.org/en/download/">Node.js</a> instalado, e depois execute os seguintes comandos no terminal (Dentro de ambas pastas): 

npm install
npm start

Após esses passos você terá sua API Node.js rodando em "http://localhost:3000", e poderá acessar seus dados nas seguintes rotas:

http://localhost:3000/dados       -> Fornece o nome, tamanho e tipo dos arquivos de dados disponíveis.
http://localhost:3000/dados/:nome -> Passando o nome do arquivo como paramêtro, você receberá seus dados em formato JSON como retorno.

