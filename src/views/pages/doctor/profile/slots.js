import { Chip, Grid } from '@mui/material'
import CustomInputLabel from 'src/views/components/inputLabel'

const Slots = ({ selectedRowIndex }) => {
  return (
    <Grid container spacing={3} sx={{ py:'19px',px:'23px',mt:'3px' }}>
      <Grid item xs={12} >
        <CustomInputLabel label={'Available Time'} />
        <Grid container spacing={1} style={{ marginTop: '10px' }}>
          {selectedRowIndex?.timeSlots.map((slot, index) => (
            <Grid item xs={2} key={index}>
              <Chip
                label={`${slot?.startTime} - ${slot?.endTime}`}
                variant='outlined'
                sx={{
                  backgroundColor: '#B5DED0'
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Slots
