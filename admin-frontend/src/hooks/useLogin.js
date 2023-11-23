import { useState } from "react";
import { loginAtom } from "./../utils/jotai";
import { useAtom } from "jotai";
import aes from "crypto-js/aes";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const secret = "KllPI7zmhucBQYu";

    const login = async (username, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch("/api/admin/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setIsLoading(false);
        }

        if (response.ok) {
            setError(null);
            setIsLoading(false);

            localStorage.setItem(
                "login",
                aes.encrypt(JSON.stringify(json), secret).toString()
            );
        }
    };

    return { login, isLoading, error, setError };
};
