import { Helmet } from "react-helmet";
import React, { useEffect, useState } from "react";
import CustomBtn from "components/CustomBtn";
import { Box, Typography } from "@mui/material";
import Logo from "components/Logo";
import axiosInstance from "api/http";
import AlertModal from "components/Modal";
import { useToken } from "context";

interface ProfileInfo {
  data: {
    fullname: string;
  };
}

const Profile = () => {
  const [profileInfo, setProfileInfo] = useState<ProfileInfo | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [completeStep, setCompleteStep] = useState(0);
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);
  const [concatenatedResult, serConcatenatedResult] = useState("");
  const { token } = useToken();

  useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
        const response = await axiosInstance.get(`/profile?${token}`);
        if (response.status === 200 && response.data.success) {
          setProfileInfo(response.data);
        }
      } catch (error) {
        console.error("Error when retrieving company information:", error);
      }
    };

    fetchProfileInfo();
  }, []);

  const handleRequestData = async () => {
    const controller = new AbortController();
    setAbortController(controller);
    try {
      setIsOpen(true);
      setCompleteStep(0);
      const authorResponse = await axiosInstance.get(`/author?${token}`, {
        signal: controller.signal,
      });
      setCompleteStep(1);
      const authorName = authorResponse.data.data.name;
      const quoteResponse = await axiosInstance.get(`/quote?${token}`, {
        signal: controller.signal,
      });
      setCompleteStep(2);
      const quote = quoteResponse.data.data.quote;
      serConcatenatedResult(authorName + " : " + quote);
    } catch (error) {
      console.error("Error:", error);
      setCompleteStep(0);
    }
  };

  const handleCancelRequest = () => {
    if (abortController) {
      abortController.abort();
    }
  };

  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <Box mt={4} display="flex">
        <Logo imageUrl="logo.png" />
        <Box ml={4}>
          <Typography variant="h3">
            Welcome, {profileInfo?.data.fullname}!
          </Typography>
          <CustomBtn
            onClick={handleRequestData}
            text="Update"
            variant="contained"
          />
        </Box>
      </Box>
      {concatenatedResult && (
        <Typography mt={2} variant="h5">
          {concatenatedResult}
        </Typography>
      )}
      <AlertModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        completeStep={completeStep}
        handleCancelRequest={handleCancelRequest}
      />
    </>
  );
};

export default Profile;
