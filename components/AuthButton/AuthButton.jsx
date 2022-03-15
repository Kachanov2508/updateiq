import { signIn } from "next-auth/react";
import classes from "./AuthButton.module.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AuthButton = ({ provider, background, icon }) => {
  return (
    <div style={{backgroundColor: background}} className={classes.button} onClick={() => signIn(provider.id)}>
        Войти через {provider.name}
        <FontAwesomeIcon icon={icon} />
    </div>
  )
}

export default AuthButton;