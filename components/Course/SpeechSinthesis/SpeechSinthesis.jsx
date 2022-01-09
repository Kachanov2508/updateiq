import React, { useState, useEffect } from "react";
import VideoPlayer from "./VideoPlayer/VideoPlayer";

const SpeechSinthesis = (props) => {
	const [voices, setVoices] = useState([]);
	const [utterance, setUtterance] = useState();
	const [activeCues, setActiveCues] = useState(null);
	const [speakVoice, setSpeakVoice] = useState(true);
	const [showSubtitle, setShowSubtitle] = useState(true);

	useEffect(() => {
		const utterance = new window.SpeechSynthesisUtterance();
		setUtterance(utterance);
		utterance.voice = getVoice("Microsoft Irina - Russian (Russia)");
		utterance.rate = 6;
		speechSynthesis.onvoiceschanged = () =>
			setVoices(speechSynthesis.getVoices());
	}, [speechSynthesis.getVoices()]);

	function getVoice(selectedVoice) {
		const voice = voices.find((voice) => voice.name === selectedVoice);
		return voice !== undefined ? voice : voices[0];
	}

	function speak(text) {
		window.speechSynthesis.cancel();
		utterance.text = text;
		window.speechSynthesis.speak(utterance);
	}

	if (speakVoice) {
		if (activeCues && utterance.text !== activeCues) {
			speak(activeCues);
		}
	}

	return (
		<VideoPlayer
				videoUrl={`/uploads/${props.videoUrl}`}
				subtitleUrl={`/uploads/${props.subtitleUrl}`}
				activeCues={activeCues}
				setActiveCues={setActiveCues}
				speakVoice={speakVoice}
				setSpeakVoice={setSpeakVoice}
				showSubtitle={showSubtitle}
				setShowSubtitle={setShowSubtitle}
			/>
	);
};

export default SpeechSinthesis;