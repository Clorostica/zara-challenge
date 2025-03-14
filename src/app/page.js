"use client";

import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";

import { getProducts } from "./lib/phone-api";
import PhoneCard from "./components/phone-card";

export default function Home() {
  const [allPhones, setAllPhones] = useState([]);
  const [filteredPhones, setFilteredPhones] = useState([]);

  useEffect(() => {
    const getPhones = async () => {
      const response = await getProducts();
      const data = await response.json();
      setAllPhones(data);
      setFilteredPhones(data);
    };

    getPhones();
  }, []);

  const filterPhonesByName = (searchTerm) => {
    if (!searchTerm) {
      setFilteredPhones(allPhones);
      return;
    }

    const filteredPhones = allPhones.filter((phone) =>
      phone.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPhones(filteredPhones);
  };

  return (
    <div>
      <TextField
        id="standard-search"
        label="Search field"
        type="search"
        variant="standard"
        onChange={(event) => {
          filterPhonesByName(event.target.value);
        }}
      />
      <div>Results {filteredPhones.length}</div>
      <br />
      <Grid
        container
        sx={{
          alignItems: "center",
        }}
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 2, sm: 4, md: 6, lg: 8, xl: 10 }}
      >
        {filteredPhones.map((phone, index) => (
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
            <PhoneCard phone={phone} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
