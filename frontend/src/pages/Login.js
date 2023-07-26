import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, error, isLoading } = useLogin();
    const navigate = useNavigate();

    const handleSumbit = async (e) => {
        e.preventDefault();

        await login(email, password);

        if (!error) {
            navigate("/");
        }
    };
    return (
        <Form className="login p-5 fs-5" onSubmit={handleSumbit}>
            <h3 className="text-center mb-4 fs-3 mt-4">-- Login --</h3>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
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
                disabled={error}
                variant="primary"
                type="sumbit"
                className="mt-4 w-100 fs-5 "
            >
                Login
            </Button>
        </Form>
    );
};

export default Login;
