import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import classes from "./Lesson.module.scss";
import Icon from "../../../../UI/Icon/Icon";
import { useContext } from "react";
import CourseContext from "../../../../../context/CourseProvider";

const Lesson = (props) => {
	const {setVideo, setSubtitle} = useContext(CourseContext)

	const clickHandler = () => {
		setVideo(props.fileUrl)
		setSubtitle(props.subtitle.fileUrl)
	};

	const activeClass = props.videoUrl === props.fileUrl ? `${classes.lesson} ${classes.active}` : `${classes.lesson}`;

	return (
		<div onClick={clickHandler} className={activeClass}>
			<Icon icon={faAngleRight} text={props.name} />
		</div>
	);
};

export default Lesson;
