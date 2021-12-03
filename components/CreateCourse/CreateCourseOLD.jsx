import { useRef, useState } from "react";
import app from "../../src";
import axios from "axios";
import slugify from 'slugify'

import "bootstrap/dist/css/bootstrap.css";

const createCourse = () => {
	const [files, setFiles] = useState([]);
	const [author, setAuthor] = useState("");
	const [category, setCategory] = useState("");
	const [hours, setHours] = useState("");
	const [min, setMin] = useState("");
	const [description, setDescription] = useState("");
	const [load, setLoad] = useState(false);

	const fileRef = useRef();

	const submitHandler = async (e) => {
		e.preventDefault();

		setLoad(true);

		let course = {
			name: "",
			slug: "",
			author: author,
			category: category,
			duration: hours,
			description: description,
			folders: {},
		};

		// Storage reference || Ссылка на хранилище
		const storageRef = app.storage().ref();

		for (let f in files) {
			const path = files[f].webkitRelativePath;
			const splitPath = path.split("/");
			const courseName = splitPath[0];
			const folder = splitPath[1];
			const fileName = splitPath[splitPath.length - 1];

			// Отправить файлы в firebase storage
			// Создать путь к файлу
			const filePath = storageRef.child(`${category}/${path}`);
			// Добавить файл по указанному пути
			await filePath.put(files[f]);
			// Ссылка на файл
			const fileUrl = await filePath.getDownloadURL();

			course.name = courseName;
			course.slug = slugify(courseName, {remove: /[*+~.()'"!:@]/g})
			if (!course.folders[folder]) course.folders[folder] = [];
			course.folders[folder].push({ fileName, fileUrl });
		}
		await axios.post("http://localhost:5070/admin/upload", course);

		setAuthor("");
		setHours("");
		setMin("");
		setDescription("");
		setLoad(false);
		fileRef.current.value = null;
	};

	return (
		<div className="container">
			<form onSubmit={submitHandler}>
				<input onChange={(e) => setFiles(Array.from(e.target.files))} ref={fileRef} className="form-control mb-3" id="input_file" type="file" multiple="" directory="" webkitdirectory="" mozdirectory="" />
				<div className="row">
					<div className="col-md-4">
						<input onChange={(e) => setAuthor(e.target.value)} className="form-control mb-3" type="text" value={author} placeholder="Автор курса" />
					</div>
					<div className="col-md-4">
						<select className="form-select" value={category} onChange={(e) => {setCategory(e.target.value)}}>
							<option value="React">React</option>
							<option value="Vue">Vue</option>
							<option value="Angular">Angular</option>
						</select>
					</div>
					<div className="col-md-4">
						<input onChange={(e) => setHours(e.target.value)} className="form-control mb-3" type="text" value={hours} placeholder="Кол-во часов" />
					</div>
				</div>
				<textarea onChange={(e) => setDescription(e.target.value)} className="form-control mb-3" value={description} placeholder="Описание" />
				<div className="d-grid gap-2">
					<button className="btn btn-primary" type="submit" disabled={load}>
						{load ? "Загрузка..." : "Загрузить"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default createCourse;
