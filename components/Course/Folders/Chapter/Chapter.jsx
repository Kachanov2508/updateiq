import { useState } from "react";
import { faFolder, faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import Lesson from "./Lesson/Lesson";
import classes from "./Chapter.module.scss";
import Icon from "../../../UI/Icon/Icon";

const Chapter = (props) => {
	const [open, setOpen] = useState(false);

	const video = props.files.filter((item) => item.fileName.includes(".mp4"));
	const subtitle = props.files.filter((item) => item.fileName.includes(".vtt"));

	const getSubtitle = (video, subtitle) => {
		return subtitle.find((sub) => video.replace(".mp4") === sub.fileName.replace(".vtt"));
	};

	return (
		<>
			<div onClick={() => setOpen(!open)} className={classes.chapter}>
				<Icon icon={open ? faFolderOpen : faFolder} text={props.folderName} />
			</div>
			{open &&
				video.map((item) => (
					<Lesson
						name={item.fileName.replace(/ '.mp4', '.vtt' /, "")}
						fileUrl={item.fileUrl}
						slugFile={item.slug}
						courseSlug={props.courseSlug}
						videoUrl={props.videoUrl}
						subtitle={getSubtitle(item.fileName, subtitle)}
						key={item.fileName}
					/>
				))}
		</>
	);
};

export default Chapter;
