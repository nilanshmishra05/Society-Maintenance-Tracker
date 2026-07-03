import { useEffect, useState } from "react";

function Profile() {

    const [user, setUser] = useState({});

    useEffect(() => {

        const userData = JSON.parse(localStorage.getItem("user"));

        if (userData) {

            setUser(userData);

        }

    }, []);

    return (

        <div className="container mt-5">

            <div className="card shadow">

                <div className="card-header bg-primary text-white">

                    <h3 className="mb-0">
                        👤 My Profile
                    </h3>

                </div>

                <div className="card-body">

                    <table className="table table-bordered">

                        <tbody>

                            <tr>
                                <th width="200">Name</th>
                                <td>{user.name || "N/A"}</td>
                            </tr>

                            <tr>
                                <th>Email</th>
                                <td>{user.email || "N/A"}</td>
                            </tr>

                            <tr>
                                <th>Role</th>
                                <td>
                                    <span
                                        className={`badge ${
                                            user.role === "admin"
                                                ? "bg-danger"
                                                : "bg-success"
                                        }`}
                                    >
                                        {user.role || "Resident"}
                                    </span>
                                </td>
                            </tr>

                        </tbody>

                    </table>

                    <div className="mt-4">

                        <button
                            className="btn btn-secondary"
                            disabled
                        >
                            Edit Profile (Coming Soon)
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Profile;