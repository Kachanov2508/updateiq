import { faVolumeUp, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import Icon from "../../../UI/Icon/Icon";

const ToggleSpeakVoice = (props) => {
	
	function toggleSpeakVoice() {
		window.speechSynthesis.cancel();
		props.setSpeakVoice(!props.speakVoice);
	}

	return (
		<div onClick={toggleSpeakVoice}>
			{props.speakVoice ? (
				<Icon icon={faVolumeMute} text="Русская озвучка" />
			) : (
				<Icon icon={faVolumeUp} text="Русская озвучка" />
			)}
		</div>
	);
};

export default ToggleSpeakVoice;
