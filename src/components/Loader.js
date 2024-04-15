import React from 'react'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'

export default function Loader({ color, size }) {
  return (
    <Stack sx={{ color: 'grey.500' }} spacing={2} direction='row'>
      <CircularProgress color={color} size={size} />
    </Stack>
  )
}
