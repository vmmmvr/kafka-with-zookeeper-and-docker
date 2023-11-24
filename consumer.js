const {Kafka} = require("kafkajs");

async function run() {
    try {
         const kafka = new Kafka({
            clientId: "kafkaapp",
            brokers: [ "localhost:9092" ]
         });
         const consumer  = kafka.consumer({
            groupId: "consx"
         });
         await consumer.connect();
         console.log("connected");
    
        await consumer.subscribe({
            topic: "Users",
            fromBeginning: "true",

         })

         await consumer.run({
            eachMessage: async result => {
                console.log(`RVD msg ${result.message.value} on partition ${result.partition}`)
            }
         })
    } catch(err) {
        console.log(`ERRR, ${err}`)
    }
    finally {
        // process.exit(); 
    }
}

run();