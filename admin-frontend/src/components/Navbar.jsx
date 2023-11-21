import Button from "react-bootstrap/Button";
import { loginAtom } from "../utils/jotai";
import { useAtom } from "jotai";

const Navbar = () => {
    const [loginState, setLoginState] = useAtom(loginAtom);

    const handleClick = () => {
        localStorage.removeItem("login");
        setLoginState(false);
    };

    return (
        <header className="navbar d-flex justify-content-between px-5">
            <h3>Admin Panel</h3>
            <Button variant="danger" onClick={handleClick}>
                Log Out
            </Button>
        </header>
    );
};

export default Navbar;
