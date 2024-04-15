import { Chip, Grid } from '@mui/material'

const Info = ({ selectedRowIndex }) => {
  const detailData = [
    {
      Title: 'Doctor Name',
      info: selectedRowIndex?.name
    },
    {
      Title: "Doctor's Second Name",
      info: selectedRowIndex?.nameAr
    },
    {
      Title: 'Gender',
      info: selectedRowIndex?.gender
    },
    {
      Title: 'Date of Birth',
      info: selectedRowIndex?.dob
    },
    {
      Title: 'Status',
      info: selectedRowIndex?.status === '1' ? 'Active' : 'Not Varified/Active'
    }
  ]
  return (
    <div className='py-[19px] px-[23px]'>
      <div className='flex items-center gap-[20px] flex-wrap'>
        {detailData.map((elements, index) => (
          <div key={index} className='flex flex-col gap-1 justify-center w-[200px]'>
            <p className='p-0 m-0 text-[14px] font-medium text-[#666666]'>{elements.Title}</p>
            <p className='p-0 m-0 text-[16px] font-medium text-[#242424]'>{elements.info}</p>
          </div>
        ))}
      </div>
      <Grid item xs={12} sx={{ mt: 4 }}>
        <p className='p-0 m-0 text-[14px] font-medium text-[#666666]'>Available Day</p>
        <p className='p-0 m-0 text-[16px] font-medium text-[#242424]'>{selectedRowIndex?.timeSlots[0]?.day}</p>
      </Grid>
      {/* <Grid item xs={12} sx={{ mt: 4 }}>
        <p className='p-0 m-0 text-[16px] font-semibold text-[#242424]'>Available Time</p>
        <Grid container spacing={1} style={{ marginTop: '10px' }}>
          {selectedRowIndex?.timeSlots.length ? (
            selectedRowIndex?.timeSlots.map((slot, index) => (
              <Grid item xs={2} key={index}>
                <Chip
                  label={`${slot?.startTime} - ${slot?.endTime}`}
                  variant='outlined'
                  sx={{
                    backgroundColor: slot?.isBooked === 1 ? '#f68a8a' : '#B5DED0'
                  }}
                />
              </Grid>
            ))
          ) : (
            <p className='p-0 m-0 text-[16px] font-semibold text-[#ff1212fe]'>No Time Slots Available</p>
          )}
        </Grid>
      </Grid> */}
    </div>
  )
}

export default Info
