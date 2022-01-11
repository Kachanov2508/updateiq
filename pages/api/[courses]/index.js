import { MongoClient } from "mongodb";

async function handler(req, res) {
    // Подключиться к БД
    // const client = await MongoClient.connect("mongodb+srv://Kachanov2508:Pasword2508@updateiq.ljmla.mongodb.net/updateiq?retryWrites=true&w=majority");
    const client = await MongoClient.connect("mongodb://Kachanov2508:Pasword2508@updateiq-shard-00-00.ljmla.mongodb.net:27017,updateiq-shard-00-01.ljmla.mongodb.net:27017,updateiq-shard-00-02.ljmla.mongodb.net:27017/updateiq?ssl=true&replicaSet=atlas-13t95v-shard-0&authSource=admin&retryWrites=true&w=majority");
    const db = client.db();
    
    // Подключиться к коллекции
    const collection = db.collection("courses");

    if(req.method === "GET") {
        const courses = await collection.find().toArray();
        res.status(200).json({message: "Query saccess", data: courses})
    }

    // Закрыть соединение
    client.close();

}

export default handler;