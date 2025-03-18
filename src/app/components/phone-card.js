"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { useRouter } from "next/navigation";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const StyledCard = styled(Card)({
  position: "relative",
  overflow: "hidden",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "34px",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },

  "&::before": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "0%",
    backgroundColor: "rgba(0, 0, 0, 1)",
    transition: "height 0.7s ease-in-out",
    zIndex: 0,
  },
  "&:hover::before": {
    height: "100%",
  },
});

const ContentWrapper = styled(Box)({
  width: "100%",
  padding: "12px",
  textAlign: "center",
  position: "relative",
  zIndex: 2,
});

export default function PhoneCard({ phone }) {
  const [textColor, setTextColor] = useState("#000");
  const [brandColor, setBrandColor] = useState("#888");
  const router = useRouter();

  return (
    <Box sx={{ width: "100%", maxWidth: 300 }}>
      <StyledCard
        onMouseEnter={() => {
          setTextColor("#FFF");
          setBrandColor("#FFF");
        }}
        onMouseLeave={() => {
          setTextColor("#000");
          setBrandColor("#888");
        }}
        variant="outlined"
        onClick={() => router.push(`/phone/${phone.id}`)}
      >
        <Grid
          container
          sx={{
            width: "100%",
            position: "relative",
            height: 0,
            paddingBottom: "100%",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2,
            "@media (max-width: 600px)": {
              paddingBottom: "150%",
            },
          }}
        >
          <Grid item xs={12}>
            <img
              src={phone.imageUrl}
              alt="Phone Image"
              style={{
                objectFit: "contain",
                width: "100%",
                height: "auto",
                maxWidth: "80%",
                margin: "0 auto",
                display: "block",
              }}
            />
          </Grid>
        </Grid>

        <ContentWrapper>
          <Typography
            sx={{
              fontSize: "10px",
              color: brandColor,
              textTransform: "uppercase",
              fontWeight: "500",
              textAlign: "left",
              marginBottom: "8px",
            }}
          >
            {phone.brand}
          </Typography>

          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography
                sx={{
                  fontSize: "11px",
                  color: textColor,
                }}
              >
                {phone.name}
              </Typography>
            </Grid>

            <Grid item>
              <Typography
                sx={{
                  fontSize: "11px",
                  color: textColor,
                }}
              >
                {`${phone.basePrice} EUR`}
              </Typography>
            </Grid>
          </Grid>
        </ContentWrapper>
      </StyledCard>
    </Box>
  );
}
