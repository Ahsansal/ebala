//** React/Next Imports
import React from 'react'
import Image from 'next/image'
//** MUI Imports
import {
  Box,
  Grid,
  Button,
  Dialog,
  Divider,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormHelperText,
  TextareaAutosize
} from '@mui/material'
//** Internal Imports
import CustomInputLabel from '../components/inputLabel'
//** External Imports
import toast from 'react-hot-toast'
import { FadeLoader } from 'react-spinners'
//** API Import
import { update } from 'src/services/appointments.service'

const CancelAppointment = ({ id, open, close, fetchAppointment }) => {
  const [cancelNote, setCancelNote] = React.useState('')
  const [noteError, setNoteError] = React.useState(false)
  const [loader, setLoader] = React.useState(false)

  const handleCancelAppointment = async () => {
    if (!cancelNote.trim()) {
      setNoteError(true)
    } else {
      setLoader(true)
      const payload = {
        id,
        cancelNote,
        isCancel: true
      }
      const res = await update(payload)
      if (res?.success) {
        setLoader(false)
        toast.success('Appointment cancelled successfully!')
        close(false)
        fetchAppointment()
      } else {
        setLoader(false)
        toast.error('Server error')
      }
    }
  }

  return (
    <Dialog fullWidth open={open} maxWidth='md' scroll='body' onClose={() => close(false)} sx={{ px: '26px' }}>
      <DialogTitle sx={{ fontSize: '18px', fontWeight: '500', color: '#000000', pb: '7px !important', px: '26px' }}>
        Cancel Appointment
      </DialogTitle>
      <Divider sx={{ mx: '26px', my: '0px !important' }} color='#999999' />
      <IconButton size='small' onClick={() => close(false)} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
        <Image alt='Close' src='/icons/Close.png' width={20} height={20} style={{ cursor: 'pointer' }} />
      </IconButton>
      <DialogContent sx={{ position: 'relative', mt: '30px', px: '26px' }}>
        {loader && (
          <div
            style={{
              width: '90%',
              height: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              zIndex: 10
            }}
          >
            <FadeLoader color='#36d7b7' />
          </div>
        )}
        <Box sx={{ position: 'relative', filter: loader ? 'blur(5px)' : 'none' }}>
          <Grid spacing={3} container>
            <Grid item xs={12}>
              <CustomInputLabel label={'Note'} />
              <TextareaAutosize
                placeholder='Note for cancelling the appointment'
                value={cancelNote}
                aria-label='minimum height'
                minRows={4}
                onChange={e => setCancelNote(e.target.value)}
                className='w-full text-sm font-normal leading-relaxed px-3 py-2 rounded text-gray-600 border border-gray-300 focus:outline-none focus:border-gray-600 placeholder-gray-400'
              />
              {noteError && cancelNote.length === 0 && (
                <FormHelperText sx={{ color: 'error.main' }}>Please write a note</FormHelperText>
              )}
            </Grid>
          </Grid>

          <DialogActions sx={{ pb: { xs: 8, sm: 2 }, px: { xs: 8, sm: 1 }, justifyContent: 'end' }}>
            <Button
              variant='contained'
              onClick={handleCancelAppointment}
              disabled={loader}
              sx={{
                borderRadius: '8px',
                width: '220px',
                fontSize: '14px',
                fontWeight: '600',
                background: '#a70000',
                color: '#FFFFFF'
              }}
            >
              Cancel Appointment
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default CancelAppointment
