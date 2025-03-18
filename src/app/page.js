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
  Button,
  Collapse,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import Search from "@mui/icons-material/Search";
import Clear from "@mui/icons-material/Clear";
import FilterListIcon from "@mui/icons-material/FilterList";

export default function Home() {
  const [allPhones, setAllPhones] = useState([]);
  const [filteredPhones, setFilteredPhones] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [availableColors, setAvailableColors] = useState([]);

  useEffect(() => {
    const getPhones = async () => {
      const response = await getProducts();
      const data = await response.json();
      setAllPhones(data);
      setFilteredPhones(data);

      const uniqueColors = [];
      data.forEach((phone) => {
        if (!!phone.colorOptions) {
          phone.colorOptions.forEach((color) => {
            if (!uniqueColors.some((c) => c.hexCode === color.hexCode)) {
              uniqueColors.push(color);
            }
          });
        }
      });
      setAvailableColors(uniqueColors);
    };

    getPhones();
  }, []);

  const handleSelectColorOption = (event, newColorOption) => {
    setSelectedColor(newColorOption);
  };

  useEffect(() => {
    let filtered = allPhones;

    if (selectedColor) {
      filtered = filtered.filter((phone) =>
        phone.colorOptions.some((c) => c.hexCode === selectedColor.hexCode)
      );
    }

    if (searchTerm) {
      filtered = filtered.filter((phone) =>
        phone.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPhones(filtered);
  }, [selectedColor, searchTerm]);

  return (
    <Box
      sx={{
        p: 3,
        maxWidth: "1200px",
        margin: "auto",
        fontFamily: "sans-serif",
      }}
    >
      <Paper
        elevation={3}
        sx={{ p: 1, mb: 3, display: "flex", alignItems: "center" }}
      >
        <TextField
          fullWidth
          variant="outlined"
          label="Buscar teléfono..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            sx: {
              fontSize: "14px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
              },
              "& .MuiInputBase-input": {
                color: "#666",
              },
            },
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ fontSize: "18px", color: "#888" }} />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton onClick={() => setSearchTerm("")}>
                  <Clear sx={{ fontSize: "18px", color: "#888" }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      <Button
        variant="text"
        startIcon={<FilterListIcon />}
        onClick={() => setFilterOpen(!filterOpen)}
        sx={{
          mb: 2,
          color: "#000",
          backgroundColor: "transparent",
          boxShadow: "none",
          "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" },
        }}
      >
        Filtrar
      </Button>

      <Collapse in={filterOpen}>
        <ToggleButtonGroup
          color="primary"
          value={selectedColor}
          exclusive
          onChange={handleSelectColorOption}
          aria-label="Color Filter"
        >
          {availableColors.map((colorOption) => (
            <ToggleButton
              key={colorOption.name}
              value={colorOption}
              sx={{
                border: "1px solid #ccc",
                padding: "5px",
                margin: "2px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "25px",
                  height: "25px",
                  backgroundColor: colorOption.hexCode,
                }}
              ></div>
              <Typography sx={{ fontSize: "10px" }}>
                {colorOption.name}
              </Typography>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Collapse>

      {selectedColor && (
        <Button
          onClick={() => setSelectedColor(null)}
          sx={{ mt: 2, color: "#000", textDecoration: "underline" }}
        >
          Limpiar Filtro de Color
        </Button>
      )}

      <Typography
        variant="subtitle2"
        sx={{ fontSize: "12px", color: "#666", marginBottom: "10px" }}
      >
        {filteredPhones.length} modelos encontrados
      </Typography>

      <Grid container spacing={3}>
        {filteredPhones.map((phone, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={index}
            sx={{
              display: "flex",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                maxHeight: "400px",
                width: "100%",
                maxWidth: "250px",
              }}
            >
              <PhoneCard phone={phone} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
