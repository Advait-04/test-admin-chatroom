import { useEffect, useState } from "react";

import { useChatroomDashboard } from "../hooks/useChatroomDashboard";

import { chatroomDashboardAtom } from "../utils/jotai";

import { useAtom } from "jotai";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import _ from "lodash";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ChatroomChart({ currentChatroom }) {
    const { error, isLoading, getChatroomDashboard } = useChatroomDashboard();

    const [chartData, setChartData] = useState();
    const [chatroomDashboard, setChatroomDashboard] = useAtom(
        chatroomDashboardAtom
    );
    const [render, setRender] = useState(true);

    useEffect(() => {
        if (currentChatroom) {
            const chartInterval = setInterval(() => {
                getChatroomDashboard(currentChatroom).then((obj) => {
                    if (
                        _.isEqual(
                            obj.logs.topuser,
                            chatroomDashboard.logs.topuser
                        ) &&
                        _.isEqual(
                            obj.logs.bottomuser,
                            chatroomDashboard.logs.bottomuser
                        ) &&
                        _.isEqual(
                            obj.logs.totalchats,
                            chatroomDashboard.logs.totalchats
                        )
                    ) {
                    } else {
                        setChatroomDashboard(obj);

                        const data = {};
                        data.label = "message count";

                        data.data = obj.messageCount.map((item) => {
                            return item.count;
                        });

                        data.backgroundColor = [
                            "rgba(255, 99, 132, 0.2)",
                            "rgba(54, 162, 235, 0.2)",
                            "rgba(255, 206, 86, 0.2)",
                            "rgba(75, 192, 192, 0.2)",
                            "rgba(153, 102, 255, 0.2)",
                            "rgba(255, 159, 64, 0.2)",
                        ];

                        data.borderColor = [
                            "rgba(255, 99, 132, 1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(255, 206, 86, 1)",
                            "rgba(75, 192, 192, 1)",
                            "rgba(153, 102, 255, 1)",
                            "rgba(255, 159, 64, 1)",
                        ];

                        data.borderWidth = 1;

                        setChartData({
                            labels: obj.messageCount.map((item) => {
                                return item._id;
                            }),
                            datasets: [data],
                        });
                    }
                });
            }, 1000);

            return () => clearInterval(chartInterval);
        }
    }, [currentChatroom, chatroomDashboard]);

    useEffect(() => {}, [chatroomDashboard]);

    return currentChatroom ? (
        <div className="ms-4 d-flex justify-content-center align-items-center rounded shadow p-3">
            <div>
                {chatroomDashboard.logs.totalchats !== "" ? (
                    <p className="fs-3 m-0">{`Total chats: ${chatroomDashboard.logs.totalchats}`}</p>
                ) : (
                    <></>
                )}
            </div>
            <div className="ms-3 p-2">
                {chartData ? (
                    <Pie data={chartData} options={{ responsive: true }} />
                ) : (
                    <></>
                )}
            </div>
        </div>
    ) : (
        <></>
    );
}
