import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAtom } from "jotai";

import Navbar from "./components/Navbar";
import Main from "./pages/Main";
import Login from "./pages/Login";

import { loginAtom } from "./utils/jotai";

function App() {
    const [login, setLogin] = useAtom(loginAtom);
    console.log(login);

    return (
        <div className="app">
            <Navbar />
            <div className="main d-flex justify-content-center align-items-center p-3">
                {login ? <Main /> : <Login />}
            </div>
        </div>
    );
}

export default App;
