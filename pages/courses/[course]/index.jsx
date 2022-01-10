import axios from "axios";
import { useMemo, useState } from "react";
import Cours from "../../../components/Course/Course";

const Course = ({ course, folders }) => {
	const [video, setVideo] = useState("");
	const [subtitle, setSubtitle] = useState("");

	useMemo(() => {
		// Первое видео
		const firstVideoUrl = folders[0].files.find((item) => item.fileName.includes(".mp4"));

		// Субтитры к первому видео
		const firstSubtitleUrl = folders[0].files.find((item) => item.fileName.includes(".vtt"));

		setVideo(firstVideoUrl.fileUrl);
		setSubtitle(firstSubtitleUrl.fileUrl);
	}, [folders]);

	return (
		<Cours course={course} video={video} subtitle={subtitle} />
	);
};

export default Course;

////////////////////////////////////////////////////////////////////////////////////////////////

export async function getServerSideProps(context) {
	const res = await axios.get(`http://localhost:3000/api/courses/${context.params.course}`);
	const course = await res.data.course;
	const folders = await res.data.folders;

	if (!course) {
		return {
			notFound: true,
		};
	}

	return {
		props: { course, folders },
	};
}
