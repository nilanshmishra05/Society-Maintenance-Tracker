import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const loginUser = async () => {

        try {

            const res = await API.post("/auth/login", {

                email,

                password

            });

            localStorage.setItem("token", res.data.token);

            localStorage.setItem("user", JSON.stringify(res.data.user));

            alert("Login Successful");

            if (res.data.user.role === "admin") {

                navigate("/admin/dashboard");

            } else {

                navigate("/resident/dashboard");

            }

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Login Failed"

            );

        }

    };

    return (

        <div className="container">

            <div className="row justify-content-center mt-5">

                <div className="col-md-5">

                    <div className="card shadow p-4">

                        <h2 className="text-center mb-4">

                            Society Maintenance Login

                        </h2>

                        <input

                            className="form-control mb-3"

                            placeholder="Email"

                            value={email}

                            onChange={(e)=>setEmail(e.target.value)}

                        />

                        <input

                            type="password"

                            className="form-control mb-3"

                            placeholder="Password"

                            value={password}

                            onChange={(e)=>setPassword(e.target.value)}

                        />

                        <button

                            className="btn btn-primary w-100"

                            onClick={loginUser}

                        >

                            Login

                        </button>
                        <div className="text-center mt-3">
                            <p className="mb-1">
                                Don't have an account?
                            </p>
                            <Link
                                to="/register"
                                className="text-decoration-none fw-bold me-2"
                            >
                                Register Here
                            </Link>
                            <span className="text-muted">|</span>
                            <Link
                                to="/forgot-password"
                                className="text-decoration-none fw-bold ms-2"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Login;