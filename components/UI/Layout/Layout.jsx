import classes from "./Layout.module.scss"
import Navbar from "../../NavBar/Navbar";

const Layout = ({children}) => {
    return (
        <>
            <div className="navbar">
                <Navbar />
            </div>
            <div className={classes.layout}>
                {children}
            </div>
        </>
    )
}

export default Layout;