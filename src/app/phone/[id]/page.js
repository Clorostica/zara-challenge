"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft } from "react-feather";
import Grid from "@mui/material/Grid2";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import PhoneCard from "../../components/phone-card";

import { getProduct } from "../../lib/phone-api";

export default function PhoneDetailsPage() {
  const router = useRouter();
  const { id } = useParams();

  const [phone, setPhone] = useState();
  const [specs, setSpecs] = useState([]);
  const [selectedStorageOption, setSelectedStorageOption] = useState();
  const [selectedColorOption, setSelectedColorOption] = useState();
  const [hoveredColorOption, setHoveredColorOption] = useState();

  useEffect(() => {
    const getPhone = async () => {
      const response = await getProduct(id);
      const data = await response.json();
      setPhone(data);
      setSelectedStorageOption(data.storageOptions[0]);
      setSelectedColorOption(data.colorOptions[0]);
      setSpecs({
        brand: data.brand,
        name: data.name,
        description: data.description,
        ...data.specs,
      });
    };

    getPhone();
  }, []);

  if (!phone) {
    return <div>Loading...</div>;
  }

  const handleSelectStorageOption = (event, newStorageOption) => {
    if (!newStorageOption) {
      return;
    }
    setSelectedStorageOption(newStorageOption);
  };

  const handleSelectColorOption = (event, newColorOption) => {
    if (!newColorOption) {
      return;
    }
    setSelectedColorOption(newColorOption);
  };

  const handleHoverColorOption = (newColorOption) => {
    if (!newColorOption) {
      return;
    }
    setHoveredColorOption(newColorOption);
  };

  const handleMouseLeaveColorOption = () => {
    setHoveredColorOption(null);
  };

  const handleAddToCart = () => {
    let cart = localStorage.getItem("cart");
    if (!cart) {
      cart = [];
    } else {
      cart = JSON.parse(cart);
    }

    const cartPhone = {
      name: phone.name,
      imageUrl: selectedColorOption.imageUrl,
      price: selectedStorageOption.price,
      color: selectedColorOption.name,
      size: selectedStorageOption.capacity,
    };

    cart.push(cartPhone);
    localStorage.setItem("cart", JSON.stringify(cart));
    router.push(`/cart`);
  };

  return (
    <div>
      <Button
        color="black"
        onClick={() => router.push(`/`)}
        startIcon={<ChevronLeft />}
      >
        Back
      </Button>
      <br />
      <Grid
        container
        direction="row"
        sx={{
          justifyContent: "space-evenly",
          alignItems: "center",
          paddingTop: "200px",
        }}
        columns={{ xs: 2 }}
      >
        <Grid>
          <img
            src={selectedColorOption.imageUrl}
            alt="Grapefruit slice atop a pile of other slices"
          />
        </Grid>
        <Grid>
          <h1>{phone.name}</h1>
          <h2>{`${selectedStorageOption.price} EUR`}</h2>
          <br />
          <div>STORAGE ¿HOW MUCH SPACE DO YOU NEED?</div>
          <br />
          <ToggleButtonGroup
            color="primary"
            value={selectedStorageOption}
            exclusive
            onChange={handleSelectStorageOption}
            aria-label="Platform"
          >
            {phone.storageOptions.map((storageOption, index) => (
              <ToggleButton key={index} value={storageOption}>
                {`${storageOption.capacity}`}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <br />
          <br />
          <div>COLOR. PICK YOUR FAVOURITE.</div>
          <br />
          <ToggleButtonGroup
            color="primary"
            value={selectedColorOption}
            exclusive
            onChange={handleSelectColorOption}
            aria-label="Platform"
          >
            {phone.colorOptions.map((colorOption) => (
              <ToggleButton
                key={colorOption.name}
                onMouseEnter={() => handleHoverColorOption(colorOption)}
                onMouseLeave={handleMouseLeaveColorOption}
                value={colorOption}
              >
                <div
                  style={{
                    width: "25px",
                    height: "25px",
                    backgroundColor: colorOption.hexCode,
                  }}
                ></div>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <div
            style={{
              fontSize: "12px",
              paddingTop: "20px",
            }}
          >
            {hoveredColorOption
              ? hoveredColorOption.name
              : selectedColorOption.name}
          </div>
          <br />
          <Button
            variant="contained"
            fullWidth
            onClick={handleAddToCart}
            sx={{
              backgroundColor: "#F2F2F2",
              color: "#BFBFBF",
              fontSize: "0.70rem",
              paddingTop: "20px",
              paddingBottom: "20px",
              "&:hover": {
                backgroundColor: "#E0E0E0",
              },
            }}
          >
            Add to Cart
          </Button>
        </Grid>
      </Grid>
      <br />
      <div>
        <h3>SPECIFICATIONS</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            {Object.entries(specs).map(([key, value], index) => (
              <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "8px", fontWeight: "bold" }}>
                  {key.replace(/([A-Z])/g, " $1").toUpperCase()}
                </td>
                <td style={{ padding: "8px" }}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br />
      <h3>SIMILAR PRODUCTS</h3>
      <Grid
        container
        sx={{
          alignItems: "center",
        }}
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 2, sm: 4, md: 6, lg: 8, xl: 10 }}
      >
        {phone.similarProducts.map((item, index) => (
          <Grid
            display="flex"
            justifyContent="center"
            alignItems="center"
            key={index}
            sx={{
              alignItems: "center",
            }}
            size={{ xs: 2 }}
          >
            <PhoneCard phone={item} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
