import classes from "./Search.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import axios from "axios";

function Search() {
    const [courses, setCourses] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [showResultSerch, setShowResultSerch] = useState(false);

    const router = useRouter();

    async function onChangeHandler(e) {
        setInputValue(e.target.value);

        const res = await axios.get(`${process.env.domain}/api/search?q=${inputValue}`);
        const courses = await res.data;

        setCourses(courses.data);
        setShowResultSerch(true);
    }

    function onBlurHandler() {
        setTimeout(() => setShowResultSerch(false), 150);
    }

    function clickHandler(category, slug) {
        router.push(`/${category}/${slug}`);
        setInputValue("");
    }

    function resultSerch() {
        if (inputValue.length && showResultSerch) {
            return (
                <ul className={classes.list}>
                    {courses.map((course, index) => (
                        <li onClick={() => clickHandler(course.category, course.slug)} key={course._id}>
                            {course.name}
                        </li>
                    ))}
                </ul>
            );
        }

        if(courses.length === 0 && showResultSerch) {
            return (
                <ul className={classes.list}>
                    <li>Ничего не найдено :(</li>
                </ul>
            )
        }

    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.search}>
                <div className={classes.input}>
                    <FontAwesomeIcon icon={faSearch} />
                    <input
                        type="text"
                        value={inputValue}
                        onChange={onChangeHandler}
                        onFocus={onChangeHandler}
                        onBlur={onBlurHandler}
                    />
                </div>
                {inputValue.length && showResultSerch && 
                (<ul className={classes.list}>
                    {courses.map((course, index) => (
                        <li onClick={() => clickHandler(course.category, course.slug)} key={course._id}>
                            {course.name}
                        </li>
                    ))}
                </ul>)}

            {courses.length === 0 && showResultSerch && (
                <ul className={classes.list}>
                    <li>Ничего не найдено :(</li>
                </ul>)}
        
            </div>
        </div>
    );
}

export default Search;
