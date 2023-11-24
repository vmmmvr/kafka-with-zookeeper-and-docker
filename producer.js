const {Kafka, Partitioners} = require("kafkajs");
const msg = process.argv[2];

async function run() {
    try {
         const kafka = new Kafka({
            clientId: "kafkaapp",
            brokers: [ "localhost:9092" ]
         });
         const producer  = kafka.producer({
            createPartitioner: Partitioners.LegacyPartitioner
         });
         await producer.connect();
         console.log("connected");
         const partition = msg[0] < "N" ? 0 : 1;  
         // A - M, N  - Z   
       const res =   await producer.send({
            topic: "Users",
            messages: [
                {
                    value: msg,
                    partition: partition,
                }
            ]
         });
         console.log(`sended successfully ${JSON.stringify(res)}`);
         await producer.disconnect();

    } catch(err) {
        console.log(`ERRR, ${err}`)
    }
    finally {
        process.exit();
    }
}

run();