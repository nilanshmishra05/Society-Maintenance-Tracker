import { useEffect, useState } from "react";

import API from "../services/api";
import StatusPieChart from "../components/StatusPieChart";
import PriorityBarChart from "../components/PriorityBarChart";


function AdminDashboard() {

    const [dashboard, setDashboard] = useState({
        totalComplaints: 0,
        openComplaints: 0,
        progressComplaints: 0,
        resolvedComplaints: 0,
        highPriority: 0,
        mediumPriority: 0,
        lowPriority: 0,
    });

    const [recentComplaints, setRecentComplaints] = useState([]);
    const [highAlerts, setHighAlerts] = useState([]);

    useEffect(() => {

    fetchDashboard();

    fetchRecentComplaints();

    const interval = setInterval(() => {

        fetchDashboard();

        fetchRecentComplaints();

    }, 15000);

    return () => clearInterval(interval);

}, []);
    const fetchDashboard = async () => {
        try {

            const res = await API.get("/admin/dashboard");

            console.log("Dashboard Response:", res.data);

            setDashboard(res.data.dashboard);

        } catch (error) {

            console.log(error);

        }
    };

    const fetchRecentComplaints = async () => {

    try {

        const res = await API.get("/complaints");

        const latest = res.data.complaints
            .sort(
                (a, b) =>
                    new Date(b.createdAt) -
                    new Date(a.createdAt)
            )
            .slice(0, 5);

        setRecentComplaints(latest);

const alerts = res.data.complaints.filter(
    item =>
        item.priority === "High" &&
        item.status !== "Resolved"
);

setHighAlerts(alerts);
    } catch (error) {

        console.log(error);

    }

};
    console.log("Dashboard State:", dashboard);

    return (

        <div className="container mt-5">

            <h2 className="mb-4">
                Admin Dashboard
            </h2>
            <div className="mb-3">

    <button
    className="btn btn-primary"
    onClick={() => {
        console.log("Refresh Clicked");

        fetchDashboard();

        fetchRecentComplaints();
    }}
>
    🔄 Refresh Dashboard
</button>

</div>
            {highAlerts.length > 0 && (

<div className="alert alert-danger shadow mb-4">

    <h5>🚨 High Priority Alerts</h5>

    <ul className="mb-0">

        {highAlerts.map(item => (

            <li key={item._id}>

                <b>{item.resident?.name}</b>

                {" - "}

                {item.category}

                {" - "}

                {item.description}

            </li>

        ))}

    </ul>

</div>

)}

            {/* Dashboard Cards */}

            <div className="row">

                <div className="col-md-3 mb-3">
                    <div className="card bg-primary text-white shadow">
                        <div className="card-body text-center">
                            <h5>Total Complaints</h5>
                            <h2>{dashboard.totalComplaints}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="card bg-danger text-white shadow">
                        <div className="card-body text-center">
                            <h5>Open</h5>
                            <h2>{dashboard.openComplaints}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="card bg-warning shadow">
                        <div className="card-body text-center">
                            <h5>In Progress</h5>
                            <h2>{dashboard.progressComplaints}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="card bg-success text-white shadow">
                        <div className="card-body text-center">
                            <h5>Resolved</h5>
                            <h2>{dashboard.resolvedComplaints}</h2>
                        </div>
                    </div>
                </div>

            </div>

            {/* Priority Cards */}

            <div className="row mt-4">

                <div className="col-md-4 mb-3">
                    <div className="card border-danger shadow">
                        <div className="card-body text-center">
                            <h5>High Priority</h5>
                            <h2>{dashboard.highPriority}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card border-warning shadow">
                        <div className="card-body text-center">
                            <h5>Medium Priority</h5>
                            <h2>{dashboard.mediumPriority}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card border-success shadow">
                        <div className="card-body text-center">
                            <h5>Low Priority</h5>
                            <h2>{dashboard.lowPriority}</h2>
                        </div>
                    </div>
                </div>

            </div>

           <div className="row mt-5">
  <div className="col-md-6 mb-4">
    <StatusPieChart dashboard={dashboard} />
  </div>

  <div className="col-md-6 mb-4">
    <PriorityBarChart dashboard={dashboard} />
  </div>
  <div className="card shadow mt-5">

    <div className="card-header bg-dark text-white">

        <h5 className="mb-0">

            Recent Complaints

        </h5>

    </div>

    <div className="card-body">

        <table className="table table-hover">

            <thead>

                <tr>

                    <th>Resident</th>

                    <th>Category</th>

                    <th>Status</th>

                    <th>Priority</th>

                    <th>Date</th>

                </tr>

            </thead>

            <tbody>

                {

                    recentComplaints.map((item) => (

                        <tr key={item._id}>

                            <td>{item.resident?.name}</td>

                            <td>{item.category}</td>

                            <td>

                                <span className="badge bg-warning text-dark">

                                    {item.status}

                                </span>

                            </td>

                            <td>

                                <span className="badge bg-danger">

                                    {item.priority}

                                </span>

                            </td>

                            <td>

                                {new Date(
                                    item.createdAt
                                ).toLocaleDateString()}

                            </td>

                        </tr>

                    ))

                }

            </tbody>

        </table>

    </div>

</div>
</div>
        </div>

    );
}

export default AdminDashboard;