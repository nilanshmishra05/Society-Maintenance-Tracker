import { Link } from "react-router-dom";

function Sidebar({ role = "admin" }) {

    return (

        <div
            className="bg-dark text-white p-3"
            style={{
                width: "250px",
                minHeight: "100vh",
            }}
        >

            <h3 className="text-center mb-4">
                Society Tracker
            </h3>

            <ul className="nav flex-column">

                {role === "admin" ? (

                    <>

                        <li className="nav-item mb-2">
                            <Link
                                to="/admin/dashboard"
                                className="nav-link text-white"
                            >
                                📊 Dashboard
                            </Link>
                        </li>

                        <li className="nav-item mb-2">
                            <Link
                                to="/admin/complaints"
                                className="nav-link text-white"
                            >
                                📋 Complaints
                            </Link>
                        </li>

                        <li className="nav-item mb-2">
                            <Link
                                to="/admin/profile"
                                className="nav-link text-white"
                            >
                                👤 Profile
                            </Link>
                        </li>

                    </>

                ) : (

                    <>

                        <li className="nav-item mb-2">
                            <Link
                                to="/resident/dashboard"
                                className="nav-link text-white"
                            >
                                📊 Dashboard
                            </Link>
                        </li>

                        <li className="nav-item mb-2">
                            <Link
                                to="/complaint/create"
                                className="nav-link text-white"
                            >
                                ➕ Create Complaint
                            </Link>
                        </li>

                        <li className="nav-item mb-2">
                            <Link
                                to="/complaints"
                                className="nav-link text-white"
                            >
                                📋 My Complaints
                            </Link>
                        </li>

                        <li className="nav-item mb-2">
                            <Link
                                to="/resident/profile"
                                className="nav-link text-white"
                            >
                                👤 Profile
                            </Link>
                        </li>

                    </>

                )}

                <li className="nav-item">
                    <Link
                        to="/"
                        className="nav-link text-danger"
                    >
                        🚪 Logout
                    </Link>
                </li>

            </ul>

        </div>

    );
}

export default Sidebar;