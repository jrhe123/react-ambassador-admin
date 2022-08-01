import React, { Dispatch } from "react";
import { Link } from "react-router-dom";
import { User } from "../models/user";
import { connect } from "react-redux";
import axios from "axios";

function Nav({ user }: { user: User | null }) {
  const handleLogout = async () => {
    await axios.post("logout");
  };
  return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#">
        Company name
      </a>

      <div className="navbar-nav">
        <div className="nav-item">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Link className="nav-link px-3" to={"/profile"}>
              {user?.first_name} {user?.last_name}
            </Link>
            <Link
              className="nav-link px-3"
              to={"/login"}
              onClick={handleLogout}
            >
              Sign out
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

const mapStateToProps = (state: { user: User }) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
