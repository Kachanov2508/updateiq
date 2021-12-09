import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import classes from "./NavBar.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHtml5, faCss3Alt, faJsSquare, faReact, faVuejs, faAngular } from "@fortawesome/free-brands-svg-icons";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Category from "./Category/Category";
import NavbarContext from "../../context/NavbarProvider";

import MediaQuery from 'react-responsive'
import { useMediaQuery } from 'react-responsive'

const NavBar = () => {
	const [courses, setCourses] = useState([]);
	const {openNavbar, setOpenNavbar} = useContext(NavbarContext);

	const getCourses = async () => {
		let courses = await axios.get("/api/courses");
		courses = await courses.data;
		setCourses(courses);
	};

	useEffect(() => {
		getCourses();
	}, []);

	return (
		<>
			{
				openNavbar ? (
					<div className={classes.navbar}>
						<div className={classes.heading}>
							<Link href="/"><h1>updateIQ</h1></Link>
							<FontAwesomeIcon icon={faTimes} size="lg" onClick={() => setOpenNavbar(!openNavbar)} />
						</div>
						<Category name="html" icon={faHtml5} size="lg" color="#e65100" courses={courses.filter((item) => item.category === "html")} />
						<Category name="css" icon={faCss3Alt} size="lg" color="#0170ba" courses={courses.filter((item) => item.category === "css")} />
						<Category name="java script" icon={faJsSquare} size="lg" color="#f7e01d" courses={courses.filter((item) => item.category === "java-script")} />
						<Category name="react" icon={faReact} size="lg" color="#61dafb" courses={courses.filter((item) => item.category === "react")} />
						<Category name="vue" icon={faVuejs} size="lg" color="#42b783" courses={courses.filter((item) => item.category === "vue")} />
						<Category name="angular" icon={faAngular} size="lg" color="#c30130" courses={courses.filter((item) => item.category === "angular")} />
					</div>
				) : (
					<div className={classes.hide}>
						<div className={classes.heading}>
							<FontAwesomeIcon icon={faBars} size="lg" onClick={() => setOpenNavbar(!openNavbar)} />
						</div>
						<Category icon={faHtml5} size="lg" color="#e65100" courses={courses.filter((item) => item.category === "html")} />
						<Category icon={faCss3Alt} size="lg" color="#0170ba" courses={courses.filter((item) => item.category === "css")} />
						<Category icon={faJsSquare} size="lg" color="#f7e01d" courses={courses.filter((item) => item.category === "java-script")} />
						<Category icon={faReact} size="lg" color="#61dafb" courses={courses.filter((item) => item.category === "react")} />
						<Category icon={faVuejs} size="lg" color="#42b783" courses={courses.filter((item) => item.category === "vue")} />
						<Category icon={faAngular} size="lg" color="#c30130" courses={courses.filter((item) => item.category === "angular")} />
					</div>
				)
			}
		</>
	)
};

export default NavBar;
