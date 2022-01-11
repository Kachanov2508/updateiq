import Image from "next/image";
import classes from "./CoursePreview.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faUser, faGlobe, faDownload } from "@fortawesome/free-solid-svg-icons";

const CoursePreview = (props) => {
	return (
		<section className={classes.coursePreview}>
			<div className={classes.container}>
				<div className={classes.left}>
					<img src="https://miro.medium.com/max/1200/1*pHsEux2h8wc3-yNCQNwz0A.jpeg" alt="img" />
				</div>
				<div className={classes.right}>
					<h2>{props.name}</h2>
					<p>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed officia minima aut est quibusdam quasi laborum dolorem,
						assumenda sint laudantium at voluptate voluptatibus illum sunt iste rem dolores commodi ullam. Lorem ipsum dolor sit amet
						consectetur, adipisicing elit. Sed officia minima aut est quibusdam quasi laborum dolorem, assumenda sint laudantium at
						voluptate voluptatibus illum sunt iste rem dolores commodi ullam.
					</p>
					<div className={classes.bottom}>
						<div className={classes.info}>
                            <div className={classes.time}>
                                <FontAwesomeIcon icon={faClock} />
                                <span>25 ч.</span>
                            </div>
                            <div className={classes.author}>
                                <FontAwesomeIcon icon={faUser} />
                                <span>John Doe</span>
                            </div>
                            <div className={classes.lang}>
                                <FontAwesomeIcon icon={faGlobe} />
                                <span>Eng / Rus</span>
                            </div>
                            <div className={classes.lang}>
                                <FontAwesomeIcon icon={faDownload} />
                                <span>11.01.2022</span>
                            </div>
                        </div>
                        <button>Подробнее</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CoursePreview;
