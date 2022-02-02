import Folder from "./Folder/Folder";
import classes from "./CourseFolders.module.scss";

const CourseFolders = (props) => {
	return (
		<>
			<div className={classes.CourseFolders}>
				<h3 className={classes.heading}>Содержание курса</h3>
				{props.folders.map((item) => (
					<Folder folderName={item.folderName} video={item.video} key={item.folderName} courseSlug={props.courseSlug} courseCategory={props.courseCategory} />
				))}
			</div>
		</>
	);
};

export default CourseFolders;
