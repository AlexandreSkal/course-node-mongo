# Architecture

![microservice drawio (1)](https://user-images.githubusercontent.com/60991421/203374634-ce88c51a-adf5-41d0-aaaa-3f427d5473a0.png)

# apiGateway

This microservice ensures security in the other microservices and unifies the query point for all microservices.
In this microservice we use the following modules:
jwt for authentication.
Jest for all tests
Supertest to complement the tests
joi to ensure the integrity of submitted data
helmet for prevention of most known attacks

#cinemaCatalogService

Microsserviços com diversas rotas para consulta de cidades e cinemas com filmes disponíveis. 
Este microserviço possui um middleware de validação utilizando o jwt
Todo o microserviço possui testes utilizando o jest

# moviesServices

This microservice has routes to search for registered films, it is also possible to insert and delete new films.
It has all the features of the microservices mentioned above.

#tools
To use this project you can user Postman to simplify your tests.
Each Microservice has your its own Database, but to simpplify we can create all Collections in the same database (Just configure .env correctly).

