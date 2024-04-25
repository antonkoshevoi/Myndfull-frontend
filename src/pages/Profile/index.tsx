import { Helmet } from "react-helmet";
import React, { useEffect, useRef, useState } from "react";
import CustomBtn from "components/CustomBtn";
import { Box, Typography } from "@mui/material";
import Logo from "components/Logo";
import axiosInstance from "api/http";
import AlertModal from "components/Modal";
import { useToken } from "context";
import { SuccessResponse } from "types/common";
import { randomIntFromInterval } from "utils/randomIntFromInterval";
import { randomArrayElement } from "utils/randomArrayElement";

interface ProfileInfo {
  fullname: string;
  email: string;
}

interface Quote {
  quoteId: number;
  authorId: number;
  quote: string;
}

interface Author {
  authorId: number;
  name: string;
}

const Profile = () => {
  const [profileInfo, setProfileInfo] = useState<ProfileInfo | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [completeStep, setCompleteStep] = useState(0);
  const abortController = useRef<AbortController | null>(null);
  const [concatenatedResult, serConcatenatedResult] = useState("");
  const { token } = useToken();

  useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
        const response = await axiosInstance.get<SuccessResponse<ProfileInfo>>(
          `/profile?${token}`,
        );
        if (response.data.success) {
          setProfileInfo(response.data.data);
        }
      } catch (error) {
        console.error("Error when retrieving company information:", error);
      }
    };

    fetchProfileInfo();
  }, []);

  const handleRequestData = async () => {
    const controller = new AbortController();
    abortController.current = controller;

    try {
      setIsOpen(true);
      setCompleteStep(0);

      const authorResponse = await axiosInstance.get<SuccessResponse<Author[]>>(
        `/author?${token}`,
        {
          signal: controller.signal,
        },
      );

      const randomAuthor = randomArrayElement(authorResponse.data.data);
      const authorName = randomAuthor.name;

      setCompleteStep(1);

      const quoteResponse = await axiosInstance.get<SuccessResponse<Quote[]>>(
        `/quote?${token}`,
        {
          signal: controller.signal,
        },
      );

      const filterQuote = quoteResponse.data.data.filter(
        (quote) => quote.authorId === randomAuthor.authorId,
      );
      const randomQuote = randomArrayElement(filterQuote);
      serConcatenatedResult(authorName + " : " + randomQuote.quote);

      setCompleteStep(2);
    } catch (error) {
      console.error("Error:", error);
      setCompleteStep(0);
    }
  };

  const handleCancelRequest = () => {
    if (abortController.current) {
      abortController.current.abort();
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
            Welcome, {profileInfo?.fullname}!
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
