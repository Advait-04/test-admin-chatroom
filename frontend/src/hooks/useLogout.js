import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();

    const logout = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        const logs = JSON.parse(localStorage.getItem("logs"));

        //updating the stats for each user
        //updating user total usage
        const totalUsageUpdate = await fetch(
            "https://mern-chatroom-backend.vercel.app/api/admin/updateusertotalusage",
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

        const removeConc = await fetch(
            "https://mern-chatroom-backend.vercel.app/api/admin/removeconcurrentuser",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user: user.email }),
            }
        );

        //remove user from storage
        localStorage.removeItem("user");

        //remove logs from storage
        localStorage.removeItem("logs");
        dispatch({ type: "LOGOUT" });
    };

    return { logout };
};
