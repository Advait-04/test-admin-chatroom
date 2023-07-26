import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Chatroom = () => {
    return (
        <div className="chatroom w-100 h-100">
            <div className="chatroom-chat">
                <div className="chatroom-header p-3 fs-5">
                    <p>Room : Oratoria</p>
                </div>
                <div className="chatroom-chats"></div>
            </div>
            <div className="chatroom-from">
                <Form className="d-flex mt-3">
                    <Form.Control
                        type="text"
                        placeholder="type your messages here"
                        size="lg"
                        className="me-3"
                    />
                    <Button variant="success" size="lg">
                        Send
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default Chatroom;
