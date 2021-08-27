# Minha Melhor Receita - server
API em NodeJS utilizando TDD (Jest) + Clean Architecture e Sequelize para o app de receitas (em desenvolvimento)

## Tecnologias
- Node JS
- JavaScript
- Jest
- Supertest
- Express
- Docker
- Postgres
- Sequelize

## Passo a Passo
1. Crie e configure as variaveis de ambiente no arquivo .env seguindo o modelo do .env.example
2. Na raiz do projeto, entre na pasta ```docker``` inicialize o ```docker-compose``` com o comando ```make up```
3. De volta na raiz do projeto, execute os testes unitários e de integração com o comando ```npm run test```
4. Caso ocorra com êxito, inicialize o servidor com o comando ```npm start```

## Modelo Conceitual
<img src="https://github.com/BrunoIgarzabal/mmr-backend/blob/main/screenshots/modelo_conceitual.jpg" />
