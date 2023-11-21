import { useEffect, useState } from "react";
import { useDashboard } from "../hooks/useDashboard";
import Dashboard from "../components/Dashboard";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import UserDashboard from "../components/UserDashboard";
import UserDropdown from "../components/UserDropdown";

const Main = () => {
    const {
        getDashboard,
        error: dashboardError,
        isLoading: dashboardLoading,
        dashboardItem,
        userList,
    } = useDashboard();

    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const getDashboardItems = () => {
            getDashboard();
        };

        setInterval(getDashboardItems, 1000);
    }, []);

    return (
        <div className="p-4 align-self-baseline container-fluid">
            <div className="panel-row-1 d-flex container-fluid">
                <div className="w-50">
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
                <div className="mt-5">
                    <h2>Chatroom Stats</h2>
                </div>
            </div>
            <div className="user-stats mt-5">
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
                    <div className="stat-div blocks p-3">
                        {currentUser ? (
                            <UserDashboard user={currentUser} />
                        ) : (
                            <p>select user</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
