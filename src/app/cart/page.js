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
  "&:hover": {
    backgroundColor: "#115293",
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
          paddingBottom: "320px", // Padding en la parte inferior para toda la Grid
        }}
      >
        {cart.map((phone) => (
          <Grid
            key={phone.id} // Added key to prevent React warnings
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
                style={{ maxWidth: "150px", maxHeight: "150px" }}
              />
            </Grid>
            <Grid>
              <div
                style={{
                  fontSize: "12px",
                  color: "#6e6e6e",
                  textTransform: "uppercase",
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
              >
                Eliminar
              </Button>
            </Grid>
          </Grid>
        ))}
      </Grid>

      <Grid
        container
        direction="row"
        sx={{
          justifyContent: "space-between", // Espaciado entre los elementos
          alignItems: "flex-end", // Alinea los elementos al final de la fila
          paddingLeft: "60px", // Padding izquierdo
          paddingRight: "60px", // Padding derecho
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
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              textTransform: "uppercase", // Convertir el total a mayúsculas
            }}
          >
            TOTAL {cart.reduce((acc, item) => acc + item.price, 0)} EUR
          </div>

          <Button
            onClick={() => alert("Yeah I'm not building that ;)")}
            variant="contained"
            sx={{
              marginTop: "20px",
              width: 200,
              height: 60,
              fontSize: "12px",
              backgroundColor: "black", // Fondo negro
              color: "white", // Color del texto blanco
            }}
          >
            PAY
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
