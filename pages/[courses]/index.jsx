import axios from "axios";
import Head from "next/head";
import CourseList from "../../components/CourseList/CourseList";

export default function Courses({ courses, category }) {

	const heading = { textTransform: "capitalize" }

	return (
		<>
			<Head>
				<title>Бесплатные курсы по {category} на русском</title>
				<meta name="description" content={`Самые популярные курсы по ${{category}} переведенные на русский язык`} />
			</Head>
			<h1>Курсы по <span style={heading}>{category}</span></h1>
			<CourseList courses={courses} />
		</>
	);
}

export async function getStaticProps(context) {
	const response = await axios.get(`${process.env.domain}/api/${context.params.courses}`);
	const courses = await response.data;

	return {
		props: {
			courses: courses.data,
			category: context.params.courses
		},
	};
}

export async function getStaticPaths() {
	const response = await axios.get(`${process.env.domain}/api/all-courses`);
	const courses = await response.data;

	const paths = courses.data.map((course) => {
		return {
			params: { courses: course.category },
		};
	});

	return {
		paths: paths,
		fallback: false,
	};
}
