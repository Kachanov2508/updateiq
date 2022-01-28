import Image from "next/image";
import classes from "./CoursePreview.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faUserGraduate, faGlobe, faDownload } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

const CoursePreview = (props) => {

	const router = useRouter();

	function clickHandler() {
		router.push(`${props.category}/${props.slug}/${props.videoSlug}`)
	}

	return (
	<div className={classes.container}>
		<div className={classes.photo}>
			<Image src={`/uploads/${props.category}/${props.previewImage}`} alt={props.name} width="325" height="200" />
		</div>
		<div className={classes.info}>
			<div className={classes.heading}>
				<h2>{props.name}</h2>
			</div>
			<div className={classes.description} dangerouslySetInnerHTML={{ __html: props.description }} />
			<div className={classes.details}>
				<div className={classes.icons}>
					<div>
						<FontAwesomeIcon icon={faClock} />
						<span>{`${props.duration} ч.`}</span>
					</div>
					<div>
						<FontAwesomeIcon icon={faUserGraduate} />
						<span>{props.author}</span>
					</div>
					<div>
						<FontAwesomeIcon icon={faGlobe} />
						<span>Eng / Rus</span>
					</div>
					<div>
						<FontAwesomeIcon icon={faDownload} />
						<span>{props.created_at}</span>
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
