import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function ResidentDashboard() {

    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {

        try {

            const res = await API.get("/complaints/my");

            setComplaints(res.data.complaints);

        } catch (error) {

            console.log(error);

        }

    };

    const total = complaints.length;

    const open = complaints.filter(
        c => c.status === "Open"
    ).length;

    const resolved = complaints.filter(
        c => c.status === "Resolved"
    ).length;

    return (

        <div className="container mt-5">

            <h2 className="mb-4">

                Welcome Resident 👋

            </h2>

            <div className="row">

                <div className="col-md-4 mb-3">

                    <div className="card bg-primary text-white shadow">

                        <div className="card-body text-center">

                            <h5>Total Complaints</h5>

                            <h2>{total}</h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-4 mb-3">

                    <div className="card bg-warning shadow">

                        <div className="card-body text-center">

                            <h5>Open</h5>

                            <h2>{open}</h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-4 mb-3">

                    <div className="card bg-success text-white shadow">

                        <div className="card-body text-center">

                            <h5>Resolved</h5>

                            <h2>{resolved}</h2>

                        </div>

                    </div>

                </div>

            </div>

            <div className="mb-4">

                <Link
                    to="/complaint/create"
                    className="btn btn-primary"
                >

                    + Create Complaint

                </Link>

            </div>

            <div className="card shadow">

                <div className="card-header bg-dark text-white">

                    <h5 className="mb-0">

                        My Recent Complaints

                    </h5>

                </div>

                <div className="card-body">

                    <table className="table table-hover">

                        <thead>

                            <tr>

                                <th>Category</th>

                                <th>Priority</th>

                                <th>Status</th>

                                <th>Date</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                complaints.slice(0,5).map(item => (

                                    <tr key={item._id}>

                                        <td>{item.category}</td>

                                        <td>{item.priority}</td>

                                        <td>{item.status}</td>

                                        <td>

                                            {new Date(item.createdAt).toLocaleDateString()}

                                        </td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default ResidentDashboard;