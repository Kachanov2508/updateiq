import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrain } from "@fortawesome/free-solid-svg-icons";
import classes from "./Icon.module.scss";

const Icon = (props) => {
    return (
        <div className={classes.icon}>
            <FontAwesomeIcon icon={props.icon || faBrain} size={props.size || "lg"} color={props.color || "#cccccc"} />
            <span>{props.text || "Text icon"}</span>
        </div>
    )
}

export default Icon;
