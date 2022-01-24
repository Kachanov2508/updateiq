import Image from "next/image";
import classes from "./CoursePreview.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faUser, faGlobe, faDownload } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

const CoursePreview = (props) => {

	const router = useRouter();

	function clickHandler() {
		router.push(`${props.category}/${props.slug}`)
	}

	return (
	<div className={classes.container}>
		<div className={classes.photo}>
			<img src="https://bs-uploads.toptal.io/blackfish-uploads/components/seo/content/og_image_file/og_image/777655/react-context-api-4929b3703a1a7082d99b53eb1bbfc31f.png" alt="img" />
		</div>
		<div className={classes.info}>
			<div className={classes.heading}>
				<h2>{props.name}</h2>
			</div>
			<div className={classes.description}>
				{props.description}
			</div>
			<div className={classes.details}>
				<div className={classes.icons}>
					<div>
						<FontAwesomeIcon icon={faClock} />
						<span>{`${props.duration} ч.`}</span>
					</div>
					<div>
						<FontAwesomeIcon icon={faUser} />
						<span>{props.author}</span>
					</div>
					<div>
						<FontAwesomeIcon icon={faGlobe} />
						<span>Eng / Rus</span>
					</div>
					<div>
						<FontAwesomeIcon icon={faDownload} />
						<span>11.01.2022</span>
					</div>
				</div>
				<div className={classes.button}>
					<button onClick={clickHandler}>Подробнее</button>
				</div>
			</div>
		</div>
	</div>
	);
};

export default CoursePreview;
