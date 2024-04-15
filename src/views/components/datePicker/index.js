import React, { useState } from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

const CustomDatePicker = ({}) => {
  const [value, setValue] = useState(null)

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        sx={{
          backgroundColor: '#FFF',
          borderRadius: '10px',
          border: '0.6px solid #999',
          p: '0px',
          '.MuiOutlinedInput-input': {
            p: '10px 14px',
            width: '140px'
          }
        }}
        slots={{
          openPickerIcon: props => (
            <React.Fragment>
              {props.children}
              <img width={'20px'} src='/icons/uil_calender.svg' style={{ cursor: 'pointer' }} onClick={props.onClick} />
            </React.Fragment>
          )
        }}
        value={value}
        format='MM/DD/YYYY'
        onChange={value => console.log(value, 'value')}
      />
    </LocalizationProvider>
  )
}

export default CustomDatePicker
