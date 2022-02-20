import { MongoClient } from "mongodb";

export default function SearchPage(props) {


    console.log(props.course)

    return (
        <div>
            <h1>Результаты поиска</h1>
            {/* <CourseList courses={courses} /> */}
        </div>
    )
}

export async function getServerSideProps(context) {
    const client = await MongoClient.connect('mongodb://Kachanov2508:Pasword2508@updateiq-shard-00-00.ljmla.mongodb.net:27017,updateiq-shard-00-01.ljmla.mongodb.net:27017,updateiq-shard-00-02.ljmla.mongodb.net:27017/updateiq?ssl=true&replicaSet=atlas-13t95v-shard-0&authSource=admin&retryWrites=true&w=majority')
    const db = client.db()
    const collection = db.collection("courses")


    const data = await collection.find( {slug: "qwe"} ).toArray();


    const course = JSON.parse(JSON.stringify(data))

    client.close()

    return {
        props: {
            course: course,
        }
    }
}