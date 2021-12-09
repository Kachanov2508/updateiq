import { useContext } from "react";
import classes from "./Course.module.scss";
import SpeechSynthesis from "./SpeechSinthesis/SpeechSinthesis";
import Content from "./Content/Content";
import Folders from "./Folders/Folders";
import CourseContext from "../../context/CourseProvider";

const Course = () => {
	const { course, video, subtitle } = useContext(CourseContext);

	return (
		<div className={classes.course}>
			<h1 className={classes.heading}>{course.name}</h1>
			<div className={classes.video}>
				<SpeechSynthesis videoUrl={video} subtitleUrl={subtitle} />
			</div>
			<div className={classes.content}>
				<Content author={course.author} duration={course.duration} description={course.description} />
			</div>
			<div className={classes.folders}>
				<Folders folders={course.folders} videoUrl={video} />
			</div>
		</div>
	);
};

export default Course;
