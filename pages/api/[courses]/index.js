import { MongoClient } from "mongodb";

async function handler(req, res) {
    // Подключиться к БД
    const client = await MongoClient.connect("mongodb+srv://Kachanov2508:Pasword2508@updateiq.ljmla.mongodb.net/updateiq?retryWrites=true&w=majority");
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