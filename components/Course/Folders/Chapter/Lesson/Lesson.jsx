import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import classes from "./Lesson.module.scss";
import Icon from "../../../../UI/Icon/Icon";
import { useContext, useEffect } from "react";
// import CourseContext from "../../../../../context/CourseProvider";
// import { useRouter } from "next/router";
import Link from 'next/link';

const Lesson = (props) => {
	// const {setVideo, setSubtitle} = useContext(CourseContext);
	// const router = useRouter();

	// const clickHandler = () => {
	// 	setVideo(props.fileUrl)
	// 	setSubtitle(props.subtitle.fileUrl)
	// };

	const activeClass = props.videoUrl === props.fileUrl ? `${classes.lesson} ${classes.active}` : `${classes.lesson}`;

	return (
		<>
			<Link href={`/courses/${props.courseSlug}/${props.slugFile}`} passHref>
				<div className={activeClass}>
					<Icon icon={faAngleRight} text={props.name} />
				</div>
			</Link>
		</>
	);
};

export default Lesson;