"use client";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { styled } from "@mui/system";

const ContinueShoppingButton = styled(Button)({
  backgroundColor: "#FFFFF",
  color: "black",
  padding: "10px 20px",
  width: 260,
  height: 60,
  textTransform: "none",
  fontSize: "12px",
  border: "1px solid black",
  position: "relative",
  overflow: "hidden",
  transition: "color 0.4s ease", 
  "&:hover": {
    color: "white",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: "100%",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "#000000", 
    transition: "top 0.3s ease", 
  },
  "&:hover::before": {
    top: "0", 
  },
});

const PhoneCard = styled(Grid)({
  "&:hover": {
    transform: "scale(1.05)", // Hace la tarjeta un poco más grande
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Agrega una sombra
    transition: "transform 0.3s ease, box-shadow 0.3s ease", // Transición suave
  },
});

export default function Cart() {
  const router = useRouter();
  const [cart, setCart] = useState();

  useEffect(() => {
    // localStorage is not available on the server for the first render
    // so needs to be placed inside useEffect to run safely on the client
    setCart(JSON.parse(localStorage.getItem("cart")));
  }, []);

  const handleRemoveFromCart = (phone) => {
    const newCart = cart.filter((item) => item !== phone);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart); // Update the state to trigger a re-render
  };

  if (!cart) {
    return <div>Cart (0)</div>;
  }

  return (
    <>
      <div>CART ({cart.length})</div>
      <Grid
        container
        sx={{
          paddingBottom: "320px", 
        }}
      >
        {cart.map((phone) => (
          <PhoneCard
            key={phone.id} 
            container
            direction="row"
            sx={{
              justifyContent: "space-evenly",
              alignItems: "center",
              marginLeft: "50px",
              marginBottom: "20px",
            }}
            columns={{ xs: 2 }}
          >
            <Grid>
              <img
                src={phone.imageUrl}
                alt={phone.name}
                style={{ maxWidth: "150px", maxHeight: "150px", transition: "transform 0.3s ease" }}
              />
            </Grid>
            <Grid>
              <div
                style={{
                  fontSize: "12px",
                  color: "#6e6e6e",
                  textTransform: "uppercase",
                  transition: "color 0.3s ease", 
                }}
              >
                {phone.name}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#6e6e6e",
                  textTransform: "uppercase",
                }}
              >
                {phone.size} | {phone.color}
              </div>
              <br />
              <div
                style={{
                  fontSize: "12px",
                  color: "#6e6e6e",
                  textTransform: "uppercase",
                }}
              >
                {`${phone.price} EUR`}
              </div>
              <br />
              <Button
                style={{ color: "red" }}
                onClick={() => handleRemoveFromCart(phone)}
                sx={{
                  "&:hover": {
                    backgroundColor: "#ff6961", 
                    transform: "scale(1.1)", 
                    transition: "all 0.3s ease",
                  },
                }}
              >
                Eliminar
              </Button>
            </Grid>
          </PhoneCard>
        ))}
      </Grid>

      <Grid
        container
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "flex-end",
          paddingLeft: "60px",
          paddingRight: "60px",
          paddingBottom: "40px",
        }}
      >
        <Grid>
          <ContinueShoppingButton onClick={() => router.push("/")}>
            CONTINUE SHOPPING
          </ContinueShoppingButton>
        </Grid>
        <Grid
          container
          direction="row"
          sx={{
            justifyContent: "flex-end", 
            alignItems: "center", 
          }}
        >
          <div
            style={{
              paddingTop: "30px",
              paddingRight: "30px",
              fontSize: "14px",
              textTransform: "uppercase",
              marginRight: "10px", 
            }}
          >
            TOTAL {cart.reduce((acc, item) => acc + item.price, 0)} EUR
          </div>

          <Button
            onClick={() => alert("sisisi no voy a construirlo :)")}
            variant="contained"
            sx={{
              marginTop: "20px",
              width: 200,
              height: 60,
              fontSize: "12px",
              backgroundColor: "black",
              color: "white",
              "&:hover": {
                backgroundColor: "#333333", 
                transform: "scale(1.05)", 
                transition: "transform 0.3s ease, background-color 0.3s ease",
                color: "white",
              },
            }}
          >
            PAY
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
