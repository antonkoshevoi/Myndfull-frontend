import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Box, Typography } from "@mui/material";
import axiosInstance from "api/http";
import { SuccessResponse } from "types/common";

interface CompanyInfo {
  story: string;
}

const AboutPage = () => {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const response =
          await axiosInstance.get<SuccessResponse<CompanyInfo>>("/info");
        if (response.data.success) {
          setCompanyInfo(response.data.data);
        }
      } catch (error) {
        console.error("Error when retrieving company information:", error);
      }
    };

    fetchCompanyInfo();
  }, []);

  return (
    <Box>
      <Helmet>
        <title>About us</title>
      </Helmet>
      <Box sx={{ width: "100%", marginTop: "40px" }}>
        {companyInfo ? (
          <Typography variant="h2" gutterBottom>
            {companyInfo.story}
          </Typography>
        ) : (
          <Typography>Loading...</Typography>
        )}
      </Box>
    </Box>
  );
};

export default AboutPage;
