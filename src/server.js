const express = require("express");
const routes = require("./routes");
const { Kafka, logLevel } = require("kafkajs");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

require("./database");

const app = express();

const kafka = new Kafka({
  clientId: "api",
  brokers: ["localhost:9092"],
  logLevel: logLevel.WARN,
  retry: {
    initialRetryTime: 300,
    retries: 10,
  },
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "torneios-group" });

/**
 * Disponibiliza o producer para todas rotas
 */
app.use((req, res, next) => {
  req.producer = producer;

  return next();
});

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/v1", routes);

async function run() {
  await producer.connect();
  await consumer.connect();

  app.listen(3333);
}

run().catch(console.error);
