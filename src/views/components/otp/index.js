import React, { useRef } from 'react'
import FormControl from '@mui/material/FormControl'

const Otp = ({ otp, setOtp }) => {
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)]

  const handleInputChange = (index, event) => {
    const value = event.target.value
    if (isNaN(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Move to the next input box automatically after input
    if (value !== '' && index < 3) {
      inputRefs[index + 1].current.focus()
    }
  }

  const handleBackspace = (index, event) => {
    if (event.key === 'Backspace' && index > 0 && otp[index] === '') {
      const newOtp = [...otp]
      newOtp[index - 1] = ''
      setOtp(newOtp)
      inputRefs[index - 1].current.focus()
    }
  }

  const handlePaste = event => {
    const pastedData = event.clipboardData.getData('Text').trim()
    if (pastedData.length === 4 && !isNaN(pastedData)) {
      const newOtp = pastedData.split('')
      setOtp(newOtp.slice(0, 4))
    }
  }

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px'
  }

  return (
    <FormControl fullWidth sx={{ display: 'flex', mb: 4 }}>
      <div style={containerStyle}>
        {otp.map((digit, index) => (
          <input
            key={index}
            type='text'
            maxLength='1'
            value={digit}
            onChange={e => handleInputChange(index, e)}
            onKeyDown={e => handleBackspace(index, e)}
            onPaste={handlePaste}
            ref={inputRefs[index]}
            style={{
              width: '75px',
              height: '75px',
              textAlign: 'center',
              fontSize: '24px',
              borderRadius: '7px',
              // background: '#F2F4F7',
              marginRight: '20px',
              border: '1px solid #B9BBBD',
              marginTop: '30px'
            }}
          />
        ))}
      </div>
    </FormControl>
  )
}

export default Otp
