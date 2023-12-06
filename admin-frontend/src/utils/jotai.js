import { atom } from "jotai";

export const loginAtom = atom(null);
export const chatroomListAtom = atom([]);
export const userListAtom = atom([]);
export const dashboardAtom = atom({
    concurrentusers: [],
    topuser: {
        user: "",
        usage: "",
    },
    bottomuser: {
        user: "",
        usage: "",
    },
});

export const activeCardUserAtom = atom({
    _id: "",
    email: "",
    password: "",
    logs: {
        chatrooms: [],
        nooftotalchats: "",
        totalusage: "",
    },
});

export const chatroomDashboardAtom = atom({
    logs: {
        topuser: {},
        bottomuser: {},
        totalchats: "",
    },
});

export const userDashboardAtom = atom({
    email: "",
    logs: {
        chatrooms: [],
        nooftotalchats: "",
        totalusage: "",
        _id: "",
    },
    chartdata: [],
});
