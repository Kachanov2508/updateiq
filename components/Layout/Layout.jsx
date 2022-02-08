import classes from "./Layout.module.scss";
import Menu from "../Menu/Menu";
import Footer from "../Footer/Footer";

const Layout = ({ children }) => {
	return (
		<div className={classes.grid}>
			<div className={classes.menu}>
				<Menu />
			</div>
			<div className={classes.content}>
                {children}
            </div>
		</div>
	);
};

export default Layout;
