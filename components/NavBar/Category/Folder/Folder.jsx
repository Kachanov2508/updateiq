import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import classes from "./Folder.module.scss";
import { useContext } from "react";
import NavbarContext from '../../../../context/NavbarProvider'

const Folder = (props) => {
	const showFolder = window.location.pathname === `/courses/${props.slug}` ? `${classes.folder} ${classes.active}` : `${classes.folder}`;
	const hidenFolder = window.location.pathname === `/courses/${props.slug}` ? `${classes.hidenFolder} ${classes.active}` : `${classes.hidenFolder}`;

	const {openNavbar} = useContext(NavbarContext)


	return (
		<>
			{openNavbar ? (
				<Link href={`/courses/${props.slug}`}>
					<div className={showFolder}>
						<FontAwesomeIcon icon={faFolder} size="lg" color="#ffb737" />
						<h3>{props.name}</h3>
					</div>
				</Link>
			) : (
				<Link href={`/courses/${props.slug}`}>
					<div className={hidenFolder}>
						<FontAwesomeIcon icon={faFolder} size="lg" color="#ffb737" />
						<h3>{props.name}</h3>
					</div>
				</Link>
			)}
		</>
	);
};

export default Folder;
