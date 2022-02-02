import { useEffect, useState } from "react";
import { faFolder, faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import Lesson from "./Lesson/Lesson";
import classes from "./Folder.module.scss";
import Icon from "../../../UI/Icon/Icon";
import { useRouter } from "next/router";


const Folder = (props) => {
	const [open, setOpen] = useState(false);
	const router = useRouter()

	// Открытая папка после перезагрузки страницы
	useEffect(() => {
		const currentVideo = props.video.find(item => item.slug === router.query.lesson)
		if(currentVideo) setOpen(true);
	}, []);

	return (
		<>
			<div onClick={() => setOpen(!open)} className={classes.folder}>
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

export default Folder;
