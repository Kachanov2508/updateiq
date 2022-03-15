import classes from "./Search.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";


function Search() {
    const router = useRouter();
    const { data: session } = useSession();

    return (
        <div className={classes.wrapper}>
            <div className={classes.search}>
                <div className={classes.bcg}>
					<FontAwesomeIcon icon={faSearch} />
					<input type="text" />
				</div>
            </div>
            <div className={classes.auth}>
                {session ? (
                    <button className={classes.button} onClick={() => signOut()}>Выйти</button>
                ) : (
                    <button className={classes.button} onClick={() => router.push("/auth/signin")}>Войти</button>
                )}
            </div>
        </div>
    );
}

export default Search;
