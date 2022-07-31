import React, { FC, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Menu from "../components/Menu";
import Nav from "../components/Nav";
import axios from "axios";
import { User } from "../models/user";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [redirect, setRedirect] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("user");
        setUser(response.data);
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
      <Nav user={user} />
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

export default Layout;
