import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API, { getUploadsUrl } from "../services/api";
import { Link } from "react-router-dom";

function ComplaintView() {

    const { id } = useParams();

    const [complaint, setComplaint] = useState(null);

    const [history, setHistory] = useState([]);

    useEffect(() => {

        fetchComplaint();

    }, []);

    const fetchComplaint = async () => {

        try {

            const res = await API.get(`/complaints/${id}`);

            setComplaint(res.data.complaint);

            setHistory(res.data.history);

        }

        catch (error) {

            console.log(error);

        }

    };

    if (!complaint) {

        return <h3 className="text-center mt-5">Loading...</h3>;

    }

    return (

        <div className="container mt-5">

            <Link
    to="/admin/complaints"
    className="btn btn-secondary mb-3"
>
    ← Back to Complaints
</Link>

            <h2 className="mb-4">

                Complaint Details

            </h2>

            <div className="card shadow p-4">

                <h5>

                    Resident :
                    {" "}
                    {complaint.resident.name}

                </h5>

                <hr />

                <p>

                    <b>Category :</b>
                    {" "}
                    {complaint.category}

                </p>

                <p>

                    <b>Description :</b>
                    {" "}
                    {complaint.description}

                </p>

                <p>
    <b>Priority :</b>

    <span
        className={`badge ms-2 ${
            complaint.priority === "High"
                ? "bg-danger"
                : complaint.priority === "Medium"
                ? "bg-warning text-dark"
                : "bg-success"
        }`}
    >
        {complaint.priority}
    </span>

</p>

                <p>
    <b>Status :</b>

    <span
        className={`badge ms-2 ${
            complaint.status === "Resolved"
                ? "bg-success"
                : complaint.status === "In Progress"
                ? "bg-warning text-dark"
                : "bg-danger"
        }`}
    >
        {complaint.status}
    </span>

</p>

                <p>

                    <b>Created :</b>
                    {" "}
                    {new Date(complaint.createdAt).toLocaleString()}

                </p>

                <hr />

                <h5>

                    Complaint Image

                </h5>

                {

                    complaint.photo ?

                    (

                        <img

                            src={getUploadsUrl(complaint.photo)}

                            alt="Complaint"

                            width="250"

                        />

                    )

                    :

                    (

                        <p>No Image Uploaded</p>

                    )

                }

                <hr />

                <h5>

                    Complaint History

                </h5>

                {

                    history.map((item) => (

                        <div
    key={item._id}
    className="card shadow-sm mb-3"
>

    <div className="card-body">

                            <b>Status :</b>
                            {" "}
                            {item.status}

                            <br />

                            <b>By :</b>
                            {" "}
                            {item.actor?.name}

                            <br />

                            <b>Note :</b>
                            {" "}
                            {item.note}

                            <br />

                            <b>Date :</b>
                            {" "}
                            {new Date(item.createdAt).toLocaleString()}

                        </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default ComplaintView;