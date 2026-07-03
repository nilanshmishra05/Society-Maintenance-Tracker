function Navbar() {

    const user = JSON.parse(localStorage.getItem("user"));

    return (

        <nav className="navbar navbar-light bg-white shadow-sm px-4">

            <h4>
                Welcome,
                {" "}
                {user?.name}
            </h4>

            <span className="badge bg-primary fs-6">
                {user?.role}
            </span>

        </nav>

    );

}

export default Navbar;