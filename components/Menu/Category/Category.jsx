import classes from "./Category.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";

const Category = (props) => {

	const router = useRouter();

	function toggleActivClass(path, link) {
		return path == link.replace("/", "") ? `${classes.activ}` : "";
	}

	return (
		<Link href={props.link || "/"} passHref>
			<div className={`${classes.category} ${toggleActivClass(router.query.courses, props.link)}`}>
				<FontAwesomeIcon icon={props.icon} size={props.size} color={props.color} />
				<h2>{props.name}</h2>
			</div>
		</Link>
	);
};

export default Category;
