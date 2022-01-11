import axios from "axios";
import CoursePreview from "../../components/CoursePreview/CoursePreview";

const Courses = ({ courses }) => {
	return (
		<>
			<h1>Курсы</h1>
			{ courses.data.map(course => <CoursePreview key={course.id} name={course.name} />) }
		</>
	);
};

export default Courses;

export async function getServerSideProps(context) {

	const categoryName = context.params.courses;

	const response = await axios.get(`http://localhost:3000/api/${categoryName}`)
	const data = await response.data


	return {
		props: {
			courses: data,
		},
	};
}
