"use client";
import React, { useEffect, useState } from "react";

import { Inter } from "next/font/google";
import IconButton from "@mui/material/IconButton";
import { ShoppingBag } from "react-feather";
import { useRouter } from "next/navigation";
import { Grid2 as Grid } from "@mui/material";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const router = useRouter();
  const [cart, setCart] = useState();

  useEffect(() => {
    // localStorage is not available on the server for the first render
    // so needs to be placed inside useEffect to run safely on the client
    setCart(JSON.parse(localStorage.getItem("cart")));
  }, []);

  return (
    <html lang="en">
      <head>
        <style>
          {`
            body {
              font-family: var(--font-inter), sans-serif;
            }
          `}
        </style>
      </head>
      <body className={`${inter.variable}`}>
        <Grid
          container
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <b>MBST</b>

          <Grid
            container
            direction="row"
            sx={{
              justifyContent: "flex-end",
              alignItems: "baseline",
            }}
          >
            <IconButton color="primary" onClick={() => router.push("/cart")}>
              <ShoppingBag />
            </IconButton>
            <div>{cart ? cart.length : 0}</div>
          </Grid>
        </Grid>
        {children}
      </body>
    </html>
  );
}
