import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RoomSelect = () => {
    const [room, setRoom] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("/api/chats/retrievechat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ room }),
        });

        const json = await response.json();

        if (response.ok) {
            navigate("/chatroom", { state: json });
        }
    };

    return (
        <Form className="room-select fs-3 p-5" onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Room Select</Form.Label>
                <div className="d-flex justify-content-center align-items-center mb-2">
                    <Form.Control
                        type="text"
                        onChange={(e) => setRoom(e.target.value)}
                        value={room}
                        className="me-2"
                        placeholder="ex:oratoria"
                        size="lg"
                    />
                    <Button variant="success" size="lg">
                        Go
                    </Button>
                </div>
            </Form.Group>
        </Form>
    );
};

export default RoomSelect;
