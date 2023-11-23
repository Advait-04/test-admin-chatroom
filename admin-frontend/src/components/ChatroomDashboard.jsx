import Spinner from "react-bootstrap/Spinner";
import { useChatroomDashboard } from "../hooks/useChatroomDashboard";
import { useEffect, useState, useLayoutEffect } from "react";

const ChatroomDashboard = ({ chatroom }) => {
    const { error, isLoading, chatroomDashboard, getChatroomDashboard } =
        useChatroomDashboard();
    const [intervalID, setIntervalID] = useState();
    const [reqSpinner, setReqSpinner] = useState(false);

    useEffect(() => {
        setReqSpinner(true);
        getChatroomDashboard(chatroom);

        if (intervalID) {
            clearInterval(intervalID);
            setIntervalID(
                setInterval(() => {
                    setReqSpinner(true);
                    getChatroomDashboard(chatroom);
                }, 1000)
            );
        } else {
            setIntervalID(
                setInterval(() => {
                    setReqSpinner(true);
                    getChatroomDashboard(chatroom);
                }, 1000)
            );
        }
    }, [chatroom]);

    useEffect(() => {
        setReqSpinner(false);
    });

    useLayoutEffect(() => {
        setReqSpinner(true);
    }, [chatroom]);

    return reqSpinner ? (
        <Spinner />
    ) : chatroomDashboard ? (
        <div>
            <p className="fw-bold fs-5">
                room:{" "}
                <span className="text-primary fw-light ">
                    {chatroomDashboard.room}
                </span>
            </p>
            <p className="fw-bold fs-5">
                total number of chats:{" "}
                <span className="text-primary fw-light ">
                    {chatroomDashboard.logs.totalchats}
                </span>
            </p>
            <div className="fw-bold fs-5">
                top user:
                {
                    <div className="ms-3">
                        <p>
                            user:{" "}
                            <span className="text-primary fw-light">
                                {chatroomDashboard.logs.topuser.user}
                            </span>
                        </p>
                        <p className="mt-1">
                            message count:{" "}
                            <span className="text-primary fw-light">
                                {chatroomDashboard.logs.topuser.messagecount}
                            </span>
                        </p>
                    </div>
                }
            </div>
            <div className="fw-bold fs-5">
                least user:
                {
                    <div className="ms-3">
                        <p>
                            user:{" "}
                            <span className="text-primary fw-light">
                                {chatroomDashboard.logs.bottomuser.user}
                            </span>
                        </p>
                        <p className="mt-1">
                            message count:{" "}
                            <span className="text-primary fw-light">
                                {chatroomDashboard.logs.bottomuser.messagecount}
                            </span>
                        </p>
                    </div>
                }
            </div>
        </div>
    ) : (
        <></>
    );
};

export default ChatroomDashboard;
