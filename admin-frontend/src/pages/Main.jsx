import { useEffect, useRef, useState } from "react";
import { useDashboard } from "../hooks/useDashboard";
import Dashboard from "../components/Dashboard";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import UserDashboard from "../components/UserDashboard";
import UserDropdown from "../components/UserDropdown";
import ChatroomDropdown from "../components/ChatroomDropdown";
import ChatroomDashboard from "../components/ChatroomDashboard";

const Main = () => {
    const {
        getDashboard,
        error: dashboardError,
        isLoading: dashboardLoading,
        dashboardItem,
        userList,
        chatroomList,
    } = useDashboard();

    const [currentUser, setCurrentUser] = useState();
    const [currentChatroom, setCurrentChatroom] = useState();

    useEffect(() => {
        const getDashboardItems = () => {
            getDashboard();
        };

        setInterval(getDashboardItems, 1000);
    }, []);

    return (
        <div className="p-4 align-self-baseline container-fluid">
            <div className="panel-row-1 d-flex container-fluid flex-sm-column flex-xl-row gap-lg-5">
                <div className="d-flex flex-column main-stats-div">
                    <h2>Main Stats</h2>
                    <div className="blocks main-stats p-3 fs-4">
                        <div className="concurrent-div">
                            {dashboardItem ? (
                                <Dashboard dashboardItem={dashboardItem} />
                            ) : (
                                <p></p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="chatroom-stats mt-5 d-flex flex-column mt-lg-0 ">
                    <h2>Chatroom Stats</h2>
                    <div className="chatroom-dashbaord-div d-flex gap-3 ">
                        <div className="d-flex gap-3">
                            <div className="dropdown-div">
                                <DropdownButton
                                    id="dropdown-basic-button"
                                    title={currentChatroom || "Chatrooms"}
                                >
                                    {chatroomList ? (
                                        <ChatroomDropdown
                                            chatroomList={chatroomList}
                                            setCurrentChatroom={
                                                setCurrentChatroom
                                            }
                                        />
                                    ) : (
                                        <></>
                                    )}
                                </DropdownButton>
                            </div>
                        </div>
                        <div className="stat-div blocks p-3">
                            {currentChatroom ? (
                                <ChatroomDashboard chatroom={currentChatroom} />
                            ) : (
                                <div className="d-flex justify-content-center align-items-center ">
                                    <p className="m-0 fs-5">select chatroom</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="user-stats mt-5 container-fluid ">
                <h2>User Stats</h2>
                <div className="user-stats-main d-flex gap-3">
                    <div className="dropdown-div">
                        <DropdownButton
                            id="dropdown-basic-button"
                            title={currentUser || "Users"}
                        >
                            {userList ? (
                                <UserDropdown
                                    userList={userList}
                                    setCurrentUser={setCurrentUser}
                                />
                            ) : (
                                <></>
                            )}
                        </DropdownButton>
                    </div>
                    <div className="stat-div blocks p-3 overflow-hidden h-25 ">
                        {currentUser ? (
                            <UserDashboard user={currentUser} />
                        ) : (
                            <div className="d-flex justify-content-center align-items-center ">
                                <p className="m-0 fs-5">select user</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
