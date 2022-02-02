import axios from "axios";
import CourseDescription from "../../../components/Course/CourseDescription/CourseDescription";
import CourseFolders from "../../../components/Course/CourseFolders/CourseFolders";
import classes from "../../../styles/CoursePage.module.scss";
import CoursePreview from "../../../components/CourseList/CoursePreview/CoursePreview";

const CoursePage = ({ course }) => {

	return (
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
	);
};

export default CoursePage;

export async function getServerSideProps(context) {
	const res = await axios.get(`${process.env.domain}/api/${context.params.courses}/${context.params.course}`);
	const course = await res.data;

	return {
		props: {
			course: course.data,
		},
	};
}
