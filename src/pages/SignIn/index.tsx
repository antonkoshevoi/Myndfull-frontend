import React, { useState } from "react";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { Helmet } from "react-helmet";
import CustomBtn from "components/CustomBtn";
import axiosInstance from "api/http";
import { useNavigate } from "react-router-dom";
import { useToken } from "context";
import { validateEmail } from "utils/validateEmail";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { setToken } = useToken();

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      setError(true);
      setErrorMessage("Enter a valid email address");
      return;
    }

    setError(false);

    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      if (response.data.success) {
        const token = response.data.data.token;
        setToken(token);
        navigate("/profile");
      } else {
        setError(true);
        setErrorMessage(response.data.data.message);
        console.error("Login failed:", response.data.data.message);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Box mt={3} sx={{ maxWidth: "500px" }}>
      <Helmet>
        <title>Sign in</title>
      </Helmet>
      <Grid container spacing={2} direction="column">
        <Grid item>
          <Typography>Email address</Typography>
          <TextField
            fullWidth
            hiddenLabel
            size="small"
            id="email"
            error={error}
            helperText={
              error
                ? errorMessage
                : "We'll never share your email with anyone else."
            }
            variant="outlined"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item>
          <Typography>Password</Typography>
          <TextField
            type="password"
            fullWidth
            hiddenLabel
            size="small"
            id="password"
            variant="outlined"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item>
          <CustomBtn onClick={handleLogin} variant="contained" text="Submit" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignIn;
