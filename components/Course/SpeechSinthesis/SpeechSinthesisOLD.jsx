import React, { useEffect } from "react";
import { useRef, useState } from "react";

import classes from './SpeechSinthesis.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'


const SpeechSinthesis = (props) => {
	const video = useRef();
	const input = useRef();
	const [progress, setProgress] = useState(0);
	const [videoUrl, setVideoUrl] = useState(null);
	const [voices, setVoices] = useState([]);
	const [icon, setIcon] = useState(false);
	const utterance = new window.SpeechSynthesisUtterance();
	utterance.rate = 7;
	utterance.voice = getVoice("Microsoft Irina - Russian (Russia)");

	speechSynthesis.onvoiceschanged = () => setVoices(speechSynthesis.getVoices());

	function getVoice(selectedVoice) {
		const voice = voices.find((voice) => voice.name === selectedVoice);
		return voice !== undefined ? voice : voices[0];
	}

	async function getActiveCues() {
		while (!video.current.paused) {
			if (video.current.textTracks[0].activeCues[0] === undefined) {
				await new Promise((resolve) => setTimeout(resolve, 100));
			} else if (utterance.text !== video.current.textTracks[0].activeCues[0].text && !speechSynthesis.speaking) {
				speak(video.current.textTracks[0].activeCues[0].text);
			} else {
				await new Promise((resolve) => setTimeout(resolve, 100));
			}
		}
	}

	function speak(text) {
		utterance.text = text;
		window.speechSynthesis.speak(utterance)
	}

	function updateProgress() {
		setProgress((video.current.currentTime / video.current.duration) * 100)
	}

	function setVideoProgress() {
		window.speechSynthesis.cancel();
		video.current.currentTime = (input.current.value * video.current.duration) / 100;
	}

	function rewindVideo(event) {
		if(event.code === 'ArrowRight') video.current.currentTime += 5
		if(event.code === 'ArrowLeft') 	video.current.currentTime -= 5
	}

	function play() {
		video.current.volume = 0.3
		window.speechSynthesis.cancel();
		if (video.current.paused) {
			video.current.play();
			getActiveCues();
			setIcon(true)
		} else {
			video.current.pause();
			setIcon(false)
		}
	}
	// console.log(props.subtitleUrl);

	return (
		<div className={classes.wrapper}>
			<video src={props.videoUrl} className={classes.video} ref={video} onTimeUpdate={updateProgress} >
				{/* <source src={props.videoUrl} type="video/mp4" /> */}
				<track label="Russian" kind="subtitles" srcLang="ru" src={props.subtitleUrl.fileUrl} default />
			</video>
			<div className={classes.control}>
				<div onClick={play}>
					{icon ? <FontAwesomeIcon icon={faPlay} /> : <FontAwesomeIcon icon={faPause} />}
				</div>
				<div>
					<input type="range" min="0" max="100" step="0.1" value={progress} onChange={setVideoProgress} onKeyUp={(event) => rewindVideo(event)} ref={input} />
				</div>
			</div>
		</div>
	);
}

export default SpeechSinthesis;
