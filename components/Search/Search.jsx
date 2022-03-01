import classes from "./Search.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Search() {
	return (
		<div className={classes.wrapper}>
			<div className={classes.search}>
                <FontAwesomeIcon icon={faSearch} />
                <input type="text" />
            </div>
		</div>
	);
}

export default Search;
