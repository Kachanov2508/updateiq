import { MongoClient } from "mongodb";

async function handler(req, res) {

    const client = await MongoClient.connect("mongodb://Kachanov2508:Pasword2508@updateiq-shard-00-00.ljmla.mongodb.net:27017,updateiq-shard-00-01.ljmla.mongodb.net:27017,updateiq-shard-00-02.ljmla.mongodb.net:27017/updateiq?ssl=true&replicaSet=atlas-13t95v-shard-0&authSource=admin&retryWrites=true&w=majority");
    const db = client.db();

    const collection = db.collection("courses");

    const course = await collection.findOne({category: req.query.courses, slug: req.query.course});

    // Сортируем папки по убыванию
    const folders = await course.folders.sort(function (a, b) {
        if (a.folderName.toLowerCase() < b.folderName.toLowerCase()) return -1;
        if (a.folderName.toLowerCase() > b.folderName.toLowerCase()) return 1;
        return 0;
    });

    // Preview
    const preview = folders[0].files[0].fileUrl; 

    if(req.method === "GET") {
        res.status(200).json({message: "Course Item", data: course, preview})
    }

    client.close();
}

export default handler;