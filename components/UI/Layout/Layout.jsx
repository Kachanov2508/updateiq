import Navbar from "../../NavBar/NavBar";
import classes from "./Layout.module.scss"

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