import React, { useState, useEffect } from 'react'
import Image from 'next/image'
//** MUI Imports
import {
  Box,
  Grid,
  Button,
  Dialog,
  Select,
  Divider,
  MenuItem,
  TextField,
  IconButton,
  FormControl,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormHelperText
} from '@mui/material'
//** Internal Imports
import CustomInputLabel from '../components/inputLabel'
//** External Imports
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { FadeLoader } from 'react-spinners'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
//** API Import
import { getAllDoctor } from 'src/services/doctor.service'
import { create } from 'src/services/notifications.service'

const defaultValues = {
  title: '',
  message: '',
  dateTime: '',
  doctor: ''
}

const AddNotificationModal = ({ open, toggle, updateNotifications }) => {
  const [loading, setLoading] = useState(false)
  const [doctors, setDoctors] = useState([])
  const [docValue, setDocValue] = useState('')
  const [docError, setDocError] = useState(false)

  useEffect(() => {
    ;(async () => {
      const res = await getAllDoctor()
      if (res?.success) {
        setDoctors(res?.doctors)
      }
    })()
  }, [])

  const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
    message: yup.string().required('Message is required'),
    dateTime: yup.string().required('Date Time is required')
  })

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const resetForm = () => {
    reset()
    setLoading(false)
  }

  const handleClose = () => {
    toggle()
    resetForm()
  }

  const onChangeDocValue = ({ target: { value } }) => {
    setDocValue(value)
    setDocError(false)
  }

  const onSubmit = async data => {
    if (!docValue) {
      setDocError(true)
      return
    }
    setLoading(true)
    const notificationPayload = {
      actionId: 1,
      actionCategory: 'notification_category',
      doctorId: docValue,
      ...data
    }
    const response = await create(notificationPayload)
    if (response.success) {
      toast.success('Notification saved successfully')
      updateNotifications()
      handleClose()
    } else {
      toast.error('Failed to save notification')
    }
    setLoading(false)
  }

  return (
    <Dialog fullWidth open={open} maxWidth='sm' scroll='body' onClose={handleClose}>
      <DialogTitle>Add Notification</DialogTitle>
      <Divider />
      <IconButton onClick={handleClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
        <Image src='/icons/Close.png' alt='close-btn' width={25} height={25} style={{ cursor: 'pointer' }} />
      </IconButton>
      <DialogContent>
        {loading && (
          <Box
            sx={{
              zIndex: 10,
              width: '92%',
              height: '50%',
              display: 'flex',
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <FadeLoader color='#36d7b7' />
          </Box>
        )}
        <Box sx={{ position: 'relative', filter: loading ? 'blur(5px)' : 'none' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CustomInputLabel label={<span className='required-label'>Title</span>} />
                <FormControl fullWidth error={Boolean(errors.title)}>
                  <Controller
                    name='title'
                    control={control}
                    render={({ field }) => <TextField {...field} placeholder='Enter Title' variant='outlined' />}
                  />
                  <FormHelperText>{errors.title?.message}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <CustomInputLabel label={<span className='required-label'>Message</span>} />
                <FormControl fullWidth error={Boolean(errors.message)}>
                  <Controller
                    name='message'
                    control={control}
                    render={({ field }) => <TextField {...field} placeholder='Enter Message' variant='outlined' />}
                  />
                  <FormHelperText>{errors.message?.message}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <CustomInputLabel label={<span className='required-label'>Doctors</span>} />
                <FormControl fullWidth error={docError}>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={docValue}
                    onChange={onChangeDocValue}
                    disabled={doctors.length === 0}
                    displayEmpty
                  >
                    <MenuItem disabled value={''}>
                      Please select Doctor
                    </MenuItem>
                    {doctors.length === 0 ? (
                      <MenuItem disabled value={''}>
                        No Doctor Found
                      </MenuItem>
                    ) : (
                      doctors?.map(item => (
                        <MenuItem key={item?.id} value={item?.id}>
                          {item?.name}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                  {docError && <FormHelperText style={{ color: 'red' }}>Doctor is required</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <CustomInputLabel label={<span className='required-label'>Date & Time</span>} />
                <FormControl fullWidth error={Boolean(errors.dateTime)}>
                  <Controller
                    name='dateTime'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant='outlined'
                        placeholder='Date & Time'
                        type='datetime-local'
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                    )}
                  />
                  <FormHelperText>{errors.dateTime?.message}</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <DialogActions sx={{ pb: { xs: 8, sm: 2 }, px: { xs: 8, sm: 1 }, justifyContent: 'end' }}>
              <Button
                onClick={handleClose}
                sx={{
                  borderRadius: '8px',
                  width: '89px',
                  background: '#CCCFCF',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#242424',
                  border: '0px'
                }}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                variant='contained'
                sx={{
                  borderRadius: '8px',
                  width: '89px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#FFFFFF'
                }}
              >
                Save
              </Button>
            </DialogActions>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default AddNotificationModal
