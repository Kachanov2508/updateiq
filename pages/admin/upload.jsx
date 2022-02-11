import { useState } from "react";
import CreateCourse from "../../components/CreateCourse/CreateCourse";

const Upload = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [admin, setAdmin] = useState(false);

    function submitHandler(e) {
        e.preventDefault();

        if (login === "Kachanov2508" && password === "Pasword2508")
            setAdmin(true);
    }

    return (
        <div>
            <h1>Загрузка курсов</h1>
            {admin ? (
                <CreateCourse />
            ) : (
                <form onSubmit={submitHandler}>
                    <input
                        type="text"
                        value={login}
                        autoСomplete="off"
                        onChange={(e) => setLogin(e.target.value)}
                    />
                    <input
                        type="password"
                        value={password}
                        placeholder="password"
                        autoСomplete="off"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Войти</button>
                </form>
            )}
        </div>
    );
};

export default Upload;
