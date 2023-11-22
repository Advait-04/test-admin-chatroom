import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAtom } from "jotai";

import Navbar from "./components/Navbar";
import Main from "./pages/Main";
import Login from "./pages/Login";

import { loginAtom } from "./utils/jotai";

function App() {
    const [login, setLogin] = useAtom(loginAtom);

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
