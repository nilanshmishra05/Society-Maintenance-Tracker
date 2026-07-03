import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function ResidentLayout() {

    return (

        <div className="d-flex">

            <Sidebar role="resident" />

            <div className="flex-grow-1 bg-light">

                <Navbar />

                <div className="p-4">

                    <Outlet />

                </div>

            </div>

        </div>

    );

}

export default ResidentLayout;