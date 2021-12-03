import { useEffect, useMemo, useState } from "react";
import classes from "./Course.module.scss";
import SpeechSynthesis from "./SpeechSinthesis/SpeechSinthesis";
import Content from "./Content/Content";
import Folders from "./Folders/Folders";
import axios from "axios";

const Course = () => {
	const [course, setCourse] = useState([]);
	const [folders, setFolders] = useState([]);
	const [videoUrl, setVideoUrl] = useState();
	const [subtitleUrl, setSubtitleUrl] = useState();

	const getCourse = async () => {
		const respons = await axios.get(`/api${window.location.pathname}`);
		const data = await respons.data;

		setCourse(data.course);
		setFolders(data.course.folders);
	};

	useMemo(() => {
		folders.sort(function (a, b) {
			if (a.folderName.toLowerCase() < b.folderName.toLowerCase()) return -1;
			if (a.folderName.toLowerCase() > b.folderName.toLowerCase()) return 1;
			return 0;
		});
	}, [folders]);

	useEffect(() => {
		getCourse();
	}, []);

	console.log("Course Component Render");

	return (
		<div className={classes.course}>
			<h1 className={classes.heading}>{course.name}</h1>
			<div className={classes.video}>
				<SpeechSynthesis videoUrl={videoUrl} subtitleUrl={subtitleUrl} />
			</div>
			<div className={classes.content}>
				<Content author={course.author} duration={course.duration} description={course.description} />
			</div>
			<div className={classes.folders}>
				<Folders
					folders={folders}
					setVideoUrl={setVideoUrl}
					setSubtitleUrl={setSubtitleUrl}
					videoUrl={videoUrl}
				/>
			</div>
		</div>
	);
};

export default Course;
