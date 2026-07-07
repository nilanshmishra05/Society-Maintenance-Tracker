import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API, { getUploadsUrl } from "../services/api";

function MyComplaints() {

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

    return (

        <div className="container mt-5">

            <h2 className="mb-4">
                My Complaints
            </h2>

            <div className="card shadow">

                <div className="card-body">

                    <table className="table table-hover">

                        <thead className="table-dark">

                            <tr>

                                <th>Category</th>

                                <th>Description</th>

                                <th>Priority</th>

                                <th>Status</th>

                                <th>Date</th>

                                <th>Image</th>

                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {complaints.map((item) => (

                                <tr key={item._id}>

                                    <td>{item.category}</td>

                                    <td>{item.description}</td>

                                    <td>

                                        <span
                                            className={`badge ${
                                                item.priority === "High"
                                                    ? "bg-danger"
                                                    : item.priority === "Medium"
                                                    ? "bg-warning text-dark"
                                                    : "bg-success"
                                            }`}
                                        >
                                            {item.priority}
                                        </span>

                                    </td>

                                    <td>

                                        <span
                                            className={`badge ${
                                                item.status === "Resolved"
                                                    ? "bg-success"
                                                    : item.status === "In Progress"
                                                    ? "bg-warning text-dark"
                                                    : "bg-danger"
                                            }`}
                                        >
                                            {item.status}
                                        </span>

                                    </td>

                                    <td>
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </td>

                                    <td>

                                        {item.photo ? (

                                            <img
                                                src={getUploadsUrl(item.photo)}
                                                alt="Complaint"
                                                width="60"
                                                height="60"
                                                className="rounded"
                                            />

                                        ) : (

                                            "No Image"

                                        )}

                                    </td>

                                    <td>

                                        <Link
                                            to={`/complaint/${item._id}`}
                                            className="btn btn-primary btn-sm"
                                        >
                                            View
                                        </Link>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default MyComplaints;