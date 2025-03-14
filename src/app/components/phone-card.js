import React, { useState } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const StyledCard = styled(Card)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  cursor: "pointer",
  "&::before": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "0%" /* Start hidden */,
    backgroundColor: "rgba(0, 0, 0, 1)" /* Semi-transparent black */,
    transition: "height 0.3s ease-in-out",
    zIndex: 1 /* Behind the image and text */,
  },
  "&:hover::before": {
    height: "100%" /* Expand to cover the card */,
  },
}));

const ContentWrapper = styled(Box)({
  position: "relative",
  zIndex: 2 /* Above the overlay */,
  padding: "16px",
});

export default function PhoneCard({ phone }) {
  const [textColor, setTextColor] = useState("#000");
  const router = useRouter();

  return (
    <Box sx={{ maxWidth: 300 }}>
      <StyledCard
        onMouseEnter={() => setTextColor("#FFF")}
        onMouseLeave={() => setTextColor("#000")}
        variant="outlined"
        onClick={() => router.push(`/phone/${phone.id}`)}
      >
        <Image
          src={phone.imageUrl}
          width={300}
          height={300}
          alt="Phone Image"
          style={{
            objectFit: "contain",
            position: "relative",
            zIndex: 2, // Ensure image stays on top of the overlay
          }}
        />
        <ContentWrapper>
          <Typography color={textColor} variant="h6">
            {phone.brand}
          </Typography>
          <Typography color={textColor} variant="subtitle1">
            {phone.name}
          </Typography>
          <Typography color={textColor} variant="body2">
            {phone.basePrice}
          </Typography>
        </ContentWrapper>
      </StyledCard>
    </Box>
  );
}
