import Folder from "./Folder/Folder";
import { useState } from "react";
import classes from "./Category.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Category = (props) => {
	const [openCategory, setOpenCategory] = useState(false);

	return (
		<div>
			<div onClick={() => setOpenCategory(!openCategory)} className={classes.category}>
				<FontAwesomeIcon icon={props.icon} size={props.size} color={props.color} />
				<h2>{props.name}</h2>
			</div>
			{openCategory && props.courses.map((item) => <Folder name={item.name} courseSlug={item.slug} fileSlug={item.folders[0].files[0].slug} key={item.slug} />)}
		</div>
	);
};

export default Category;
