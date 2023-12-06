import { useState } from "react";
import * as CryptoJS from "crypto-js";

export const useUserDashboard = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const secret = "KllPI7zmhucBQYu";

    const getUserDashboard = async (user) => {
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

        const userDashboardResponse = await fetch(
            `https://mern-chatroom-backend.vercel.app/api/admin/getuserdashboard/${user}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const userDashboardJSON = await userDashboardResponse.json();

        if (!userDashboardResponse.ok) {
            setError(userDashboardJSON.error);
            setIsLoading(false);
        } else {
            setError(null);
            setIsLoading(false);

            return userDashboardJSON;
        }
    };

    return {
        error,
        isLoading,
        getUserDashboard,
    };
};
