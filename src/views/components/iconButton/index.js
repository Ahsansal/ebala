import React from 'react'
import Button from '@mui/material/Button'

const CustomIconButton = ({ style, leftIconPath, buttonText, showRightIcon, onClick }) => {
  return (
    <Button
      sx={{
        backgroundColor: '#EAECF0',
        color: '#666666',
        textTransform: 'capitalize',
        display: 'flex',
        justifyItems: 'center',
        gap: '10px',
        borderRadius: '8px',
        px: '18px',
        py: '6px',
        fontSize: '16px',
        '&:hover': {
          backgroundColor: '#EAECF0'
        },
        ...style
      }}
      variant='contained'
      color='secondary'
      onClick={onClick}
    >
      {leftIconPath && <img src={leftIconPath} alt={leftIconPath} width={'auto'} />}
      {buttonText}
      {showRightIcon && <img src={'/icons/button_angle-down.svg'} alt={'button_angle-down.svg'} width={'auto'} />}
    </Button>
  )
}

export default CustomIconButton
