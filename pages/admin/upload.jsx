// import { useState } from "react";
import CreateCourse from "../../components/CreateCourse/CreateCourse";

const upload = () => {
    // const [login, setLogin] = useState("");
    // const [password, setPassword] = useState("");
    // const [admin, setAdmin] = useState(false);

    // function submitHandler(e) {
    //     e.preventDefault();

    //     if (login === "Kachanov2508" && password === "Pasword2508")
    //         setAdmin(true);
    // }

    return (
        <div>
            <h1>Загрузка курсов</h1>
            <CreateCourse />
        </div>
    );
};

export default upload;
