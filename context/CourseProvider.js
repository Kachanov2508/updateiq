import axios from "axios";
import { createContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

const CourseContext = createContext();

export const CourseProvider = (props) => {
    const router = useRouter();
	const [course, setCourse] = useState();
	const [video, setVideo] = useState('');
	const [subtitle, setSubtitle] = useState('');

	// Получаем курс
	const getCourse = async () => {
		const response = await axios.get(`/api${router.asPath}`);
		const data = await response.data;
        setCourse(data.course);
	};

	useMemo(() => {
		if (course) {
			// Сортируем папки по убыванию
			const firstFolder = course.folders.sort(function (a, b) {
				if (a.folderName.toLowerCase() < b.folderName.toLowerCase()) return -1;
				if (a.folderName.toLowerCase() > b.folderName.toLowerCase()) return 1;
				return 0;
			});

			// Сортируем файлы в первай папке
			const firstFile = firstFolder[0].files.sort(function (a, b) {
				if (a.fileName.toLowerCase() < b.fileName.toLowerCase()) return -1;
				if (a.fileName.toLowerCase() > b.fileName.toLowerCase()) return 1;
				return 0;
			});

			// Первое видео
			const firstVideoUrl = firstFile.find((item) => item.fileName.includes(".mp4"));

			// Субтитры к первому видео
			const firstSubtitleUrl = firstFile.find((item) => item.fileName.includes(".vtt"));

            setVideo(firstVideoUrl.fileUrl);
            setSubtitle(firstSubtitleUrl.fileUrl);
		}
	}, [course]);

	// Запускаем getCourse при изменении пути в браузере
	useEffect(() => {
		getCourse();
	}, [router.asPath]);

	return (
		<CourseContext.Provider value={{ course, video, subtitle, setVideo, setSubtitle }}>
			{course && props.children}
		</CourseContext.Provider>
	);
};

export default CourseContext;
