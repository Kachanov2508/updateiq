import Chapter from "./Chapter/Chapter";
import classes from "./Folders.module.scss";

const Folders = (props) => {

	return (
		<div className={classes.folders}>
			{props.folders.map((item) => (
				<Chapter
					folderName={item.folderName}
					files={item.files}
					key={item.folderName}
					videoUrl={props.videoUrl}
					courseSlug={props.courseSlug}
				/>
			))}
		</div>
	);
};

export default Folders;
