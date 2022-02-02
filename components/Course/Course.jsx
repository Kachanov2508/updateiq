import classes from "./Course.module.scss";
import SpeechSynthesis from "./SpeechSinthesis/SpeechSinthesis";
import CourseDescription from "./CourseDescription/CourseDescription";
import CourseFolders from "./CourseFolders/CourseFolders";

const Course = (props) => {

	return (
		<div className={classes.course}>
			<h1 className={classes.heading}>{props.name}</h1>
			<div className={classes.video}>
				<SpeechSynthesis videoUrl={props.videoUrl} subtitleUrl={props.subtitleUrl} courseCategory={props.courseCategory} />
			</div>
			<div className={classes.folders}>
				<CourseFolders folders={props.folders} courseSlug={props.courseSlug} courseCategory={props.courseCategory} />
			</div>
			<div className={classes.content}>
				<CourseDescription author={props.author} duration={props.duration} description={props.description} createdAt={props.createdAt} />
			</div>
		</div>
	);
};

export default Course;
