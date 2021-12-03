import { MongoClient } from "mongodb";

export default async function handler(req, res) {
    
    const client = await MongoClient.connect('mongodb://localhost:27017/updateiq')
    const db = client.db();
    const course = await db.collection('courses').insertOne(req.body);
    
    if(req.method === 'POST') {
        res.status(200).json({ message: "File taked!", course: course })
    }

    client.close();
}