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
        <header className="navbar d-flex justify-content-between align-items-center px-5">
            <h3 className="fs-2 mb-0">Admin Panel</h3>
            <Button variant="danger" onClick={handleClick} hidden={!loginState}>
                Log Out
            </Button>
        </header>
    );
};

export default Navbar;
