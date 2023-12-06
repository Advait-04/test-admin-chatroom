import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAtom } from "jotai";

import Navbar from "./components/Navbar";
import Main from "./pages/Main";
import Login from "./pages/Login";

import {
    loginAtom,
    dashboardAtom,
    activeCardUserAtom,
    chatroomListAtom,
    chatroomDashboardAtom,
    userListAtom,
    userDashboardAtom,
} from "./utils/jotai";
import { useLayoutEffect } from "react";

function App() {
    const [login, setLogin] = useAtom(loginAtom);
    const [dashboardItem, setDashboardItem] = useAtom(dashboardAtom);
    const [activeCardUser, setActiveCardUser] = useAtom(activeCardUserAtom);
    const [chatroomList, setChatroomList] = useAtom(chatroomListAtom);
    const [chatroomDashboard, setChatroomDashboard] = useAtom(
        chatroomDashboardAtom
    );
    const [userList, setUserList] = useAtom(userListAtom);
    const [userDashboard, setUserDashboard] = useAtom(userDashboardAtom);

    useLayoutEffect(() => {
        if (localStorage.getItem("login")) {
            setLogin(true);
        }

        setDashboardItem({
            concurrentusers: [],
            topuser: {
                user: "",
                usage: "",
            },
            bottomuser: {
                user: "",
                usage: "",
            },
        });

        setActiveCardUser({
            _id: "",
            email: "",
            password: "",
            logs: {
                chatrooms: [],
                nooftotalchats: "",
                totalusage: "",
            },
        });

        setChatroomList([]);

        setUserList([]);

        setChatroomDashboard({
            logs: {
                topuser: {},
                bottomuser: {},
                totalchats: "",
            },
        });

        setUserDashboard({
            email: "",
            logs: {
                chatrooms: [],
                nooftotalchats: "",
                totalusage: "",
                _id: "",
            },
            chartdata: [],
        });
    }, []);

    return (
        <div className="app d-flex flex-column ">
            <Navbar />
            <div className="main d-flex flex-column align-items-center justify-content-center p-3 mt-2">
                {login ? <Main /> : <Login />}
            </div>
        </div>
    );
}

export default App;
