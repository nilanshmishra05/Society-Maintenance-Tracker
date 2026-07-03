import { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CreateComplaint() {

    const navigate = useNavigate();

    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState(null);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const formData = new FormData();

            formData.append("category", category);
            formData.append("description", description);

            if (photo) {
                formData.append("photo", photo);
            }

            await API.post(
                "/complaints",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            toast.success("Complaint Created Successfully");

            navigate("/complaints");

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to create complaint"
            );

        }

    };

    return (

        <div className="container mt-5">

            <div className="card shadow">

                <div className="card-header bg-primary text-white">

                    <h3>Create Complaint</h3>

                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">

                            <label className="form-label">
                                Category
                            </label>

                            <select
                                className="form-select"
                                value={category}
                                onChange={(e) =>
                                    setCategory(e.target.value)
                                }
                                required
                            >
                                <option value="">
                                    Select Category
                                </option>

                                <option>Electrical</option>
                                <option>Water</option>
                                <option>Road</option>
                                <option>Security</option>
                                <option>Cleaning</option>
                                <option>Other</option>

                            </select>

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Description
                            </label>

                            <textarea
                                className="form-control"
                                rows="4"
                                value={description}
                                onChange={(e) =>
                                    setDescription(e.target.value)
                                }
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Upload Photo
                            </label>

                            <input
                                type="file"
                                className="form-control"
                                onChange={(e) =>
                                    setPhoto(e.target.files[0])
                                }
                            />

                        </div>

                        <button
                            className="btn btn-primary"
                            type="submit"
                        >
                            Submit Complaint
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default CreateComplaint;