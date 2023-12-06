import { useState } from "react";
import * as CryptoJS from "crypto-js";

export const useDashboard = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const secret = "KllPI7zmhucBQYu";

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

        if (!dashboardResponse.ok) {
            setError(dashboardJson.error);
            setIsLoading(false);
        } else {
            setError(null);
            setIsLoading(false);

            return dashboardJson;
        }
    };

    return {
        error,
        isLoading,
        getDashboard,
    };
};
