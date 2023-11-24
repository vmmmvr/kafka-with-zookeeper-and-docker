### Kafka with Nodejs, Zookeeper and Docker
1- have node + docker installed 

2- run zookeeper with docker: 
3- create Network
```
docker network create -d bridge kafka-network
```
```
docker run -d -p 2181:2181 --network kafka-network --name zookeeper zookeeper:latest
```
3- run kafka container:
```
docker run -d -e KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 -p 9092:9092 
--network kafka-network --name kafka confluentinc/cp-kafka:latest
```
4- run commands
```
npm install
npm run topic.js
npm run proucer.js 
npm run consumer.js
```