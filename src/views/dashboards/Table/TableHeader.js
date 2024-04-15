//** MUI Imports

import { Typography } from '@mui/material'
import Box from '@mui/material/Box'

const TableHeader = props => {
  // ** Props
  const { pageTitle } = props

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: '2px',
        pb: '6px',
        pt: '18px'
      }}
    >
      <Typography sx={{ fontSize: '18px', fontWeight: '600', color: '#333333' }}>{pageTitle}</Typography>
      <Typography sx={{ fontSize: '14px', fontWeight: '600', color: '#0F0F0F', textDecoration: 'underline', cursor: 'pointer' }}>
        View all
      </Typography>
    </Box>
  )
}

export default TableHeader
