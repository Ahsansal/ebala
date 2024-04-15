import React from 'react'
import InputLabel from '@mui/material/InputLabel'

const CustomInputLabel = ({ label }) => {
  return <InputLabel sx={{ color: "#242424", mb: "7px", fontSize: "14px", fontWeight: "500" }}>{label}</InputLabel>
}

export default CustomInputLabel
