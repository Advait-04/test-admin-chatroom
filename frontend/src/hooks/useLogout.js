import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();

    const logout = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        const logs = JSON.parse(localStorage.getItem("logs"));

        console.log(Math.floor(Date.now() / 1000) - logs.loginTime);

        //updating the stats for each user
        //updating user total usage
        const totalUsageUpdate = await fetch(
            "/api/admin/updateusertotalusage",
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: user.email,
                    updateValue: Math.floor(Date.now() / 1000) - logs.loginTime,
                }),
            }
        );

        // console.log(totalUsageUpdate);

        const userChatroomsUpdate = await fetch(
            "/api/admin/updateuserchatrooms",
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: user.email,
                    chatrooms: logs.roomsAccessed,
                }),
            }
        );

        const totalChatUpdate = await fetch(
            "/api/admin/updateusernooftotalchats",
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: user.email,
                    updateValue: logs.totalChats,
                }),
            }
        );

        console.log(totalChatUpdate);

        //remove user from storage
        localStorage.removeItem("user");

        //remove logs from storage
        localStorage.removeItem("logs");
        dispatch({ type: "LOGOUT" });
    };

    return { logout };
};
