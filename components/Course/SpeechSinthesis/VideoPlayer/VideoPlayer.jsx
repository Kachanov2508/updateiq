import { useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faAngleDoubleLeft, faAngleDoubleRight, faExpandArrowsAlt } from '@fortawesome/free-solid-svg-icons'
import classes from "./VideoPlayer.module.scss";
// import ToggleSpeakVoice from "../ToggleSpeakVoice/toggleSpeakVoice";
import ToggleSubtitle from "../ToggleSubtitle/ToggleSubtitle";

const VideoPlayer = (props) => {
	const videoRef = useRef()
	const [currentTime, setCurrentTime] = useState(0);
	const [progress, setProgress] = useState(0);
	const [duration, setDuration] = useState(0);
	const [togglePlay, setTogglePlay] = useState(false);

	function onCanPlay(e) {
		e.currentTarget.volume = 0.2
		setDuration(e.currentTarget.duration)
	}

	function onTimeUpdate(e) {
		setProgress((e.currentTarget.currentTime / duration) * 100);
		setCurrentTime(e.currentTarget.currentTime);

		try {
			props.setActiveCues(e.currentTarget.textTracks[0].activeCues[0].text);
		} catch (error) {}
	}

	// Progress
	function getHours(time) {
		let hours = Math.floor(time / 60 / 60);
		hours < 1 ? (hours = "") : (hours = `${hours}:`);
		return hours;
	}

	function getMinutes(time) {
		let minutes = Math.floor(time / 60) - Math.floor(time / 60 / 60) * 60;
		if (minutes < 10) minutes = `0${minutes}`;
		return minutes;
	}

	function getSeconds(time) {
		let seconds = Math.floor(time % 60);
		if (seconds < 10) seconds = `0${seconds}`;
		return seconds;
	}

    const rewindVideo = (e) => {
        videoRef.current.currentTime = (e.currentTarget.value * duration) / 100;
	};

	// Buttons
	function onPlay(e) {
		setTogglePlay(!togglePlay)
		if(videoRef.current.paused || videoRef.current.ended) videoRef.current.play();
		else videoRef.current.pause()
	}

	function arrowLeft() {
		videoRef.current.currentTime -= 5
	
	}
	
	function arrowRight() {
		videoRef.current.currentTime += 5
	}
	
	function onKeyUp(e) {
		if(e.code === 'ArrowRight') videoRef.current.currentTime += 5
		if(e.code === 'ArrowLeft') 	videoRef.current.currentTime -= 5
	}

	function onFullscreen() {
		videoRef.current.requestFullscreen()
	}

	return (
		<div className={classes.videoPlayer}>
			<video
				ref={videoRef}
				src={props.videoUrl}
				className={`${classes.video} ${props.showSubtitle ? classes.hideSubtitle : ""}`}
				onTimeUpdate={onTimeUpdate}
				onCanPlay={onCanPlay}
				onClick={onPlay}
			>
				<track label="Russian" kind="subtitles" srcLang="ru" src={props.subtitleUrl} default />
			</video>
			<div className={classes.controls}>
			    <input type="range" value={progress || 0} className={classes.progress} onChange={rewindVideo} onKeyUp={onKeyUp} />
                <div className={classes.wrapper}>
					<div className={classes.buttons}>
						<div className={classes.play} onClick={onPlay}>
							{togglePlay ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
						</div>
						<div className={classes.arrowLeft} onClick={arrowLeft}>
							<FontAwesomeIcon icon={faAngleDoubleLeft} />
						</div>
						<div className={classes.arrowRight} onClick={arrowRight}>
							<FontAwesomeIcon icon={faAngleDoubleRight} />
						</div>
						<div className={classes.fullscreen} onClick={onFullscreen}>
							<FontAwesomeIcon icon={faExpandArrowsAlt} />
						</div>
					</div>
					<div className={classes.time}>
						<span>{`${getHours(currentTime)}${getMinutes(currentTime)}:${getSeconds(currentTime)}`}</span>
						<span> / </span>
						<span>{`${getHours(duration)}${getMinutes(duration)}:${getSeconds(duration)}`}</span>
					</div>
					<div className={classes.toggle}>
						{/* <ToggleSpeakVoice speakVoice={props.speakVoice} setSpeakVoice={props.setSpeakVoice} /> */}
						<ToggleSubtitle showSubtitle={props.showSubtitle} setShowSubtitle={props.setShowSubtitle} />
					</div>
				</div>
            </div>
		</div>
	);
};

export default VideoPlayer;
