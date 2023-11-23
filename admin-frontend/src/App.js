import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAtom } from "jotai";

import Navbar from "./components/Navbar";
import Main from "./pages/Main";
import Login from "./pages/Login";

import { loginAtom } from "./utils/jotai";
import { useLayoutEffect } from "react";

function App() {
    const [login, setLogin] = useAtom(loginAtom);

    useLayoutEffect(() => {
        if (localStorage.getItem("login")) {
            setLogin(true);
        }
    }, []);

    return (
        <div className="app d-flex flex-column ">
            <Navbar />
            <div className="main d-flex flex-column align-items-center justify-content-center p-2 mt-2">
                {login ? <Main /> : <Login />}
            </div>
        </div>
    );
}

export default App;
