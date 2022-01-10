import classes from "./Menu.module.scss";
import { faHtml5, faCss3Alt, faJsSquare, faReact, faVuejs, faAngular } from "@fortawesome/free-brands-svg-icons";
import Category from "./Category/Category";
import Heading from "./Heading/Heading";

const Menu = () => {
	return (
		<div className={classes.menu}>
			<Heading />
			<Category name="html" icon={faHtml5} size="lg" color="#e65100" link="/html" />
			<Category name="css" icon={faCss3Alt} size="lg" color="#0170ba" link="/css" />
			<Category name="java script" icon={faJsSquare} size="lg" color="#f7e01d" link="/java-script" />
			<Category name="react" icon={faReact} size="lg" color="#61dafb" link="/react" />
			<Category name="vue" icon={faVuejs} size="lg" color="#42b783" link="/vue" />
			<Category name="angular" icon={faAngular} size="lg" color="#c30130" link="/angular" />
		</div>
	);
};

export default Menu;
