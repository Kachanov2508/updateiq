import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'
import classes from './Buttons.module.scss'

const Buttons = (props) => {


    return (
        <div className={classes.buttons}>
            <div>
                <FontAwesomeIcon icon={faPlay} />
                <FontAwesomeIcon icon={faPause} />
            </div>
        </div>
    )
}

export default Buttons
