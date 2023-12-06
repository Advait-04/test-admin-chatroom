import { useEffect, useState } from "react";

import { useAtom } from "jotai";

import { userDashboardAtom } from "../utils/jotai";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { useUserDashboard } from "../hooks/useUserDashboard";

import _ from "lodash";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function UserChart({ currentUser }) {
    const { error, isLoading, getUserDashboard } = useUserDashboard();
    const [chartData, setChartData] = useState();
    const [userDashboard, setUserDashboard] = useAtom(userDashboardAtom);
    const [render, setRender] = useState(true);

    useEffect(() => {
        if (currentUser) {
            const chartInterval = setInterval(() => {
                getUserDashboard(currentUser).then((obj) => {
                    console.log("logging: ", obj);

                    if (obj) {
                        if (_.isEqual(obj, userDashboard)) {
                        } else {
                            setUserDashboard(obj);

                            const data = {};

                            data.axis = "y";
                            data.label = obj.email;
                            data.data = obj.chartdata.map((item) => item.count);
                            data.fill = false;
                            data.backgroundColor = [
                                "rgba(255, 99, 132, 0.2)",
                                "rgba(255, 159, 64, 0.2)",
                                "rgba(255, 205, 86, 0.2)",
                                "rgba(75, 192, 192, 0.2)",
                                "rgba(54, 162, 235, 0.2)",
                                "rgba(153, 102, 255, 0.2)",
                                "rgba(201, 203, 207, 0.2)",
                            ];

                            data.borderColor = [
                                "rgb(255, 99, 132)",
                                "rgb(255, 159, 64)",
                                "rgb(255, 205, 86)",
                                "rgb(75, 192, 192)",
                                "rgb(54, 162, 235)",
                                "rgb(153, 102, 255)",
                                "rgb(201, 203, 207)",
                            ];

                            data.borderWidth = 1;

                            setChartData({
                                labels: obj.chartdata.map(
                                    (item) => item.chatroom
                                ),
                                datasets: [data],
                            });
                        }
                    }
                });
            }, 1000);

            return () => clearInterval(chartInterval);
        }
    }, [currentUser, userDashboard]);

    return currentUser ? (
        <div className="ms-4 d-flex justify-content-center align-items-center rounded shadow p-3">
            <div className="p-2">
                {userDashboard ? (
                    <div>
                        {error}
                        <p className="fs-4">{`Total number of chats: ${userDashboard.logs.nooftotalchats}`}</p>
                        <p className="fs-4">{`Total usage ${
                            Math.round(
                                (userDashboard.logs.totalusage / 3600 +
                                    Number.EPSILON) *
                                    100
                            ) / 100
                        } hrs`}</p>
                    </div>
                ) : (
                    <></>
                )}
            </div>
            <div className="ms-3 p-2">
                {chartData ? <Bar data={chartData} /> : <></>}
            </div>
        </div>
    ) : (
        <></>
    );
}
