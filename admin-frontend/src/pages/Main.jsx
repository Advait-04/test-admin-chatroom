import { useEffect, useLayoutEffect, useState } from "react";
import _ from "lodash";

import ActiveCard from "../components/ActiveCard";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import DropdownComponent from "../components/DropdownComponent";
import ChatroomChart from "../components/ChatroomChart";
import UserChart from "../components/UserChart";

import { useDashboard } from "../hooks/useDashboard";
import { useChatroomList } from "../hooks/useChatroomList";
import { useChatroomDashboard } from "../hooks/useChatroomDashboard";
import { useUserList } from "../hooks/useUserList";

import { useAtom } from "jotai";
import { dashboardAtom, chatroomListAtom, userListAtom } from "../utils/jotai";

import { RxAvatar } from "react-icons/rx";
import { TfiTime } from "react-icons/tfi";

export default function Main() {
    const {
        error: dashboardItemError,
        getDashboard,
        isLoading: dashboardItemLoading,
    } = useDashboard();

    const {
        error: chatroomListError,
        getChatroomList,
        isLoading: chatroomListLoading,
    } = useChatroomList();

    const {
        error: userListError,
        getUserList,
        isLoading: userListIsLoading,
    } = useUserList();

    const [dashboardItem, setDashboardItem] = useAtom(dashboardAtom);
    const [chatroomList, setChatroomList] = useState(chatroomListAtom);
    const [userList, setUserList] = useAtom(userListAtom);

    const [renderActiveUsers, setRenderActiveUsers] = useState(true);
    const [renderChatroomList, setRenderChatroomList] = useState(true);
    const [renderUserList, setRenderUserList] = useState(true);

    const [currentChatroom, setCurrentChatroom] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const dashboardInterval = setInterval(async () => {
            getDashboard().then((item) => {
                if (_.isEqual(item, dashboardItem)) {
                    setRenderActiveUsers(false);
                } else {
                    setRenderActiveUsers(true);
                    setDashboardItem(item);
                }
            });
        }, 1000);

        return () => clearInterval(dashboardInterval);
    }, [dashboardItem]);

    useEffect(() => {
        const chatroomListInterval = setInterval(async () => {
            getChatroomList().then((clist) => {
                if (_.isEqual(clist, chatroomList)) {
                    setRenderChatroomList(false);
                } else {
                    setRenderChatroomList(true);
                    setChatroomList(clist);
                }
            });
        }, 1000);

        return () => clearInterval(chatroomListInterval);
    }, []);

    useEffect(() => {
        const userListInterval = setInterval(async () => {
            getUserList().then((ulist) => {
                if (_.isEqual(ulist, userList)) {
                    setRenderUserList(false);
                } else {
                    setRenderUserList(true);
                    setUserList(ulist);
                }
            });
        }, 1000);

        return () => clearInterval(userListInterval);
    }, []);

    useEffect(() => {});

    useLayoutEffect(() => {
        if (dashboardItemError) {
            if (
                dashboardItemError === "access denied" ||
                dashboardItemError.includes("jwt")
            ) {
                localStorage.removeItem("login");
            }
        }
    }, [dashboardItemError]);

    return (
        <div className="main-panel w-100">
            <h3>
                Active Users:{" "}
                {dashboardItemError ? (
                    <span className="text-danger">{`Error: ${dashboardItemError}`}</span>
                ) : (
                    <></>
                )}
            </h3>
            <div className="active-users d-flex align-items-center ">
                {renderActiveUsers ? (
                    <div className="spinner-border spinner mt-3 ms-3 "></div>
                ) : (
                    dashboardItem.concurrentusers.map((item, index) => {
                        return <ActiveCard email={item} key={index} />;
                    })
                )}
            </div>
            <div className="d-flex mt-5">
                <div className="w-25 me-5">
                    <h3 className="">Top User</h3>
                    <div className="blocks-2 p-4 w-100 d-fle flex-column shadow rounded">
                        <div className="bg-transparent d-flex align-items-center ">
                            <RxAvatar className="bg-transparent" size={30} />
                            <span className="bg-transparent mx-3 fs-3">
                                {dashboardItem.topuser.user ||
                                    `loading user id....`}
                            </span>
                        </div>
                        <div className="bg-transparent d-flex align-items-center">
                            <TfiTime className="bg-transparent " size={28} />
                            <span className="bg-transparent mx-3 fs-3">
                                {dashboardItem.topuser.usage
                                    ? `${
                                          Math.round(
                                              (dashboardItem.topuser.usage /
                                                  3600 +
                                                  Number.EPSILON) *
                                                  100
                                          ) / 100
                                      } hrs`
                                    : `loading hrs...`}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="w-25">
                    <h3 className="">Least User</h3>
                    <div className="blocks-3 p-4 w-100 d-fle flex-column shadow rounded">
                        <div className="bg-transparent d-flex align-items-center ">
                            <RxAvatar className="bg-transparent" size={30} />
                            <span className="bg-transparent mx-3 fs-3">
                                {dashboardItem.bottomuser.user ||
                                    `loading user id....`}
                            </span>
                        </div>
                        <div className="bg-transparent d-flex align-items-center">
                            <TfiTime className="bg-transparent " size={28} />
                            <span className="bg-transparent mx-3 fs-3">
                                {`${
                                    Math.round(
                                        (dashboardItem.bottomuser.usage / 3600 +
                                            Number.EPSILON) *
                                            100
                                    ) / 100
                                } hrs`}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="chatrooms-panel w-100 mt-5">
                <h3>Chatroom Panel</h3>
                <div className="w-100 d-flex g-2">
                    <DropdownButton
                        title={
                            currentChatroom
                                ? currentChatroom
                                : `Select Chatroom`
                        }
                    >
                        <DropdownComponent
                            list={chatroomList}
                            setter={setCurrentChatroom}
                        />
                    </DropdownButton>

                    <div className="chart-div">
                        {<ChatroomChart currentChatroom={currentChatroom} />}
                    </div>
                </div>
            </div>

            <div className="user-panel w-100 mt-3">
                <h3>User Panel</h3>
                <div className="w-100 d-flex g-2">
                    <DropdownButton
                        title={currentUser ? currentUser : `Select User`}
                    >
                        <DropdownComponent
                            list={userList}
                            setter={setCurrentUser}
                        />
                    </DropdownButton>

                    <div className="chart-div">
                        {<UserChart currentUser={currentUser} />}
                    </div>
                </div>
            </div>
        </div>
    );
}
