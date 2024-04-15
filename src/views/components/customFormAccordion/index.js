import React from 'react'
import { Box, Typography } from '@mui/material'

const CustomFormAccordion = ({ title, isExpanded, setIsExpanded, children }) => {
  return (
    <Box>
      <Box
        sx={{
          mt: 8,
          borderRadius: '8px',
          backgroundColor: '#F2F4F7',
          p: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer'
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Typography sx={{ fontSize: '14px', fontWeight: 500, color: '#4D5856' }}>{title}</Typography>
        <img src='/icons/button_angle-down.svg' alt={'expand'} />
      </Box>
      {isExpanded && (
        <Box
          sx={{
            mt: '12px'
          }}
        >
          {children}
        </Box>
      )}
    </Box>
  )
}

export default CustomFormAccordion
