import classes from "./Content.module.scss";
import { faUserGraduate, faClock } from "@fortawesome/free-solid-svg-icons";
import Icon from "../../UI/Icon/Icon";

const Info = (props) => {
	return (
		<div className={classes.content}>
			{props.author && (
				<Icon icon={faUserGraduate} text={`Автор: ${props.author}`} />
			)}
			{props.duration && (
				<Icon icon={faClock} text={`Продолжительность: ${props.duration} ч`} />
			)}
			<div dangerouslySetInnerHTML={{ __html: props.description }} />
		</div>
	);
};

export default Info;
