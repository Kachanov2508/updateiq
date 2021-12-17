import Course from "../../../components/Course/Course";
import axios from "axios";

const Lesson = ({ course, video, subtitle }) => {
	return (
		<Course course={course} video={video} subtitle={subtitle} />
	) 
};

export default Lesson;

//////////////////////////////////////////////////////////////////////

export async function getServerSideProps(context) {
	const res = await axios.get(`http://localhost:3000/api/courses/${context.params.course}`);
	const course = await res.data.course;
	const folders = await res.data.folders;

	const video = folders.map((folder) => {
		return folder.files.find((file) => file.slug === context.params.lesson && file.fileName.includes(".mp4"));
	});

	const subtitle = folders.map((folder) => {
		return folder.files.find((file) => file.slug === context.params.lesson && file.fileName.includes(".vtt"));
	});

	if (!course) {
		return {
			notFound: true,
		};
	}

	return {
		props: { course, folders, video: video[0].fileUrl, subtitle: subtitle[0].fileUrl },
	};
}
