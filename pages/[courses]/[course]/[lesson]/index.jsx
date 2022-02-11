import axios from "axios";
import classes from "../../../../styles/LessonPage.module.scss";
import SpeechSynthesis from "../../../../components/Course/SpeechSinthesis/SpeechSinthesis";
import CourseFolders from "../../../../components/Course/CourseFolders/CourseFolders";
import BreadCrumbs from "../../../../components/BreadCrumbs/BreadCrumbs";
import Head from "next/head";
import { MongoClient } from "mongodb";

export default function LessonPage({ course }) {

	return (
		<>
			<Head>
				<title>{course.name}</title>
				<meta name="robots" content="noindex" />
			</Head>
			<div className={classes.container}>
				<div className={classes.video}>
					<div className={classes.breadCrumbs}>
						<BreadCrumbs />
					</div>
					<SpeechSynthesis 
						videoUrl={course.video.fileUrl} 
						subtitleUrl={course.video.subtitle.fileUrl} 
						courseCategory={course.category} 
					/>
				</div>
				<div className={classes.folders}>
					<CourseFolders 
						folders={course.folders} 
						courseSlug={course.slug} 
						courseCategory={course.category} 
					/>
				</div>
			</div>
		</>
	);
}

export async function getStaticProps(context) {

    const client = await MongoClient.connect("mongodb://Kachanov2508:Pasword2508@updateiq-shard-00-00.ljmla.mongodb.net:27017,updateiq-shard-00-01.ljmla.mongodb.net:27017,updateiq-shard-00-02.ljmla.mongodb.net:27017/updateiq?ssl=true&replicaSet=atlas-13t95v-shard-0&authSource=admin&retryWrites=true&w=majority")
    const db = client.db();

    const collection = db.collection("courses");

    const course = await collection.findOne({slug: context.params.course});

    let video;
    course.folders.map(folder => {
        let search = folder.video.find(video => video.slug === context.params.lesson);
        if(search) {
            video = search
            return;
        }
    })

	return {
		props: {
			course: {
				name: course.name,
				category: course.category,
				folders: course.folders,
				slug: course.slug,
				video: video
			}
		},
	};
}

export async function getStaticPaths() {
	
	const client = await MongoClient.connect("mongodb://Kachanov2508:Pasword2508@updateiq-shard-00-00.ljmla.mongodb.net:27017,updateiq-shard-00-01.ljmla.mongodb.net:27017,updateiq-shard-00-02.ljmla.mongodb.net:27017/updateiq?ssl=true&replicaSet=atlas-13t95v-shard-0&authSource=admin&retryWrites=true&w=majority")
    
	const db = client.db();

    const collection = db.collection("courses");

    const courses = await collection.find().toArray();

	let paths = [];
	courses.map((course) => {
		course.folders.map((folder) => {
			folder.video.map((video) => {
				paths.push({ params: { courses: course.category, course: course.slug, lesson: video.slug } });
			});
		});
	});

	return {
		paths: paths,
		fallback: false,
	};
}
