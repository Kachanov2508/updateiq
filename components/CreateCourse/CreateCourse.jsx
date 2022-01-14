import { useRef, useState } from "react";
import axios from "axios";
import slugify from "slugify";

import "bootstrap/dist/css/bootstrap.css";

const CreateCourse = () => {
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

		// Объект курса
		let course = {
			name: files[0].webkitRelativePath.split("/")[0],
			slug: slugify(files[0].webkitRelativePath.split("/")[0].toLowerCase(), { remove: /[*+~.()'"!:@]/g }),
			author: author,
			category: category,
			duration: hours,
			description: description,
			folders: [],
			preview: ""
		};

		for (let f in files) {
			// Путь к файлу
			const path = files[f].webkitRelativePath.split("/");
			// Имя папки
			const folderName = path[1];
			// Имя файла
			const fileName = path[path.length - 1];
			// Номер папки для сортировки
			const folderNumber = folderName.split(".")[0];
			// Номер файла для сортировки
			const fileNumber = fileName.split(".")[0];
			// url файла
			const fileUrl = files[f].webkitRelativePath;
			// Slug
			let slugFile = fileName.replace('.mp4', "");
			slugFile = slugFile.replace('.srt', "");
			slugFile = slugFile.replace('.vtt', "");
			slugFile = slugify(slugFile.toLowerCase(), { remove: /[*+~.()'"!:@]/g });
			
			// Удаляем имя файла из директории
			path.pop();
			// Директория к папке где будет лежать файл
			let dirPath = path.join("/");

			const formData = new FormData();
			formData.append("file", files[f]);

			const responce = await axios.post("/api/admin/upload", formData, {
				headers: {
					"content-type": "multipart/form-data",
					dirPath: dirPath,
				},
			});

			// Ищем папку
			const serchFolder = course.folders.find((item) => item.folderName === folderName);
			// Если папки нет то создаем, и добавляем файлы
			if (!serchFolder) {
				course.folders.push({ folderName, files: [{ fileName, fileUrl, slug: slugFile, fileNumber }], folderNumber });
			} else {
				// Добавляем файлы в найденную папку
				serchFolder.files.push({ fileName, fileUrl, slug: slugFile, fileNumber });
			}
		}
		
		// Сортируем папки по убыванию
		course.folders.sort(function(a, b) {
			return a.folderNumber - b.folderNumber
		})

		// Сортируем файлы по убыванию
		course.folders.map(folder => {
			folder.files.sort(function(a, b){
				return a.fileNumber - b.fileNumber
			})
		})

		// Preview - Первое видео в курсе
		course.preview = course.folders[0].files[0].fileUrl;


		// Добавляем в объект свойства video и subtitle и сортируем по ним файлы
		course.folders.map(folder => {
			if(folder.files.filter(file => file.fileName.includes(".mp4"))) folder.video = folder.files.filter(file => file.fileName.includes(".mp4"));
			if(folder.files.filter(file => file.fileName.includes(".srt"))) folder.subtitle = folder.files.filter(file => file.fileName.includes(".srt"));
		});

		// Удаляем из объекта свойство files
		course.folders.map(folder => delete folder.files);

		console.log(course);

		// Отправляем объект курса в БД
		await axios.post("/api/admin/upload/send-data-to-db", course);

		// Удаляем все значения из input после загрузки
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

export default CreateCourse;
