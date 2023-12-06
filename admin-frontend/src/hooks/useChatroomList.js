import { useState } from "react";
import * as CryptoJS from "crypto-js";

export const useChatroomList = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const secret = "KllPI7zmhucBQYu";

    const getChatroomList = async () => {
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

        const chatroomListResponse = await fetch(
            "https://mern-chatroom-backend.vercel.app/api/admin/getchatrooms",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const chatroomListJson = await chatroomListResponse.json();

        if (!chatroomListResponse.ok) {
            setError(chatroomListJson.error);
            setIsLoading(false);
        } else {
            setError(null);
            setIsLoading(false);

            return chatroomListJson;
        }
    };

    return {
        error,
        isLoading,
        getChatroomList,
    };
};
