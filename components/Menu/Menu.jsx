import classes from "./Menu.module.scss";
import { faHtml5, faCss3Alt, faJsSquare, faReact, faVuejs, faAngular } from "@fortawesome/free-brands-svg-icons";
import Category from "./Category/Category";
import Heading from "./Heading/Heading";
import Footer from "../Footer/Footer";

const Menu = () => {
	return (
		<div className={classes.wrapper}>
			<div className={classes.menu}>
				<div className={classes.link}>
					<Heading />
					<Category name="HTML" icon={faHtml5} size="lg" color="#e65100" link="/html" />
					<Category name="CSS" icon={faCss3Alt} size="lg" color="#0170ba" link="/css" />
					<Category name="Java Script" icon={faJsSquare} size="lg" color="#f7e01d" link="/java-script" />
					<Category name="React" icon={faReact} size="lg" color="#61dafb" link="/react" />
					<Category name="Vue" icon={faVuejs} size="lg" color="#42b783" link="/vue" />
					<Category name="Angular" icon={faAngular} size="lg" color="#c30130" link="/angular" />
				</div>
				<Footer />
			</div>
		</div>
	);
};

export default Menu;
