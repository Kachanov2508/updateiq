import { MongoClient } from "mongodb";

export default async function handler(req, res) {
    
    
    if (req.method === 'GET') {
        const client = await MongoClient.connect("mongodb://localhost:27017/updateiq");
        const db = client.db();
        const courses = await db.collection("courses").find().toArray();
        
        try {
            res.status(200).json(courses);
		} catch (error) {
            res.status(500).json({message: "Что то пошло не так!"});
		}
        client.close();
	}
}
