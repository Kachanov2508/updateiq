import classes from "./Layout.module.scss"
import Menu from "../../Menu/Menu";

const Layout = ({children}) => {
    return (
        <>
            <div className={classes.layout}>
                <Menu />
                <div className={classes.content}>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Layout;