import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "../../myredux/reducers/AdminSlice";
import { MdAdminPanelSettings } from "react-icons/md";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./AdminLogin.css";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const loading = useSelector((state) => state.adminlogin.loading);
  const isAdminLogin = useSelector((state) => state.adminlogin.isAdminLogin);

  const handleSubmit = (event) => {
    event.preventDefault();
    const adminCredentials = { mobile, password };
    dispatch(loginAdmin(adminCredentials, navigate));
  };

  const handleGuestLogin = () => {
    const guestCredentials = {
      mobile: "9964517148",
      password: "harish_med@123",
    };
    dispatch(loginAdmin(guestCredentials, navigate));
  };

  useEffect(() => {
    if (isAdminLogin === true) {
      navigate("/adminpage");
    }
  }, [isAdminLogin, navigate]);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  return (
    <div id="adminlogin">
      <div className="adminform">
        <div className="heading">
          <h1>
            Admin<span id="login">Login</span>
            <span id="admin-icon">
              <MdAdminPanelSettings />
            </span>
          </h1>
        </div>
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <TextField
                label="Mobile"
                type="text"
                name="mobile"
                id="mobile"
                variant="outlined"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                fullWidth
                required
                placeholder="Enter your mobile number"
              />
            </div>
            <div className="form-group">
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
                placeholder="Enter your password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility />: <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <Button
              id="loginbtn"
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
            <p id="credentials">
              <span id="note">Note:</span> Mobile: 9964517148 and Password:
              harish_med@123
            </p>
          </form>
          <div>
            <Button
              type="button"
              id="guestButton"
              onClick={handleGuestLogin}
              variant="contained"
              color="primary"
              fullWidth
            >
              Continue as Guest
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
