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
				<FontAwesomeIcon icon={faBrain} size="lg" color="#d5d5d5" />
				<FontAwesomeIcon icon={faLevelUpAlt} size="lg" color="#d5d5d5" />
			</div>
			<Link href="/" passHref>
				<h1>updateIQ</h1>
			</Link>
		</div>
	);
};

export default Heading;
