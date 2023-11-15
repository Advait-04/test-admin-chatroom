import { useEffect, useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, error, isLoading, setError } = useLogin();

    const formRef = useRef();

    const navigate = useNavigate();

    const handleSumbit = async (e) => {
        e.preventDefault();

        await login(email, password);

        if (localStorage.getItem("user")) {
            navigate("/");
        }
    };

    useEffect(() => {
        if (error !== null) {
            setInterval(() => {
                setError(null);
            }, 2000);
        }
    }, [error]);

    return (
        <Form className="login p-5 fs-5" onSubmit={handleSumbit} ref={formRef}>
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
                variant={"primary"}
                type="submit"
                className={`mt-4 w-100 fs-5 d-flex align-items-center justify-content-center p-2 ${
                    isLoading ? "for-loading" : ""
                }`}
            >
                {isLoading ? (
                    <Spinner
                        emptyColor="white"
                        speed="0.8s"
                        color="blue.500"
                        size="lg"
                    />
                ) : (
                    `Login`
                )}
            </Button>
        </Form>
    );
};

export default Login;
