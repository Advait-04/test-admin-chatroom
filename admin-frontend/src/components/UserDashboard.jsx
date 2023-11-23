import { useEffect, useLayoutEffect, useState } from "react";
import { useUserDashboard } from "../hooks/useUserDashboard";

import Spinner from "react-bootstrap/Spinner";

const UserDashboard = ({ user }) => {
    const { error, isLoading, userDashboard, getUserDashboard } =
        useUserDashboard();
    const [intervalID, setIntervalID] = useState();
    const [reqSpinner, setReqSpinner] = useState(false);

    useEffect(() => {
        setReqSpinner(true);
        getUserDashboard(user);

        if (intervalID) {
            clearInterval(intervalID);
            setIntervalID(
                setInterval(() => {
                    setReqSpinner(true);
                    getUserDashboard(user);
                }, 1000)
            );
        } else {
            setIntervalID(
                setInterval(() => {
                    setReqSpinner(true);
                    getUserDashboard(user);
                }, 1000)
            );
        }
    }, [user]);

    useEffect(() => {
        setReqSpinner(false);
    });

    useLayoutEffect(() => {
        setReqSpinner(true);
    }, [user]);

    return reqSpinner ? (
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
                    {`${
                        Math.round(
                            (userDashboard.logs.totalusage / 3600 +
                                Number.EPSILON) *
                                100
                        ) / 100
                    } hrs`}
                </span>
            </p>
        </div>
    ) : (
        <></>
    );
};

export default UserDashboard;
