import React, { Fragment, useState } from 'react'
//** MUI Imports
import { Box, Grid, Chip, Button, TextField } from '@mui/material'
//** Internal Imports
import Icon from 'src/@core/components/icon'
import CustomInputLabel from 'src/views/components/inputLabel'
//** External Imports
import toast from 'react-hot-toast'
import { FadeLoader } from 'react-spinners'
//** API Imports
import { updateDoctorTimeSlot, deleteDoctorTimeSlot } from 'src/services/doctor.service'

const EditTimeSlot = ({ slots, updateTimeSlot }) => {
  const [loader, setLoader] = useState(false)
  const [openForm, setOpenForm] = useState(false)
  const [editedSlot, setEditedSlot] = useState(null)

  const editTimeSlot = slot => {
    if (slot?.isBooked === 1) {
      toast.error('Cannot edit booked time slot.')
    } else {
      setOpenForm(true)
      setEditedSlot({ ...slot })
    }
  }

  const handleCloseForm = () => {
    setOpenForm(false)
    setEditedSlot(null)
  }

  const handleFieldChange = (field, value) => {
    setEditedSlot(prevSlot => ({
      ...prevSlot,
      [field]: value
    }))
  }

  const updateTimeSlots = (timeSlotsArray, timeSlotObj) => {
    return timeSlotsArray.map(slot => {
      if (slot.timeslotId === timeSlotObj.id) {
        return timeSlotObj
      }
      return slot
    })
  }
  const handleSaveChanges = async () => {
    setLoader(true)
    const { day, timeslotId, ...rest } = editedSlot
    const updatePayload = {
      id: timeslotId,
      ...rest
    }
    const res = await updateDoctorTimeSlot(updatePayload)
    if (res?.success) {
      setLoader(false)
      const updatedTimeSlots = updateTimeSlots(slots?.timeSlots, editedSlot)
      updateTimeSlot(prevState => ({
        ...prevState,
        timeSlots: updatedTimeSlots
      }))
      toast.success('Time Slot updated successfully.')
      setOpenForm(false)
      setEditedSlot(null)
    } else {
      setLoader(false)
      toast.error('Server error')
    }
  }

  const handleDeleteTimeSlot = async () => {
    setLoader(true)
    const res = await deleteDoctorTimeSlot(editedSlot?.timeslotId)
    if (res?.success) {
      const filteredSlots = slots?.timeSlots.filter(slot => slot.timeslotId !== editedSlot?.timeslotId)
      updateTimeSlot(prevState => ({
        ...prevState,
        timeSlots: filteredSlots
      }))
      setLoader(false)
      toast.success('Time Slot deleted successfully.')
      setOpenForm(false)
      setEditedSlot(null)
    } else {
      setLoader(false)
      toast.error('Server error')
    }
  }
  return (
    <Fragment>
      {loader && (
        <div
          style={{
            width: '96%',
            height: '90%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            zIndex: 10
          }}
        >
          <FadeLoader color='#04463A' />
        </div>
      )}
      <Box sx={{ filter: loader ? 'blur(5px)' : 'none' }}>
        <Grid item xs={12}>
          <CustomInputLabel label={'Click to edit time slot'} />
          <Grid container spacing={2} style={{ marginTop: '10px' }}>
            {slots?.timeSlots?.map((slot, index) => (
              <Grid item xs={2} key={index}>
                <Box
                  onClick={() => editTimeSlot(slot)}
                  sx={{
                    cursor: 'pointer',
                    textAlign: 'center',
                    borderRadius: '20px',
                    border: '0.5px solid #00000042',
                    backgroundColor: slot?.isBooked === 1 ? '#f68a8a' : undefined
                  }}
                >
                  <Chip key={`${slot?.startTime}-${slot?.endTime}`} label={`${slot?.startTime} - ${slot?.endTime}`} />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
        {openForm && (
          <Grid item xs={12}>
            <Box sx={{ marginTop: '20px' }}>
              <div className='flex items-center  justify-between'>
                <CustomInputLabel label={'Edit Time Slot Details'} />
                <Icon
                  color='#a70000'
                  icon='mdi:delete-outline'
                  fontSize='25px'
                  className='cursor-pointer'
                  onClick={() => handleDeleteTimeSlot()}
                />
              </div>
              <form>
                <Grid container spacing={2} style={{ marginTop: '10px' }}>
                  <Grid item xs={6}>
                    <TextField
                      label='Start Time'
                      type='time'
                      value={editedSlot.startTime}
                      onChange={e => handleFieldChange('startTime', e.target.value)}
                      fullWidth
                      inputProps={{
                        inputMode: 'numeric',
                        inputFormat: 'HH:mm'
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label='End Time'
                      type='time'
                      value={editedSlot.endTime}
                      onChange={e => handleFieldChange('endTime', e.target.value)}
                      fullWidth
                      inputProps={{
                        inputMode: 'numeric',
                        inputFormat: 'HH:mm'
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label='Date'
                      type='date'
                      value={editedSlot.date}
                      onChange={e => handleFieldChange('date', e.target.value)}
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Box sx={{ marginTop: '20px' }}>
                  <Button variant='contained' onClick={handleSaveChanges}>
                    Save Changes
                  </Button>{' '}
                  <Button variant='contained' onClick={handleCloseForm}>
                    Close
                  </Button>
                </Box>
              </form>
            </Box>
          </Grid>
        )}
      </Box>
    </Fragment>
  )
}

export default EditTimeSlot
