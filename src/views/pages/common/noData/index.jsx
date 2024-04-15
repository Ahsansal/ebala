import Image from 'next/image'

import { Box, Typography, Button } from '@mui/material'
import ControlPointIcon from '@mui/icons-material/ControlPoint'

const NoData = ({ handleOpen, imageSrc, text, buttonTitle }) => {
  return (
    <Box
      sx={{
        pt: '60px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Image alt='no school' height={450} width={450} src={imageSrc} />
      <Typography sx={{ my: 5, fontSize: '18px', color: '#999999', fontWeight: 500 }}>{text}</Typography>
      <Button variant='contained' color='primary' onClick={handleOpen}>
        <ControlPointIcon sx={{ marginRight: 2 }} />
        <Typography sx={{ textTransform: 'capitalize' }} color={'white'} variant='button' display='inline'>
          {buttonTitle}
        </Typography>
      </Button>
    </Box>
  )
}

export default NoData
