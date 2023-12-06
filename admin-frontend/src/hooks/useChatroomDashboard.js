import { useState } from "react";
import * as CryptoJS from "crypto-js";

export const useChatroomDashboard = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const secret = "KllPI7zmhucBQYu";

    const getChatroomDashboard = async (chatroom) => {
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

        const chatroomDashboardResponse = await fetch(
            `https://mern-chatroom-backend.vercel.app/api/admin/getchatroomdashboard/${chatroom}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const chatroomDashboardJSON = await chatroomDashboardResponse.json();

        if (!chatroomDashboardResponse.ok) {
            setError(chatroomDashboardJSON.error);
            setIsLoading(false);
        } else {
            setError(null);
            setIsLoading(false);

            return chatroomDashboardJSON;
        }
    };

    return {
        error,
        isLoading,
        getChatroomDashboard,
    };
};
