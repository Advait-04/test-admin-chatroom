import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
// import { AiOutlineArrowRight } from "react-icons/ai";

const RoomSelect = () => {
    const [room, setRoom] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
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
