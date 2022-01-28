import classes from "./Course.module.scss";
import SpeechSynthesis from "./SpeechSinthesis/SpeechSinthesis";
import Content from "./Content/Content";
import Folders from "./Folders/Folders";

const Course = (props) => {

	return (
		<div className={classes.course}>
			<h1 className={classes.heading}>{props.course.name}</h1>
			<div className={classes.video}>
				<SpeechSynthesis videoUrl={props.course.video.fileUrl} subtitleUrl={props.course.video.subtitle.fileUrl} courseCategory={props.course.category} />
			</div>
			<div className={classes.folders}>
				<Folders folders={props.course.folders} courseSlug={props.course.slug} courseCategory={props.course.category} />
			</div>
			<div className={classes.content}>
				<Content author={props.course.author} duration={props.course.duration} description={props.course.description} createdAt={props.course.created_at} />
			</div>
		</div>
	);
};

export default Course;
