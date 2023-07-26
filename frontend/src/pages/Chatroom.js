import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useLocation } from "react-router-dom";

const Chatroom = () => {
    const { state } = useLocation();
    const { data } = state;
    const { chat, room } = data;

    console.log(chat);

    return (
        <div className="chatroom w-100 h-100">
            <div className="chatroom-chat overflow-scroll">
                <div className="chatroom-header p-3 fs-5">
                    <p>Room : {room}</p>
                </div>
                <div className="chatroom-chats ">
                    {chat.map((ch) => {
                        return (
                            <div className="chat-div p-4 fs-5" key={ch._id}>
                                <p className="fs-4 fw-bold">{ch.user}</p>
                                <p className="ms-4">{ch.text}</p>
                                <p className="ms-4">{ch.timestamp}</p>
                            </div>
                        );
                    })}
                </div>
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
