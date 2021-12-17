import { useContext } from "react";
import classes from "./Course.module.scss";
import SpeechSynthesis from "./SpeechSinthesis/SpeechSinthesis";
import Content from "./Content/Content";
import Folders from "./Folders/Folders";
import CourseContext from "../../context/CourseProvider";

const Course = (props) => {
	// const { course, video, subtitle } = useContext(CourseContext);

	return (
		<div className={classes.course}>
			<h1 className={classes.heading}>{props.course.name}</h1>
			<div className={classes.video}>
				<SpeechSynthesis videoUrl={props.video} subtitleUrl={props.subtitle} />
			</div>
			<div className={classes.content}>
				<Content author={props.course.author} duration={props.course.duration} description={props.course.description} />
			</div>
			<div className={classes.folders}>
				<Folders folders={props.course.folders} videoUrl={props.video} courseSlug={props.course.slug} />
			</div>
		</div>
	);
};

export default Course;
