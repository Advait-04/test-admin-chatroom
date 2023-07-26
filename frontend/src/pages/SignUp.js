import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useSignup } from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signup, error, isLoading } = useSignup();
    const navigate = useNavigate();

    const handleSumbit = async (e) => {
        e.preventDefault();

        await signup(email, password);
    };
    return (
        <Form className="signup p-5 fs-5" onSubmit={handleSumbit}>
            <h3 className="text-center mb-4 fs-3 mt-4">-- Sign Up --</h3>
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
                disabled={isLoading}
                variant="primary"
                type="sumbit"
                className="mt-4 w-100 fs-5"
            >
                Sign up
            </Button>
        </Form>
    );
};

export default SignUp;
