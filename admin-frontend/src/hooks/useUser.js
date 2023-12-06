import { useState } from "react";
import * as CryptoJS from "crypto-js";

export const useUser = (email) => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const [user, setUser] = useState({
        _id: "",
        email: "",
        password: "",
        logs: {
            chatrooms: [],
            nooftotalchats: "",
            totalusage: "",
        },
    });

    const secret = "KllPI7zmhucBQYu";

    const getUser = async () => {
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

        const userResponse = await fetch(
            `https://mern-chatroom-backend.vercel.app/api/admin/getuser/${email}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const userJson = await userResponse.json();

        if (!userResponse.ok) {
            setIsLoading(false);
            setError(userJson.error);
        } else {
            setError(null);
            setIsLoading(false);
            setUser(userJson);
        }
    };

    return {
        error,
        isLoading,
        user,
        getUser,
    };
};
