import Link from "next/link";
import { useRouter } from "next/router";
import classes from "./Heading.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrain, faLevelUpAlt } from "@fortawesome/free-solid-svg-icons";

const Heading = () => {
	const router = useRouter();

	function toggleActivClass(path, link) {
		return path == link ? `${classes.activ}` : "";
	}

	return (
		<div className={`${classes.heading} ${toggleActivClass(router.pathname, "/")}`}>
			<div className={classes.icon}>
				<FontAwesomeIcon icon={faBrain} size="lg" color="#2196F3" />
				<FontAwesomeIcon icon={faLevelUpAlt} size="lg" color="#FFC107" />
			</div>
			<Link href="/" passHref>
				<h1><span>update</span><span>IQ</span></h1>
			</Link>
		</div>
	);
};

export default Heading;
