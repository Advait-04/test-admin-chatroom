import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import { useRef, useState } from "react";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [buttonVarient, setButtonVarient] = useState("primary");

    const isLoading = true;
    const error = false;

    const handleSubmit = (e) => {
        e.preventDefault();

        setButtonVarient("outline-primary");
    };

    return (
        <Form className="login p-5 fs-5" onSubmit={handleSubmit}>
            <h3 className="text-center mb-4 fs-3 mt-4">-- Login --</h3>
            <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
            </Form.Group>
            <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </Form.Group>

            {error && <div className="error">{error}</div>}

            <Button
                // disabled={error}
                // ref={loginButtonRef}
                variant={buttonVarient}
                type="submit"
                className={`mt-4 w-100 fs-5 d-flex align-items-center justify-content-center p-2`}
            >
                {isLoading ? <Spinner /> : `Login`}
            </Button>
        </Form>
    );
};

export default Login;