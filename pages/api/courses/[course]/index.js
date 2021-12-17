import { MongoClient } from "mongodb";

export default async function handler(req, res) {
    
    const client = await MongoClient.connect('mongodb://localhost:27017/updateiq')
    const db = client.db();
    const course = await db.collection('courses').findOne({slug: req.query.course})

    // Сортируем папки по убыванию
    const folders = course.folders.sort(function (a, b) {
        if (a.folderName.toLowerCase() < b.folderName.toLowerCase()) return -1;
        if (a.folderName.toLowerCase() > b.folderName.toLowerCase()) return 1;
        return 0;
    });


    if(req.method === 'GET') {
        res.status(200).json({ message: "File taked!", course: course, folders })
    }
    client.close()
}