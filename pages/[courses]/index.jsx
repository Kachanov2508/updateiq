import axios from "axios";
import { MongoClient } from "mongodb";
import Head from "next/head";
import CourseList from "../../components/CourseList/CourseList";

export default function Courses({ courses, category }) {

	const heading = { textTransform: "capitalize" }

	return (
		<>
			<Head>
				<title>Бесплатные курсы по {category} на русском</title>
				<meta name="description" content={`Самые популярные курсы по ${category} переведенные на русский язык`} />
			</Head>
			<h1>Курсы по <span style={heading}>{category}</span></h1>
			<CourseList courses={courses} />
		</>
	);
}

export async function getStaticProps(context) {

	// Подключаемся к БД
	const client = await MongoClient.connect("mongodb://Kachanov2508:Pasword2508@updateiq-shard-00-00.ljmla.mongodb.net:27017,updateiq-shard-00-01.ljmla.mongodb.net:27017,updateiq-shard-00-02.ljmla.mongodb.net:27017/updateiq?ssl=true&replicaSet=atlas-13t95v-shard-0&authSource=admin&retryWrites=true&w=majority");
	const db = client.db();
	// Подключаемся к коллекции
	const collection = db.collection("courses");

	const courses = await collection.find({category: context.params.courses}).toArray();

	let allCourses = JSON.stringify(courses)
	allCourses = JSON.parse(allCourses)

	// Закрыть соединение
	client.close();

	return {
		props: {
			courses: allCourses,
			category: context.params.courses
		},
	};
}

export async function getStaticPaths() {

	const client = await MongoClient.connect("mongodb://Kachanov2508:Pasword2508@updateiq-shard-00-00.ljmla.mongodb.net:27017,updateiq-shard-00-01.ljmla.mongodb.net:27017,updateiq-shard-00-02.ljmla.mongodb.net:27017/updateiq?ssl=true&replicaSet=atlas-13t95v-shard-0&authSource=admin&retryWrites=true&w=majority")
    
	const db = client.db();

    const collection = db.collection("courses");

    const courses = await collection.find().toArray();

	const paths = courses.map((course) => {
		return {
			params: { courses: course.category },
		};
	});

	return {
		paths: paths,
		fallback: false,
	};
}
