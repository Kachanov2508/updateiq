import { MongoClient } from "mongodb";

async function handler(req, res) {

    const client = await MongoClient.connect("mongodb://Kachanov2508:Pasword2508@updateiq-shard-00-00.ljmla.mongodb.net:27017,updateiq-shard-00-01.ljmla.mongodb.net:27017,updateiq-shard-00-02.ljmla.mongodb.net:27017/updateiq?ssl=true&replicaSet=atlas-13t95v-shard-0&authSource=admin&retryWrites=true&w=majority")
    const db = client.db();

    const collection = db.collection("courses");

    const course = await collection.findOne({slug: req.query.course});

    let video;
    course.folders.map(folder => {
        let search = folder.video.find(video => video.slug === req.query.lesson);
        if(search) {
            video = search
            return;
        }
    })

    const { name, category, author, duration, description, folders, slug, created_at } = course;

    if(req.method === "GET") {
        res.status(200).json({ name, category, author, duration, description, folders, slug, created_at, video });
    }

    client.close();
}

export default handler;