import CoursePreview from "./CoursePreview/CoursePreview";
import classes from "./CourseList.module.scss";

const CourseList = (props) => {
	return (
		<div className={classes.courseList}>
			{props.courses.map((course) => (
				<CoursePreview key={course._id} name={course.name} />
			))}
		</div>
	);
};

export default CourseList;
