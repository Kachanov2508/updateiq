import { MongoClient } from "mongodb";

export default async function handler(req, res) {
    
    const client = await MongoClient.connect('mongodb://Kachanov2508:Pasword2508@updateiq-shard-00-00.ljmla.mongodb.net:27017,updateiq-shard-00-01.ljmla.mongodb.net:27017,updateiq-shard-00-02.ljmla.mongodb.net:27017/updateiq?ssl=true&replicaSet=atlas-13t95v-shard-0&authSource=admin&retryWrites=true&w=majority')
    const db = client.db();
    const course = await db.collection('courses').insertOne(req.body);
    
    if(req.method === 'POST') {
        res.status(200).json({ message: "File taked!", course: course })
    }

    client.close();
}