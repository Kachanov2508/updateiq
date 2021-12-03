import classes from "./Layout.module.scss"

const Layout = ({children}) => {
    return (
        <div className={classes.layout}>
            {children}
        </div>
    )
}

export default Layout;
