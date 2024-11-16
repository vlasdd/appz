import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import "./styles.css";
import { useNavigate } from "react-router-dom";

export default function MyTabs() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate()

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        textColor="secondary"
        indicatorColor="secondary"
      >
        <Tab
          label="MY TASKS"
          sx={{ fontWeight: "bold", color: value === 0 ? "purple" : "grey" }}
        />
        <Tab label="REPORT" sx={{ color: value === 1 ? "grey" : "darkgrey" }} />
        <Tab
          label="VISUALIZATION"
          sx={{ color: value === 2 ? "grey" : "darkgrey" }}
        />
      </Tabs>
      <button className="explore_new" onClick={() => navigate('/courses')}>
        Explore new challanges!
      </button>
    </Box>
  );
}
