import axios from "axios";
import Head from "next/head";
import CourseList from "../../components/CourseList/CourseList";

const Courses = ({ courses }) => {
	return (
		<>
			<Head>
				<title>Курсы</title>
				<meta name="description" content="Курсы по разработке" />
			</Head>
			<h1>Курсы</h1>
			<CourseList courses={courses} />
		</>
	);
};
export default Courses;

export async function getServerSideProps(context) {
	const categoryName = context.params.courses;
	const response = await axios.get(`http://localhost:3000/api/${categoryName}`);
	const courses = await response.data;

	return {
		props: {
			courses: courses.data,
		},
	};
}
