"use client";

import React, { useEffect, useState } from "react";
import { getProducts } from "./lib/phone-api";
import PhoneCard from "./components/phone-card";
import {
  Box,
  Grid,
  TextField,
  Paper,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import Search from "@mui/icons-material/Search";
import Clear from "@mui/icons-material/Clear"; 

export default function Home() {
  const [allPhones, setAllPhones] = useState([]);
  const [filteredPhones, setFilteredPhones] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getPhones = async () => {
      const response = await getProducts();
      const data = await response.json();
      setAllPhones(data);
      setFilteredPhones(data);
    };

    getPhones();
  }, []);

  const filterPhonesByName = (term) => {
    setSearchTerm(term);
    if (!term) {
      setFilteredPhones(allPhones);
      return;
    }
    const filtered = allPhones.filter((phone) =>
      phone.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredPhones(filtered);
  };

  return (
    <Box sx={{ p: 3, maxWidth: "1200px", margin: "auto", fontFamily: "sans-serif" }}>

      <Paper
        elevation={3}
        sx={{
          p: 1,
          mb: 3,
          display: "flex",
          alignItems: "center",
          borderRadius: "12px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          label="Buscar teléfono..."
          value={searchTerm}
          onChange={(e) => filterPhonesByName(e.target.value)}
          InputProps={{
            sx: {
              fontSize: "14px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
              },
            },
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ fontSize: "18px", color: "#888" }} />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton onClick={() => filterPhonesByName("")}>
                  <Clear sx={{ fontSize: "18px", color: "#888" }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Paper>


      <Typography
        variant="subtitle2"
        sx={{ fontSize: "12px", color: "#666", marginBottom: "10px" }}
      >
        {filteredPhones.length} modelos encontrados
      </Typography>


      <Grid container spacing={3}>
        {filteredPhones.map((phone, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <div
              className="fade-in"
              style={{
                animationDelay: `${index * 0.05}s`,
                transition: "all 0.3s ease-in-out",
              }}
            >
              <PhoneCard phone={phone} />
            </div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
