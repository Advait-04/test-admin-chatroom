import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Chatroom from "./pages/Chatroom";

function App() {
    return (
        <div className="App min-vh-100">
            <BrowserRouter>
                <Navbar />
                <div className="pages d-flex justify-content-center align-items-center p-3">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/chatroom" element={<Chatroom />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
