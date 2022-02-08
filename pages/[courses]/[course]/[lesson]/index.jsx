import axios from "axios";
import classes from "../../../../styles/LessonPage.module.scss";
import SpeechSynthesis from "../../../../components/Course/SpeechSinthesis/SpeechSinthesis";
import CourseFolders from "../../../../components/Course/CourseFolders/CourseFolders";
import BreadCrumbs from "../../../../components/BreadCrumbs/BreadCrumbs";

export default function LessonPage({ course }) {
	return (
		<div className={classes.container}>
			<div className={classes.video}>
				<div className={classes.breadCrumbs}>
					<BreadCrumbs />
				</div>
				<SpeechSynthesis videoUrl={course.video.fileUrl} subtitleUrl={course.video.subtitle.fileUrl} courseCategory={course.category} />
			</div>
			<div className={classes.folders}>
				<CourseFolders folders={course.folders} courseSlug={course.slug} courseCategory={course.category} />
			</div>
		</div>
	);
}

export async function getStaticProps(context) {
	const response = await axios.get(`${process.env.domain}/api/${context.params.courses}/${context.params.course}/${context.params.lesson}`);
	const course = await response.data;

	return {
		props: {
			course: course,
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
