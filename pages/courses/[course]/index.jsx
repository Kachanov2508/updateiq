import Cours from "../../../components/Course/Course";
import { CourseProvider } from "../../../context/CourseProvider";

const Course = () => {

    return (
		<CourseProvider>
			<Cours />
		</CourseProvider>
	);
};

export default Course;
