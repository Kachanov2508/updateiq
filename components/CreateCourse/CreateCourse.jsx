import { useRef, useState } from "react";
import axios from "axios";
import slugify from "slugify";

import "bootstrap/dist/css/bootstrap.css";

const createCourse = () => {
	const [files, setFiles] = useState([]);
	const [author, setAuthor] = useState("");
	const [category, setCategory] = useState("react");
	const [hours, setHours] = useState("");
	const [description, setDescription] = useState("");
	const [load, setLoad] = useState(false);

	const fileRef = useRef();

	const submitHandler = async (e) => {
		e.preventDefault();

		setLoad(true);

		let course = {
			name: files[0].webkitRelativePath.split("/")[0],
			slug: slugify(files[0].webkitRelativePath.split("/")[0].toLowerCase(), { remove: /[*+~.()'"!:@]/g }),
			author: author,
			category: category,
			duration: hours,
			description: description,
			folders: [],
		};

		for (let f in files) {
			const path = files[f].webkitRelativePath.split("/");
			const folderName = path[1];
			const fileName = path[path.length - 1];

			path.pop();
			let dirPath = path.join("/");

			const formData = new FormData();
			formData.append("file", files[f]);

			const responce = await axios.post("/api/admin/upload", formData, {
				headers: {
					"content-type": "multipart/form-data",
					dirPath: dirPath,
					// onUploadProgress: (event) => {
					// 	console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
					// },
				},
			});

			const fileUrl = files[f].webkitRelativePath;

			const serchFolder = course.folders.find((item) => item.folderName === folderName);

			if (!serchFolder) {
				course.folders.push({ folderName, files: [{ fileName, fileUrl }] });
			} else {
				serchFolder.files.push({ fileName, fileUrl });
			}
		}
		await axios.post("/api/admin/upload/send-data-to-db", course);

		setAuthor("");
		setHours("");
		setDescription("");
		setLoad(false);
		fileRef.current.value = null;
	};

	return (
		<div className="container">
			<form onSubmit={submitHandler}>
				<input onChange={(e) => setFiles(Array.from(e.target.files))} ref={fileRef} className="form-control mb-3" type="file" directory="" webkitdirectory="" mozdirectory="" />
				<div className="row">
					<div className="col-md-4">
						<input onChange={(e) => setAuthor(e.target.value)} className="form-control mb-3" type="text" value={author} placeholder="Автор курса" />
					</div>
					<div className="col-md-4">
						<select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
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
