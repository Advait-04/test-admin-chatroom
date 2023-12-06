import { useState } from "react";
import * as CryptoJS from "crypto-js";

export const useUserList = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const secret = "KllPI7zmhucBQYu";

    const getUserList = async () => {
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

        const userListResponse = await fetch("/api/admin/getuser", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const userListJson = await userListResponse.json();

        if (!userListResponse.ok) {
            setError(userListJson.error);
            setIsLoading(false);
        } else {
            setError(null);
            setIsLoading(false);

            return userListJson;
        }
    };

    return {
        error,
        isLoading,
        getUserList,
    };
};
