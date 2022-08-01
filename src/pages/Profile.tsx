import React, { SyntheticEvent, useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import Layout from "../components/Layout";
import axios from "axios";

interface infoFormProps {
  firstName: string;
  lastName: string;
  email: string;
}

interface pwdFormProps {
  password: string;
  passwordConfirm: string;
}

function Profile() {
  const [infoForm, setInfoForm] = useState<infoFormProps>({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [pwdForm, setPwdForm] = useState<pwdFormProps>({
    password: "",
    passwordConfirm: "",
  });

  useEffect(() => {
    (async () => {
      const response = await axios.get("user");
      const data = response.data;
      setInfoForm({
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
      });
    })();
  }, []);

  const handleInfoFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfoForm({
      ...infoForm,
      [e.target.name]: e.target.value,
    });
  };

  const handlePwdFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwdForm({
      ...pwdForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitInfoForm = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.put("users/info", {
      first_name: infoForm.firstName,
      last_name: infoForm.lastName,
      email: infoForm.email,
    });
  };

  const handleSubmitPwdForm = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.put("users/password", {
      password: pwdForm.password,
      password_confirm: pwdForm.passwordConfirm,
    });
    setPwdForm({
      password: "",
      passwordConfirm: "",
    });
  };

  return (
    <Layout>
      <h3>Account Information</h3>
      <form onSubmit={handleSubmitInfoForm}>
        <div className="mb-3">
          <TextField
            label="First Name"
            name="firstName"
            value={infoForm.firstName}
            onChange={handleInfoFormChange}
          />
        </div>
        <div className="mb-3">
          <TextField
            label="Last Name"
            name="lastName"
            value={infoForm.lastName}
            onChange={handleInfoFormChange}
          />
        </div>
        <div className="mb-3">
          <TextField
            label="Email"
            name="email"
            value={infoForm.email}
            onChange={handleInfoFormChange}
          />
        </div>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>

      <h3 className="mt-4">Change Password</h3>
      <form onSubmit={handleSubmitPwdForm}>
        <div className="mb-3">
          <TextField
            label="Password"
            type="password"
            name="password"
            value={pwdForm.password}
            onChange={handlePwdFormChange}
          />
        </div>
        <div className="mb-3">
          <TextField
            label="Password Confirm"
            type="password"
            name="passwordConfirm"
            value={pwdForm.passwordConfirm}
            onChange={handlePwdFormChange}
          />
        </div>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </Layout>
  );
}

export default Profile;
