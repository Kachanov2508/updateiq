import CoursePreview from "./CoursePreview/CoursePreview";
import classes from "./CourseList.module.scss";

const CourseList = (props) => {
	return (
		<div className={classes.courseList}>
			{props.courses.map((course) => (
				<CoursePreview
					key={course._id}
					name={course.name}
					author={course.author}
					category={course.category}
					duration={course.duration}
					description={course.description}
					slug={course.slug}
					created_at={course.created_at}
					previewImage={course.preview.image.fileUrl}
					textPreview={course.preview.text}
					link={`/${course.category}/${course.slug}`}
					textBtn="Подробнее"
				/>
			))}
		</div>
	);
};

export default CourseList;
