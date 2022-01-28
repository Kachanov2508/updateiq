import classes from "./Content.module.scss";
import { faUserGraduate, faClock, faGlobe, faDownload } from "@fortawesome/free-solid-svg-icons";
import Icon from "../../UI/Icon/Icon";

const Info = (props) => {
	return (
		<div className={classes.content}>
			<div className={classes.icons}>
				<Icon icon={faClock} text={`${props.duration} ч.`} />
				<Icon icon={faUserGraduate} text={props.author} />
				<Icon icon={faGlobe} text="Eng / Rus" />
				<Icon icon={faDownload} text={props.createdAt} />
			</div>
			<h3>Описание</h3>
			<div className={classes.description} dangerouslySetInnerHTML={{ __html: props.description }} />
		</div>
	);
};

export default Info;
