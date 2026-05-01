# Sistema de Gestão de Ginásio - Desenvolvimento Web II

## Short theme description

Este projeto consiste no desenvolvimento de uma API REST, explorando operações CRUD, para suportar um Sistema de Gestão de Ginásio. A plataforma permite operar de forma segura sobre perfis de atletas (Users), gerir os seus planos de treino personalizados (Workouts) e consultar uma biblioteca global de atividades físicas (Exercises). A arquitetura contempla relações robustas entre os recursos e regras estritas de isolamento de dados por utilizador. O projeto foi desenvolvido em Node.js (framework Express), com persistência de dados em MySQL gerida através do ORM Sequelize, protegido por múltiplas camadas de autenticação (incluindo OAuth 2.0) e executado num ambiente multi-container Docker.


## Repository organization

A estrutura do nosso repositório compõe se por:

* **Source code** is in the [src folder](src/).
    Contém:
    * API (Express + NodeJS) na pasta [express-server](src/express-server/)
    * Dockerfiles:
        * [Dockerfile da API](src/express-server/Dockerfile)
        * [docker-compose.dev.yaml](src/docker-compose.dev.yaml)
        * [docker-compose.prod.yaml](src/docker-compose.prod.yaml)
    * Initial [OpenApi document](src/openapi.yaml)
* Report chapters are in [doc folder](doc/).
    * Chapter 1: [Project presentation](doc/c1.md)
    * Chapter 2: [Resources](doc/c2.md)
    * Chapter 3: [Product](doc/c3.md)
    * Chapter 4: [Presentation](doc/c4.md)


## Gallery of our Final Result

| Image  | Description | Image´s preview |
| :---    |    :----:   |          ---: |
| Browser | Final result in browser | <img src="" width="300">   |
| Postman | Final result in Postman | <img src="">  |
| Docker  | Multicontainer-App final result in Docker | <img src="" width="300">    |

## Technologies

As tecnologias principais usadas neste projeto foram:

* [nodeJS](https://nodejs.org/en/)
* [expressJS](https://expressjs.com/)
* [MySQL](https://mysql.com/)
* [openAPI](https://openapis.org/)
* [Docker](https://docker.com/)

### Frameworks and Libraries

* Docker
* NodeJS

## Report

### Project presentation
* Chapter 1: [Project presentation](doc/c1.md)
### Resources
* Chapter 2: [Resources](doc/c2.md)
### Product
* Chapter 3: [Product](doc/c3.md)
### Presentation
* Chapter 4: [Presentation](doc/c4.md)

## Equipa

* Camila Olim [@CamiOlli](https://github.com/CamiOlli)
* Rodrigo Esteves [@Rodrigo-Esteves13](https://github.com/Rodrigo-Esteves13)
* Romeu Pinto  [@a047610](https://github.com/a047610)