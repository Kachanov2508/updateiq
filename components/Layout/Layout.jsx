import classes from "./Layout.module.scss"
import Menu from "../Menu/Menu";

const Layout = ({children}) => {
    return (
        <>
            <div className={classes.layout}>
                <Menu />
                <main className={classes.content}>
                    {children}
                </main>
            </div>
        </>
    )
}

export default Layout;