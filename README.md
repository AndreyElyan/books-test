﻿# Biblio Store with Node JS

O repositório apresenta o sistema de biblioteca online

## Instalação banco de dados (opcional)

- Instalação do banco de dados postgres, se tiver o docker instalado na máquina é necessário que
  a porta 5432 esteja liberada e que o comando "docker run --name postgresDB -p 5432:5432 -d -t kartoza/postgis"
  seja rodado e finalizado corretamente. (opcional)

Os dados da API foram trabalhados encima do Sequelize.
Portanto, é necessário informar os dados do banco no arquivo de configuração em /Config/database.js.

```
## Para rodar o backend

- Entrar na pasta raiz e rodar o comando yarn ou npm install, para instalar as dependências.

- Após a configuração do arquivo (/Config/database.js) na raiz do projeto (src), rodar o comando "npx sequelize db:migrate".

- Na raiz (src) rodar o comando yarn dev ou npm run start.

```

Especificação Técnica de utilização e desenvolvimento em :

https://github.com/AndreyElyan/books-test/blob/master/Especifica%C3%A7%C3%A3o%20T%C3%A9cnica%20-%20Books%20Store%20Ok.pdf
