import { useState } from "react";

export const useChatroomDashboard = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [chatroomDashboard, setChatroomDashboard] = useState(null);

    const getChatroomDashboard = async (chatroom) => {
        setIsLoading(true);
        setError(null);

        const chatroomResponse = await fetch(
            `/api/admin/getchatrooms/${chatroom}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
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
