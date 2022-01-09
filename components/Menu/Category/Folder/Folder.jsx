import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import classes from "./Folder.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";

const Folder = (props) => {
	const [openFolder, setOpenFolder] = useState(false);
	const router = useRouter();

	const showFolder = router.query.course === props.courseSlug ? `${classes.folder} ${classes.active}` : `${classes.folder}`;

	return (
		<Link href={`/courses/${props.courseSlug}/${props.fileSlug}`} passHref>
			<div className={showFolder}>
				<FontAwesomeIcon icon={openFolder ? faFolderOpen : faFolder} size="lg" color="#ffb737" />
				<h3>{props.name}</h3>
			</div>
		</Link>
	);
};

export default Folder;
