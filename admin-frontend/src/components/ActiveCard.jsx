import { RxAvatar } from "react-icons/rx";
import { TfiTime } from "react-icons/tfi";
import { FiMessageSquare } from "react-icons/fi";
import { useEffect, useLayoutEffect } from "react";
import { useUser } from "../hooks/useUser";

export default function ActiveCard({ email }) {
    const { error, isLoading, user, getUser } = useUser(email);

    useEffect(() => {
        const userInterval = setInterval(() => {
            getUser();
        }, 1000);

        return () => clearInterval(userInterval);
    }, []);

    useEffect(() => {}, [user]);

    return (
        <>
            <div className="blocks-1 p-4 w-25 d-flex flex-column me-5 rounded shadow">
                <div className="bg-transparent d-flex align-items-center ">
                    <RxAvatar className="bg-transparent" size={30} />
                    <span className="bg-transparent mx-3 fs-3 ">
                        {user.email || `loading id....`}
                    </span>
                </div>
                <div className="bg-transparent d-flex align-items-center ">
                    <TfiTime className="bg-transparent " size={28} />
                    <span className="bg-transparent mx-3 fs-3 ">
                        {user.logs.totalusage
                            ? `${
                                  Math.round(
                                      (user.logs.totalusage / 3600 +
                                          Number.EPSILON) *
                                          100
                                  ) / 100
                              } hrs`
                            : user.logs.nooftotalchats
                            ? `user never logged out :( `
                            : `loading hrs....`}
                    </span>
                </div>
                <div className="bg-transparent d-flex align-items-center ">
                    <FiMessageSquare className="bg-transparent " size={28} />
                    <span className="bg-transparent mx-3 fs-3 ">
                        {user.logs.nooftotalchats || `loading chat count`}
                    </span>
                </div>
            </div>
        </>
    );
}
