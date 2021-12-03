import { useEffect, useState } from "react";
import Buttons from "./Buttons/Buttons";
import classes from "./Control.module.scss";
import Progress from "./Progress/Progress";

const Control = (props) => {

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
        props.updateTimeProgess((e.currentTarget.value * props.duration) / 100);
        console.log("rewindVideo");
	};


	return (
        <>
        	<div className={classes.controls}>
			    <input type="range" value={props.progress || 0} className={classes.progress} onChange={rewindVideo} />
                <div>
                    <span>{`${getHours(props.currentTime)}${getMinutes(props.currentTime)}:${getSeconds(props.currentTime)}`}</span>
                    <span> / </span>
                    <span>{`${getHours(props.duration)}${getMinutes(props.duration)}:${getSeconds(props.duration)}`}</span>
                </div>
            </div>
            <Buttons />
        </>
	);
};

export default Control;
