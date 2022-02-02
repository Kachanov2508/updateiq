import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import classes from "./Lesson.module.scss";
import Icon from "../../../../UI/Icon/Icon";
import { useRouter } from "next/router";
import Link from 'next/link';

const Lesson = (props) => {
	const router = useRouter();

	const activeClass = props.slugFile === router.query.lesson ? `${classes.lesson} ${classes.active}` : `${classes.lesson}`;

	return (
		<>
			<Link href={`/${props.courseCategory}/${props.courseSlug}/${props.slugFile}`} passHref>
				<div className={activeClass}>
					<Icon icon={faAngleRight} text={props.name} />
				</div>
			</Link>
		</>
	);
};

export default Lesson;