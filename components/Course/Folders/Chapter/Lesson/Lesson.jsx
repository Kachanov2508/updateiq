import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import classes from "./Lesson.module.scss";
import Icon from "../../../../UI/Icon/Icon";

const Lesson = (props) => {

	const clickHandler = () => {
		props.setSubtitleUrl(props.subtitle.fileUrl);
		props.setVideoUrl(props.fileUrl);
	};

	const activeClass = props.videoUrl === props.fileUrl ? `${classes.lesson} ${classes.active}` : `${classes.lesson}`;

	return (
		<div onClick={clickHandler} className={activeClass}>
			<Icon icon={faAngleRight} text={props.name} />
		</div>
	);
};

export default Lesson;
