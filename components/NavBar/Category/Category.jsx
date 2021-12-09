import Folder from "./Folder/Folder";
import { useContext, useEffect, useState } from "react";
import classes from "./Category.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavbarContext from "../../../context/NavbarProvider";

const Category = (props) => {
	const {openNavbar} = useContext(NavbarContext)
	const [openCategory, setOpenCategory] = useState(false);


	useEffect(() => {
		setOpenCategory(false)
	}, [openNavbar])

	return (
		<>
			{openNavbar ? (
				<div>
					<div onClick={() => setOpenCategory(!openCategory)} className={classes.category}>
						<FontAwesomeIcon icon={props.icon} size={props.size} color={props.color} />
						<h2>{props.name}</h2>
					</div>
					{openCategory && props.courses.map((item) => <Folder slug={item.slug} name={item.name} key={item.slug} course={item} />)}
				</div>
			) : (
				<div className={classes.hidenWrapper}>
					<div className={classes.hidenCategory} onMouseEnter={() => setOpenCategory(true)} onMouseLeave={() => setOpenCategory(false)}>
						<FontAwesomeIcon icon={props.icon} size={props.size} color={props.color} />
						<h2>{props.name}</h2>
					</div>
					{openCategory && (
						<div className={classes.folderWrapper} onMouseEnter={() => setOpenCategory(true)} onMouseLeave={() => setOpenCategory(false)} >
							{props.courses.map((item) => (
								<Folder slug={item.slug} name={item.name} key={item.slug} course={item} />
							))}
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default Category;
