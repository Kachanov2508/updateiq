import { useRouter } from "next/router";
import classes from "./BreadCrumbs.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const BreadCrumbs = () => {
	const router = useRouter();
	// Массив из значений объекта router.query
	const routerQuery = Object.values(router.query);

	function clickHandler(index) {
		let path = "";
		for (let i = 0; i < index + 1; i++) {
			path += `/${routerQuery[i]}`;
		}

		router.push(path);
	}

	return (
		<nav className={classes.breadCrumbs}>
			<ul>
				{routerQuery.map((item, index) => {
					// Добавляем onClick всем элементам кроме последнего
					if (index !== routerQuery.length - 1) {
						return (
							<li key={item}>
								<span className={classes.link} onClick={() => clickHandler(index)}>
									{item.replaceAll("-", " ")}
								</span>
								<FontAwesomeIcon icon={faAngleRight} color="#cccccc" />
							</li>
						);
					} else {
						return (
							<li key={item}>
								{item.replaceAll("-", " ")}
							</li>
						)
					}
				})}
			</ul>
		</nav>
	);
};

export default BreadCrumbs;
