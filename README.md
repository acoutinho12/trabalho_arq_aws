# Trabalho Final da disciplina de Arquitetura de AWS no curso de pós-graduação de Arquitetura de Software Distribuído da PUC-MG

## Nome e Matrícula

- André Luis Barbosa Coutinho - 138796

## Dependencias

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/pt-BR/docs/install)
- [Docker](https://docs.docker.com/install/)
- [KafkaJs](https://kafka.js.org/)
- [Swagger.io](https://swagger.io/)
- [Kibana](https://www.elastic.co/pt/kibana/)

## Como rodar a aplicação

1. Rode `yarn` para instalar as dependências.<br />
2. Rode `yarn dev` para rodar o nodemon que irá iniciar a aplicação na porta 3333.
3. Rode `docker-composer up -d` para subir o container do kafka na porta 9092 e para visualização na porta 19000.

## Utilidades localhost

- [Kafdrop](http://localhost:19000/) para visualização do tráfego das mensagens e eventos
- [Swagger](http://localhost:3333/api-docs) para visualização da documentação no padrão Open API versão 3.0

## Sobre a Stack utilizada

- `[PT-BR]`[Node.js®](https://nodejs.org/en/about/)
  Como um "runtime" JavaScript assíncrono orientado a eventos, o Node.js foi projetado para criar aplicativos de rede escaláveis.
  Node.js é um software de código aberto, multiplataforma, baseado no interpretador V8 do Google e que permite a execução de códigos JavaScript fora de um navegador web. [Wikipedia](https://pt.wikipedia.org/wiki/Node.js)
- `[EN]` [Node.js®](https://nodejs.org/en/about/)
  As an asynchronous event-driven JavaScript runtime, Node.js is designed to build scalable network applications.
  Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser. [Wikipedia](https://en.wikipedia.org/wiki/Node.js)

## Mecanismos e Abordagens Arquiteturais
Na aplicação construída, foi implementado o de Eventos de Mensageria através do Kafka utilizando a dependência do KafkaJs para troca de mensagens e o Kafdrop para visualização do tráfego dessas mensagens através dos topicos criados, sendo possível criar os tópicos de maneira simples na interface do proprio Kafdrop. Outro ponto abordado também na aplicação foi o conceito de Observabilidade, no qual foi utilizado a ferramenta Kibana que nos fornece de maneira simplificada alguns dashboards, métricas e acesso à logs para aprimorar a aplicação. Outra abordagem bastante importante utilizada foi o nível 2 de maturidade de API's do modelo de [Leonard Richardson](https://en.wikipedia.org/wiki/Richardson_Maturity_Model)
