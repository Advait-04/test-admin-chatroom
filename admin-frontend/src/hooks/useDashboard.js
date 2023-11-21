import { useState } from "react";

export const useDashboard = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [dashboardItem, setDashboardItem] = useState(null);
    const [userList, setUserList] = useState(null);

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

        if (!dashboardResponse.ok || !usersResponse.ok) {
            setError(
                !dashboardResponse.ok ? dashboardJson.error : usersJson.error
            );
            setIsLoading(false);
        }

        if (dashboardResponse.ok && usersResponse.ok) {
            setError(null);
            setIsLoading(false);
            setDashboardItem(dashboardJson);
            setUserList(usersJson);
        }
    };

    return { error, isLoading, getDashboard, dashboardItem, userList };
};
