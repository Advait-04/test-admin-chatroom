import { useEffect } from "react";
import { useUserDashboard } from "../hooks/useUserDashboard";

import Spinner from "react-bootstrap/Spinner";

const UserDashboard = ({ user }) => {
    const { error, isLoading, userDashboard, getUserDashboard } =
        useUserDashboard();

    useEffect(() => {
        // setInterval(() => {}, 1000);

        getUserDashboard(user);
    }, [user]);

    return isLoading ? (
        <Spinner />
    ) : userDashboard ? (
        <div>
            <p className="fw-bold fs-5">
                user:{" "}
                <span className="text-primary fw-light ">
                    {userDashboard.email}
                </span>
            </p>
            <div className="mb-3">
                <p className="mb-2 fw-bold fs-5">chatrooms used:</p>
                {userDashboard.logs.chatrooms.map((room, index) => {
                    return (
                        <span key={index} className="ms-2">{`${room}// `}</span>
                    );
                })}
            </div>
            <p className="mb-2 fw-bold fs-5">
                total number of chats:{" "}
                <span className="fw-light text-success ">
                    {userDashboard.logs.nooftotalchats}
                </span>
            </p>
            <p className="mb-2 fw-bold fs-5">
                total usage:{" "}
                <span className="fw-light text-success ">
                    {userDashboard.logs.totalusage}
                </span>
            </p>
        </div>
    ) : (
        <></>
    );
};

export default UserDashboard;
