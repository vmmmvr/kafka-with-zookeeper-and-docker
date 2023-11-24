const {Kafka} = require("kafkajs");

async function run() {
    try {
         const kafka = new Kafka({
            clientId: "kafkaapp",
            brokers: [ "localhost:9092" ]
         });
         const admin  = kafka.admin();
         await admin.connect();
         console.log("connected");

         // A - M, N  - Z   
         await admin.createTopics({
            topics: [
                {
                    topic: "Users",
                    numPartitions: 2,
                }
            ],
            
         });
         console.log("created successfully");
         await admin.disconnect();

    } catch(err) {
        console.log(`ERRR, ${err}`)
    }
    finally {
        process.exit();
    }
}

run();