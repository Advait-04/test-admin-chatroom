import { useState } from "react";

export const useDashboard = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [dashboardItem, setDashboardItem] = useState(null);
    const [userList, setUserList] = useState(null);
    const [chatroomList, setChatroomList] = useState(null);

    const getDashboard = async () => {
        setIsLoading(true);
        setError(null);

        const dashboardResponse = await fetch("/api/admin/getdashboarditem", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const dashboardJson = await dashboardResponse.json();

        const usersResponse = await fetch("/api/admin/getuser", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const usersJson = await usersResponse.json();

        const chatroomsResponse = await fetch("/api/admin/getchatrooms", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const chatroomsJson = await chatroomsResponse.json();

        if (
            !dashboardResponse.ok ||
            !usersResponse.ok ||
            !chatroomsResponse.ok
        ) {
            if (!dashboardResponse.ok) {
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
