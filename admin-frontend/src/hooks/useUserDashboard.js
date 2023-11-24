import { useState } from "react";
import * as CryptoJS from "crypto-js";

export const useUserDashboard = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [userDashboard, setUserDashboard] = useState(null);

    const secret = process.env.REACT_APP_SECRET;

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

        const userResponse = await fetch(
            `https://mern-chatroom-backend.vercel.app/api/admin/getuser/${user}`,
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
            setError(userJson.error);
            setIsLoading(false);
        }

        if (userResponse.ok) {
            setUserDashboard(userJson[0]);
            setError(null);
            setIsLoading(false);
        }
    };

    return { error, isLoading, userDashboard, getUserDashboard };
};
