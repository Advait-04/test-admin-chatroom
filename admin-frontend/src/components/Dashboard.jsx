const Dashboard = ({ dashboardItem }) => {
    // console.log(dashboardItem);
    const { concurrentusers, topuser, bottomuser } = dashboardItem;

    return (
        <div className="dashboard-main">
            <div className="active-users">
                <p className="mb-1">active users:</p>
                <div className="mx-3">
                    {concurrentusers.map((user) => (
                        <p key={user} className="text-primary">
                            {user}
                        </p>
                    ))}
                </div>
            </div>
            <div className="top-user">
                <p className="mb-1">mostly user by:</p>
                <p className="mx-3">
                    <span className="text-primary">{`${topuser.user} `}</span>
                    for
                    <span className="text-success">{` ${topuser.usage} `}</span>
                    hrs
                </p>
            </div>
            <div className="least-user">
                <p className="mb-1">least user by:</p>
                <p className="mx-3">
                    <span className="text-primary">{`${bottomuser.user} `}</span>
                    for
                    <span className="text-danger">{` ${bottomuser.usage} `}</span>
                    hrs
                </p>
            </div>
        </div>
    );
};

export default Dashboard;
