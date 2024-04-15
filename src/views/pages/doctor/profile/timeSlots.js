import { Chip, Grid, Typography } from '@mui/material'

const TimeSlots = ({ doctorDetails }) => {
  const groupedTimeSlots = {}
  doctorDetails.timeSlots.forEach(slot => {
    if (!groupedTimeSlots[slot.date]) {
      groupedTimeSlots[slot.date] = []
    }
    groupedTimeSlots[slot.date].push(slot)
  })

  return (
    <Grid container spacing={1} sx={{ py: '19px', px: '23px', mt: '3px' }}>
      {Object.keys(groupedTimeSlots).map((date, index) => (
        <Grid key={index} item xs={12}>
          <Typography variant='h6'>{date}</Typography>
          <Grid container spacing={2}>
            {groupedTimeSlots[date].map((item, idx) => (
              <Grid key={idx} item>
                <Chip
                  label={`${item.startTime} - ${item.endTime}`}
                  variant='outlined'
                  sx={{
                    backgroundColor: item?.isBooked === 1 ? '#f68a8a' : '#B5DED0'
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      ))}
    </Grid>
  )
}

export default TimeSlots
