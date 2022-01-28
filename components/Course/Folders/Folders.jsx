import Chapter from "./Chapter/Chapter";
import classes from "./Folders.module.scss";

const Folders = (props) => {

	return (
		<div className={classes.folders}>
			{props.folders.map((item) => (
				<Chapter
					folderName={item.folderName}
					video={item.video}
					key={item.folderName}
					courseSlug={props.courseSlug}
					courseCategory={props.courseCategory}
				/>
			))}
		</div>
	);
};

export default Folders;
