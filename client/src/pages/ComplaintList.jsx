import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function ComplaintDetails() {

    const [complaints, setComplaints] = useState([]);
    const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("");
const [priorityFilter, setPriorityFilter] = useState("");

    useEffect(() => {
        toast.success("Status Updated");
fetchComplaints();
    }, []);

    const fetchComplaints = async () => {

        try {

            const res = await API.get("/complaints");

            setComplaints(res.data.complaints);

        } catch (error) {

            console.log(error);

        }

    };
    
    const updateStatus = async (id, status) => {

    try {

        await API.put(`/complaints/${id}/status`, {
            status,
        });

        toast.success("Status Updated Successfully");
fetchComplaints();

    } catch (error) {

        console.log(error);

    }

};

const updatePriority = async (id, priority) => {

    try {

        await API.put(`/complaints/${id}/priority`, {
            priority,
        });

        toast.success("Priority Updated");
fetchComplaints();

    } catch (error) {

        console.log(error);

    }

};


    return (

        <div className="container mt-5">

            <h2 className="mb-4">
                All Complaints
            </h2>

            

<div className="row mb-3">

    <div className="col-md-4">

        <input
    type="text"
    className="form-control"
    placeholder="Search Resident..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
/>

    </div>

    <div className="col-md-3">

        <select
    className="form-select"
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
>

    <option value="">All Status</option>
    <option value="Open">Open</option>
    <option value="In Progress">In Progress</option>
    <option value="Resolved">Resolved</option>

</select>

    </div>

    <div className="col-md-3">

        <select
    className="form-select"
    value={priorityFilter}
    onChange={(e) => setPriorityFilter(e.target.value)}
>

    <option value="">All Priority</option>
    <option value="Low">Low</option>
    <option value="Medium">Medium</option>
    <option value="High">High</option>

</select>

    </div>

</div>

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

<tr>

<th>Resident</th>

<th>Category</th>

<th>Description</th>

<th>Priority</th>

<th>Status</th>

<th>Created</th>

<th>Photo</th>

<th>Action</th>

</tr>

</thead>

                <tbody>

                    {
                       complaints
.filter((item) => {

    const residentMatch =
        item.resident?.name
            .toLowerCase()
            .includes(search.toLowerCase());

    const statusMatch =
        statusFilter === "" ||
        item.status === statusFilter;

    const priorityMatch =
        priorityFilter === "" ||
        item.priority === priorityFilter;

    return (
        residentMatch &&
        statusMatch &&
        priorityMatch
    );

})
.map((item) => (

                            <tr key={item._id}>

                                <td>{item.resident?.name}</td>

                                <td>{item.category}</td>

                                <td>{item.description}</td>

                                <td>
    <select
        value={item.priority}
        onChange={(e) =>
            updatePriority(item._id, e.target.value)
        }
        className="form-select"
    >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
    </select>
</td>

<td>
    <select
        value={item.status}
        onChange={(e) =>
            updateStatus(item._id, e.target.value)
        }
        className="form-select"
    >
        <option>Open</option>
        <option>In Progress</option>
        <option>Resolved</option>
    </select>
</td>

<td>
    {new Date(item.createdAt).toLocaleDateString()}
</td>

<td>

    {item.photo ? (

        <img
            src={`http://localhost:5000/uploads/${item.photo}`}
            alt="Complaint"
            width="60"
            height="60"
            className="rounded"
        />

    ) : (

        <span>No Image</span>

    )}

</td>

<td>

    <Link
    to={`/admin/complaints/${item._id}`}
    className="btn btn-primary btn-sm"
>
    View
</Link>

</td>

                                

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </div>

    );

}

export default ComplaintDetails;