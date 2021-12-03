import classes from "./UploadFiles.module.scss";

const UploadFiles = () => {
	return (
		<div className={classes.input_file}>
			<input type="file" id="input-file" multiple="" directory="" webkitdirectory="" mozdirectory="" />
			<label htmlFor="input-file">
				<span>Загрузить файлы</span>
			</label>
		</div>
	);
};

export default UploadFiles;
