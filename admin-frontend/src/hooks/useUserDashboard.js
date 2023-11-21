import { useState } from "react";

export const useUserDashboard = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [userDashboard, setUserDashboard] = useState(null);

    const getUserDashboard = async (user) => {
        setIsLoading(true);
        setError(null);

        console.log("called");

        const userResponse = await fetch(`/api/admin/getuser/${user}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const userJson = await userResponse.json();

        console.log(userJson);

        if (!userResponse.ok) {
            console.log("error");
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
