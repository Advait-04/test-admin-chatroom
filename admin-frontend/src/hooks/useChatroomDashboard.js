import { useState } from "react";
import * as CryptoJS from "crypto-js";

export const useChatroomDashboard = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [chatroomDashboard, setChatroomDashboard] = useState(null);
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

        const chatroomResponse = await fetch(
            `/api/admin/getchatrooms/${chatroom}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const chatroomJson = await chatroomResponse.json();

        if (!chatroomResponse.ok) {
            setError(chatroomJson.error);
            setIsLoading(false);
        }

        if (chatroomResponse.ok && chatroomJson) {
            setChatroomDashboard(chatroomJson);
            setError(null);
            setIsLoading(false);
        }
    };

    return { error, isLoading, chatroomDashboard, getChatroomDashboard };
};
