import React, { useCallback, useState } from "react";

import axios from "axios";

import Snackbar from "@mui/material/Snackbar";
import Header from "./Header";

import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Signup() {
  const [memberType, setMemberType] = useState("regular");
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState({ m: "", t: "" });
  console.log(memberType);

  const registerApi = (body) => {
    return axios.post("/api/register", body, {
      baseURL: "http://localhost:3000",
    });
  };

  const onsignup = useCallback(async (event, values) => {
    event.preventDefault();
    console.log({ event, values: event.target.uName.value });
    const data = event.target;
    const body = {
      username: data.uName.value,
      firstName: data.firstName.value,
      lastName: data.lastName.value,
      email: data.email.value,
      phone: data.phone.value,
      password: data.pWord.value,
      role: memberType,
    };

    try {
      const res = await registerApi(body);
      console.log(res)
      setMsg({ m: res.data.message, t: "success" });
      setOpen(true);
    } catch (e) {
      setMsg({ m: e.response.data.error, t: "error" });
      setOpen(true);
    }
  }, []);
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="auth-container">
        <h2>Sign Up for Movie Theatre</h2>
        <form onSubmit={onsignup}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="auth-input"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="auth-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="auth-input"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="auth-input"
          />
          <input
            type="text"
            name="uName"
            placeholder="Username"
            className="auth-input"
          />
          <input
            type="password"
            name="pWord"
            placeholder="Password"
            className="auth-input"
          />

          <div className="membership-type">
            <label>Membership Type: </label>
            <select
              className="auth-select"
              value={memberType}
              onChange={(newVal) => setMemberType(newVal.target.value)}
            >
              <option value="regular">Regular</option>
              <option value="premium">Premium</option>
            </select>
          </div>

          <button className="auth-button">Sign Up</button>
        </form>
        <div className="additional-info">
          Already have an account? <a href="/login">Login</a>
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        message={msg}
        // action={action}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={msg.t}
          sx={{ width: "100%" }}
        >
          {msg.m}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Signup;
