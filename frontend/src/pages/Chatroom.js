import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const Chatroom = () => {
    const { state } = useLocation();
    const { room } = state;
    const [chatsData, setChatsData] = useState();
    const { user } = useAuthContext();
    const [text, setText] = useState("");
    const bottomRef = useRef(null);

    const refreshChat = async (room) => {
        const response = await fetch(
            `https://mern-chatroom-backend.vercel.app/api/chats/retrievechat/${room}`
        );

        const json = await response.json();

        if (response.ok) {
            const data = json.data;

            setChatsData(data.chat);
        }

        console.log("called refreshChat");
    };

    useEffect(() => {
        setInterval(async () => await refreshChat(room), 1000);

        const updateVisitedChat = async () => {
            const response = await fetch(
                "https://mern-chatroom-backend.vercel.app/api/admin/updateuserchatrooms",
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: user.email,
                        chatrooms: room,
                    }),
                }
            );
        };

        updateVisitedChat();
    }, [room]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatsData]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "https://mern-chatroom-backend.vercel.app/api/chats/sendchat",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ room, user: user.email, text }),
                }
            );

            console.log(response);

            if (localStorage.getItem("logs") && response.ok) {
                const logs = JSON.parse(localStorage.getItem("logs"));

                logs.totalChats = logs.totalChats + 1;

                localStorage.setItem("logs", JSON.stringify(logs));
            }
        } catch (err) {
            console.log("Error while sending message", err);
        }

        setText("");
    };

    return (
        <div className="chatroom w-100 h-100">
            <div className="chatroom-chat overflow-scroll">
                <div className="chatroom-header p-3 fs-5">
                    <p>Room : {room}</p>
                </div>
                <div className="chatroom-chats ">
                    {chatsData &&
                        chatsData.map((ch) => {
                            return (
                                <div className="chat-div p-4 fs-5" key={ch._id}>
                                    <p className="fs-4 fw-bold">{ch.user}</p>
                                    <p className="ms-4">{ch.text}</p>
                                    <p className="ms-4">{ch.timestamp}</p>
                                </div>
                            );
                        })}
                    <div ref={bottomRef}></div>
                </div>
            </div>
            <div className="chatroom-from" onSubmit={handleSubmit}>
                <Form className="d-flex mt-3">
                    <Form.Control
                        type="text"
                        placeholder="type your messages here"
                        size="lg"
                        className="me-3"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <Button variant="success" size="lg" type="submit">
                        Send
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default Chatroom;
