import axios from "axios";
import CourseDescription from "../../../components/Course/CourseDescription/CourseDescription";
import CourseFolders from "../../../components/Course/CourseFolders/CourseFolders";
import classes from "../../../styles/CoursePage.module.scss";
import CoursePreview from "../../../components/CourseList/CoursePreview/CoursePreview";
import Head from "next/head";

import { MongoClient } from "mongodb";


export default function CoursePage({course}) {

	return (
			<>
			<Head>
				<title>{`Курс ${course.name} на русском`}</title>
				<meta name="description" content={`Курс ${course.name} от автора ${course.author} на русском языке`} />
			</Head>
				<div className={classes.grid}>
					<div className={classes.coursePreview}>
						<CoursePreview
							name={course.name}
							author={course.author}
							category={course.category}
							duration={course.duration}
							description={course.description}
							slug={course.slug}
							created_at={course.created_at}
							previewImage={course.preview.image.fileUrl}
							textPreview={course.preview.text}
							link={`/${course.category}/${course.slug}/${course.folders[0].video[0].slug}`}
							textBtn="Смотреть"
						/>
					</div>
					<div className={classes.courseFolders}>
						<CourseFolders folders={course.folders} courseSlug={course.slug} courseCategory={course.category} />
					</div>
					<div className={classes.courseDescription}>
						<CourseDescription author={course.author} duration={course.duration} description={course.description} createdAt={course.created_at} />
					</div>
				</div>
			</>
	);
};


export async function getStaticProps(context) {
	const client = await MongoClient.connect("mongodb://Kachanov2508:Pasword2508@updateiq-shard-00-00.ljmla.mongodb.net:27017,updateiq-shard-00-01.ljmla.mongodb.net:27017,updateiq-shard-00-02.ljmla.mongodb.net:27017/updateiq?ssl=true&replicaSet=atlas-13t95v-shard-0&authSource=admin&retryWrites=true&w=majority")
    
	const db = client.db();

    const collection = db.collection("courses");

    const course = await collection.findOne({slug: context.params.course});

	return {
		props: {
			course: {
				name: course.name,
				author: course.author,
				category: course.category,
				duration: course.duration,
				description: course.description,
				slug: course.slug,
				created_at: course.created_at,
				preview: course.preview,
				folders: course.folders,
			},
		},
	};
}

export async function getStaticPaths() {

	const client = await MongoClient.connect("mongodb://Kachanov2508:Pasword2508@updateiq-shard-00-00.ljmla.mongodb.net:27017,updateiq-shard-00-01.ljmla.mongodb.net:27017,updateiq-shard-00-02.ljmla.mongodb.net:27017/updateiq?ssl=true&replicaSet=atlas-13t95v-shard-0&authSource=admin&retryWrites=true&w=majority")
    
	const db = client.db();

    const collection = db.collection("courses");

    const courses = await collection.find().toArray();


	let paths = [];
	courses.map(course => {
		paths.push({ params: { courses: course.category, course: course.slug } })
	})

	return {
		paths: paths,
		fallback: false
	}
}