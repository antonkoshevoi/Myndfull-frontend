import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";

const LoadingDots = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev === "..." ? "" : prev + "."));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <Typography variant="body1" component="span">
      {dots}
    </Typography>
  );
};

export default LoadingDots;
