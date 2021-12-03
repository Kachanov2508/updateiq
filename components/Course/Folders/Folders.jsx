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
                    setVideoUrl={props.setVideoUrl}
                    setSubtitleUrl={props.setSubtitleUrl}
					videoUrl={props.videoUrl}
				/>
			))}
		</div>
	);
};

export default Folders;
