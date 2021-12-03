import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import Icon from "../../../UI/Icon/Icon";

const ToggleSubtitle = (props) => {
	const clickHandler = () => {
		props.setShowSubtitle(!props.showSubtitle);
	};

	return (
		<div onClick={clickHandler}>
			{props.showSubtitle ? (
				<Icon icon={faEye} text="Субтитры" />
			) : (
				<Icon icon={faEyeSlash} text="Субтитры" />
			)}
		</div>
	);
};

export default ToggleSubtitle;
