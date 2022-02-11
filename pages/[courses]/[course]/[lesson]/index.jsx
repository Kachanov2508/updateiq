import axios from "axios";
import classes from "../../../../styles/LessonPage.module.scss";
import SpeechSynthesis from "../../../../components/Course/SpeechSinthesis/SpeechSinthesis";
import CourseFolders from "../../../../components/Course/CourseFolders/CourseFolders";
import BreadCrumbs from "../../../../components/BreadCrumbs/BreadCrumbs";
import Head from "next/head";

export default function LessonPage({ course, video }) {

	console.log(course)
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
						videoUrl={video.fileUrl} 
						subtitleUrl={video.subtitle.fileUrl} 
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
	const response = await axios.get(`${process.env.domain}/api/${context.params.courses}/${context.params.course}/${context.params.lesson}`);
	const data = await response.data;

	return {
		props: {
			course: data.course,
			video: data.video
		},
	};
}

export async function getStaticPaths() {
	const response = await axios.get(`${process.env.domain}/api/all-courses`);
	const courses = await response.data;

	let paths = [];
	courses.data.map((course) => {
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
