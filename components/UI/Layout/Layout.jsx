import classes from "./Layout.module.scss"
import Menu from "../../Menu/Menu";

const Layout = ({children}) => {
    return (
        <>
            <div className="navbar">
                <Menu />
            </div>
            <div className={classes.layout}>
                {children}
            </div>
        </>
    )
}

export default Layout;