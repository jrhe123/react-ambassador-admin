import React, { Dispatch, FC, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Menu from "../components/Menu";
import Nav from "../components/Nav";
import axios from "axios";
import { User } from "../models/user";
import { connect } from "react-redux";
import { setUser } from "../redux/actions/setUserAction";

interface LayoutProps {
  children: React.ReactNode;
  setUserDispatch: (user: User) => void;
}

const Layout: FC<LayoutProps> = ({ children, setUserDispatch }) => {
  const [redirect, setRedirect] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("user");
        setUserDispatch(response.data);
      } catch (error) {
        setRedirect(true);
      }
    })();
  }, []);

  if (redirect) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <Nav />
      <div className="container-fluid">
        <div className="row">
          <Menu />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="table-responsive">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: { user: User }) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  setUserDispatch: (user: User) => dispatch(setUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
