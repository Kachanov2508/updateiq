import classes from "./CourseDescription.module.scss";

const CourseDescription = (props) => {
	return (
		<div className={classes.CourseDescription}>
			<h2 className={classes.heading}>Описание</h2>
			<div className={classes.description} dangerouslySetInnerHTML={{ __html: props.description }} />
		</div>
	);
};

export default CourseDescription;
