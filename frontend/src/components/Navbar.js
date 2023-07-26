import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
        logout();
    };

    // const user = JSON.parse(localStorage.getItem("user"));

    return (
        <header className="navbar d-flex justify-between px-5">
            <div className="navbar-home fs-4 ">
                <Link to={"/"}>Chat Room</Link>
            </div>
            <nav className="navbar-pages fs-5 d-flex">
                {user && (
                    <div className="d-flex align-items-center ">
                        <p className="m-0">{user.email}</p>
                        <div className="nav-seperator mx-3"></div>
                        <Button variant="danger" onClick={handleClick}>
                            Log Out
                        </Button>
                    </div>
                )}
                {!user && (
                    <div className="d-flex">
                        <Link to={"/login"}>Login</Link>
                        <div className="nav-seperator mx-3"></div>
                        <Link to={"/signup"}>Sign Up</Link>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Navbar;
