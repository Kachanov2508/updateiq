import { useState } from "react";
import { faFolder, faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import Lesson from "./Lesson/Lesson";
import classes from "./Chapter.module.scss";
import Icon from "../../../UI/Icon/Icon";

const Chapter = (props) => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<div onClick={() => setOpen(!open)} className={classes.chapter}>
				<Icon icon={open ? faFolderOpen : faFolder} text={props.folderName} />
			</div>
			{open &&
				props.video.map((item) => (
					<Lesson
						name={item.fileName}
						slugFile={item.slug}
						key={item.fileName}
						courseSlug={props.courseSlug}
						courseCategory={props.courseCategory}
					/>
				))}
		</>
	);
};

export default Chapter;
