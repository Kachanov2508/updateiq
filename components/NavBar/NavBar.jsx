import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import classes from "./Navbar.module.scss";
import { faHtml5, faCss3Alt, faJsSquare, faReact, faVuejs, faAngular } from "@fortawesome/free-brands-svg-icons";
import Category from "./Category/Category";

// import MediaQuery from 'react-responsive'
// import { useMediaQuery } from 'react-responsive'

const Navbar = () => {
	const [courses, setCourses] = useState([]);

	function filterCourse(array, lang) {
		return array.filter((item) => item.category === lang);
	}

	useEffect(() => {
		async function getCourses() {
			let res = await axios.get("/api/courses");
			const data = await res.data;
			setCourses(data);
		};

		getCourses();
	}, []);

	return (
		<div className={classes.navbar}>
			<div className={classes.heading}>
				<Link href="/" passHref><h1>updateIQ</h1></Link>
			</div>
			<Category name="html" icon={faHtml5} size="lg" color="#e65100" courses={filterCourse(courses, 'html')} />
			<Category name="css" icon={faCss3Alt} size="lg" color="#0170ba" courses={filterCourse(courses, 'css')} />
			<Category name="java script" icon={faJsSquare} size="lg" color="#f7e01d" courses={filterCourse(courses, 'java-script')} />
			<Category name="react" icon={faReact} size="lg" color="#61dafb" courses={filterCourse(courses, 'react')} />
			<Category name="vue" icon={faVuejs} size="lg" color="#42b783" courses={filterCourse(courses, 'vue')} />
			<Category name="angular" icon={faAngular} size="lg" color="#c30130" courses={filterCourse(courses, 'angular')} />
		</div>
	)
};

export default Navbar;