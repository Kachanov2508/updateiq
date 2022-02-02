import { useRef, useState } from "react";
import axios from "axios";
import slugify from "slugify";
import classes from "./CreateCourse.module.scss";

// import "bootstrap/dist/css/bootstrap.css";

const CreateCourse = () => {
	const [files, setFiles] = useState([]);
	const [imagePreview, setImagePreview] = useState([])
	const [textPreview, setTextPreview] = useState("")
	const [author, setAuthor] = useState("");
	const [category, setCategory] = useState("");
	const [hours, setHours] = useState("");
	const [description, setDescription] = useState("");
	const [load, setLoad] = useState(false);

	const fileRef = useRef();
	const previewRef = useRef();

	const submitHandler = async (e) => {
		e.preventDefault();

		setLoad(true);

		// Дата загрузки курса
		let date = new Date();
		let day = date.getDate();
		let month = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
		let year = date.getFullYear();

		// Объект курса
		let course = {
			name: files[0].webkitRelativePath.split("/")[0],
			slug: slugify(files[0].webkitRelativePath.split("/")[0].toLowerCase(), { remove: /[*+~.()'"!:@]/g }),
			author: author,
			category: category,
			duration: hours,
			description: description,
			folders: [],
			preview: {},
			created_at: `${day}.${month}.${year}`
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
			slugFile = slugFile.replace('.vtt', "");
			slugFile = slugify(slugFile.toLowerCase(), { remove: /[*+~.()'"!:@]/g });
			
			// Удаляем имя файла из директории
			path.pop();
			// Директория к папке где будет лежать файл
			let dirPath = `${category}/${path.join("/")}`;

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


		// Загружаем Preview image в папку с курсом
		const formData = new FormData();
        formData.append("previewImage", imagePreview[0]);
        await axios.post("/api/admin/upload/imagePreview", formData, {
            headers: {
                "content-type": "multipart/form-data",
                dirPath: `${category}/${course.name}`,
            },
        });

		// Добавляем в объект свойства video и subtitle и фильтруем в них файлы
		course.folders.map(folder => {
			if(folder.files.filter(file => file.fileName.includes(".mp4"))) {
				folder.video = folder.files.filter(file => file.fileName.includes(".mp4"));
			}
			if(folder.files.filter(file => file.fileName.includes(".vtt"))) {
				folder.subtitle = folder.files.filter(file => file.fileName.includes(".vtt"));
			}
		});

		// Редактируем свойиства у объекта курса
		course.folders.map(folder => {
			for(let i = 0; i < folder.video.length; i++) {
				// Добавляем subtitle к каждому video
				folder.video[i].subtitle = folder.subtitle[i];

				// Удаляем из названия video .mp4
				folder.video[i].fileName = folder.video[i].fileName.replace(".mp4", "");

				// Удаляем из названия subtitle .vtt
				folder.subtitle[i].fileName = folder.subtitle[i].fileName.replace(".vtt", "");
				
				// Удаляем fileNumber у video и subtitle (они больше не нужны после сортировки)
				delete folder.video[i].fileNumber;
				delete folder.subtitle[i].slug;
				
				// Удаляем slug у subtitle
				delete folder.subtitle[i].fileNumber;
			}

			// Удаляем folderNumber из folder (он больше не нужн после сортировки)
			delete folder.folderNumber;

			// Удаляем subtitle из folder
			delete folder.subtitle;
		});


		// Удаляем из объекта свойство files
		course.folders.map(folder => delete folder.files);


		// course.preview.image - обложка к курсу
		course.preview.image = {
			fileName: imagePreview[0].name,
			fileUrl: `${course.name}/${imagePreview[0].name}`,
		};

		// course.preview.video - Первое видео в курсе и субтитры к нему
		course.preview.video = course.folders[0].video[0];

		// course.preview.textPreview - Краткое описание курса
		course.preview.text = textPreview;

		// Отправляем объект курса в БД
		await axios.post("/api/admin/upload/send-data-to-db", course);

		// Удаляем все значения из input после загрузки
		setAuthor("");
		setHours("");
		setDescription("");
		setTextPreview("")
		setLoad(false);
		fileRef.current.value = null;
		previewRef.current.value = null;
	};

	return (
		<div className={classes.createCourse}>
			<form onSubmit={submitHandler}>

				<div className={classes.top}>
					<div className={classes.folder}>
						<label htmlFor="folder">Папка с курсом</label>
						<input onChange={(e) => setFiles(Array.from(e.target.files))} id="folder" ref={fileRef} type="file" directory="" webkitdirectory="" mozdirectory="" />
					</div>
					
					<div className={classes.preview}>
						<label htmlFor="preview">Обложка для курска</label>
						<input type="file" name="previewImage" id="preview" ref={previewRef} onChange={(e) => setImagePreview(Array.from(e.target.files))} />
					</div>
				</div>
				
				<div className={classes.center}>
					<div className={classes.author}>
						<label htmlFor="author">Автор курска</label>
						<input onChange={(e) => setAuthor(e.target.value)} type="text" id="author" value={author} />
					</div>

					<div className={classes.duration}>
						<label htmlFor="duration">Продолжительность</label>
						<input onChange={(e) => setHours(e.target.value)} type="text" id="duration" value={hours} />
					</div>

					<div className={classes.category}>
						<label htmlFor="category">Категория</label>
						<select className="form-select" id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
							<option></option>
							<option value="react">react</option>
							<option value="vue">vue</option>
							<option value="angular">angular</option>
						</select>
					</div>
				</div>

				<div className={classes.textPreview}>
					<label htmlFor="textPreview">Краткое описание</label>
					<textarea onChange={(e) => setTextPreview(e.target.value)} id="textPreview" value={textPreview} />
				</div>
				<div className={classes.description}>
					<label htmlFor="description">Описание</label>
					<textarea onChange={(e) => setDescription(e.target.value)} id="description" value={description} />
				</div>

				<button className={classes.btn} type="submit" disabled={load}>
					{load ? "Загрузка..." : "Загрузить"}
				</button>
			</form>
		</div>
	);
};

export default CreateCourse;