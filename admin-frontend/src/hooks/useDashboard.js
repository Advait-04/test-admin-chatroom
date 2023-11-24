import { useState } from "react";
import * as CryptoJS from "crypto-js";

export const useDashboard = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [dashboardItem, setDashboardItem] = useState(null);
    const [userList, setUserList] = useState(null);
    const [chatroomList, setChatroomList] = useState(null);

    const secret = process.env.REACT_APP_SECRET;

    const getDashboard = async () => {
        setIsLoading(true);
        setError(null);

        if (!localStorage.getItem("login")) {
            return;
        }

        const token = JSON.parse(
            CryptoJS.AES.decrypt(
                localStorage.getItem("login"),
                secret
            ).toString(CryptoJS.enc.Utf8)
        ).authToken;

        const dashboardResponse = await fetch(
            "https://mern-chatroom-backend.vercel.app/api/admin/getdashboarditem",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const dashboardJson = await dashboardResponse.json();

        const usersResponse = await fetch(
            "https://mern-chatroom-backend.vercel.app/api/admin/getuser",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const usersJson = await usersResponse.json();

        const chatroomsResponse = await fetch(
            "https://mern-chatroom-backend.vercel.app/api/admin/getchatrooms",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const chatroomsJson = await chatroomsResponse.json();

        if (
            !dashboardResponse.ok ||
            !usersResponse.ok ||
            !chatroomsResponse.ok
        ) {
            if (!dashboardResponse.ok) {
                console.log(dashboardResponse);
                setError(dashboardJson.error);
            } else {
                if (!usersResponse.ok) {
                    setError(usersJson.error);
                }

                if (!chatroomsResponse.ok) {
                    setError(chatroomsJson.error);
                }
            }
            setIsLoading(false);
        }

        if (dashboardResponse.ok && usersResponse.ok && chatroomsResponse.ok) {
            setError(null);
            setIsLoading(false);
            setDashboardItem(dashboardJson);
            setUserList(usersJson);
            setChatroomList(chatroomsJson);
        }
    };

    return {
        error,
        isLoading,
        getDashboard,
        dashboardItem,
        userList,
        chatroomList,
    };
};
