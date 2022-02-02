import { useRouter } from "next/router";
import classes from "./BreadCrumbs.module.scss";

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
					return (
						<li key={item} onClick={() => clickHandler(index)}>
							{item.replaceAll("-", " ")}
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default BreadCrumbs;
