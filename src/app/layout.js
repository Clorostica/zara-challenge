"use client";
import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import IconButton from "@mui/material/IconButton";
import { ShoppingBag } from "react-feather";
import { useRouter } from "next/navigation";
import { Grid2 as Grid } from "@mui/material";
import './globals.css';  

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const router = useRouter();
  const [cart, setCart] = useState();

  useEffect(() => {
    // localStorage is not available on the server for the first render
    setCart(JSON.parse(localStorage.getItem("cart")));
  }, []);

  return (
    <html lang="en">
      <body style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
        <Grid
          container
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "baseline",
            padding: "20px", 
          }}
        >
          <b
            style={{
              fontSize: "36px", 
              fontWeight: "bold", 
              color: "#2E3B55", 
              textShadow: "2px 2px 6px rgba(0, 0, 0, 0.1)", 
            }}
          >
            MBST
          </b>

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
