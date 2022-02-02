import axios from "axios";
import classes from "../../../../styles/LessonPage.module.scss";
import SpeechSynthesis from "../../../../components/Course/SpeechSinthesis/SpeechSinthesis";
import CourseFolders from "../../../../components/Course/CourseFolders/CourseFolders";
import { useRouter } from "next/router";
import BreadCrumbs from "../../../../components/BreadCrumbs/BreadCrumbs";

const LessonPage = ({ course }) => {

	const router = useRouter();

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
};

export default LessonPage;

export async function getServerSideProps(context) {
	const response = await axios.get(`${process.env.domain}/api/${context.params.courses}/${context.params.course}/${context.params.lesson}`);
	const course = await response.data;

	return {
		props: {
			course: course,
		},
	};
}
