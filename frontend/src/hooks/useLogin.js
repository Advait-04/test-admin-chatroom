import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setIsLoading(false);
        }

        if (response.ok) {
            //save the user to local storage
            localStorage.setItem("user", JSON.stringify(json));

            //start the timer for logging the hours used by a user
            localStorage.setItem(
                "logs",
                JSON.stringify({
                    loginTime: Math.floor(Date.now() / 1000),
                    roomTime: {},
                    roomsAccessed: [],
                    totalChats: 0,
                })
            );

            //update the auth context
            dispatch({ type: "LOGIN", payload: json });

            //setting concurrent user
            const concResponse = await fetch("/api/admin/addconcurrentuser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user: email }),
            });

            const concJson = await concResponse.json();

            if (!concResponse.ok) {
                setError(concJson.error);
                setIsLoading(false);
            }

            if (concResponse.ok) {
                setIsLoading(false);
            }
        }
    };

    return { login, isLoading, error, setError };
};
