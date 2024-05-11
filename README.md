Desafio Técnico

Objetivo: Desenvolvimento do backend em C#, integração com PostgreSQL e consumo da API Random User Generator.

Backend:

Desenvolvimento de CRUD com 7 endpoints, testáveis via Swagger.
Utilização da arquitetura hexagonal dividida em 4 projetos:

API: Concentra os endpoints.

Core: Entidades e regras de negócio.

Persistence: Camada de dados com Entity Framework (Code First).

Utilities: Utilidades diversas.

Herança para um desenvolvimento limpo, evitando repetição de código.
Implementação de paginação para melhor desempenho.

Frontend:

Utilização do React e Material-UI para manipular componentes.
Separação de componentes personalizados na pasta "component".
Integração com PostgreSQL para armazenar dados gerados pela API Random User Generator.
Consumo da API Random User Generator para gerar dados de usuário aleatórios.
Criação de relatório de usuários com opção de filtragem por nome.
Implementação básica em JavaScript para geração, cadastro, edição e exclusão de usuários.

Observações:
Recomendado instalar Node.js para testar o frontend utilizando npm.
Desenvolvido com .NET Core 8.0.

Integração com banco de dados relacional (PostgreSQL): Feito. Foi criada uma entidade "User" para armazenar apenas o nome de usuário, e-mail e senha da API Random Generator. 
Em termos simples, essa API pública é chamada para gerar aleatoriamente e-mail, senha e nome de usuário.
Essas informações são então capturadas no front-end e passadas para o endpoint correspondente no backend para serem armazenadas.

Consumo da API Random User Generator: Feito. A API é consumida e os dados são enviados para o backend e armazenados.

Relatório de usuários: Feito. Um relatório é criado na tela com um botão para gerar usuários, que chama a API pública.
Os dados são apresentados ao usuário e, ao clicar em salvar, são armazenados e exibidos em uma tabela, onde é possível filtrar pelo nome.

Front-end básico em JavaScript: Feito. Utilizei JavaScript para elaborar a tela de geração, cadastro, edição e exclusão de usuários.


![image](https://github.com/GuilhermeLimaaDoAmaral/Paschoalotto-Desafio/assets/84554855/546ee9cf-066a-470c-8929-0cdef711db4d)

![image](https://github.com/GuilhermeLimaaDoAmaral/Paschoalotto-Desafio/assets/84554855/2d0130a5-5454-45cd-b5d7-90a8727ef81d)


