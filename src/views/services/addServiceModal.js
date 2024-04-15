//** React Imports
import React, { useEffect, useState } from 'react'
//** MUI Imports
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  TextField
} from '@mui/material'
import IconButton from '@mui/material/IconButton'
//** External Imports
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { FadeLoader } from 'react-spinners'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
//** Internal Imports
import CustomInputLabel from 'src/views/components/inputLabel'
//** API Imports
import { create, getByID, update } from 'src/services/services.service'
import CustomSwitch from './switchbutton'

const defaultValues = {
  name: '',
  status: true
}
const AddService = ({ open, toggle, fetchServices, serviceId }) => {
  const [loading, setLoading] = useState(false)

  const schema = yup.object().shape({
    name: yup.string().required('Name is required')
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

  const fetchSubjectsById = async id => {
    setLoading(true)
    const res = await getByID(id)
    if (res?.success) {
      setLoading(false)
      reset({ ...res?.service })
    } else {
      setLoading(false)
      reset(defaultValues)
    }
  }

  useEffect(() => {
    if (serviceId) {
      fetchSubjectsById(serviceId)
    } else {
      reset(defaultValues)
    }
  }, [serviceId])

  const onSubmit = async data => {
    if (serviceId) {
      setLoading(true)
      const res = await update(data, serviceId)
      if (res?.success) {
        setLoading(false)
        toggle()
        fetchServices()
        resetForm()
        toast.success('Service Updated Susscessfully')
      } else {
        setLoading(false)
        toast.error(res?.message)
      }
    } else {
      setLoading(true)
      const res = await create(data)
      if (res?.success) {
        setLoading(false)
        fetchServices()
        toggle()
        resetForm()
        handleClose()
        toast.success('Service Added')
      } else {
        setLoading(false)
        toast.error(res?.message)
        handleClose()
      }
    }
  }

  return (
    <Dialog fullWidth open={open} maxWidth='sm' scroll='body' onClose={handleClose} sx={{ px: '26px' }}>
      <DialogTitle sx={{ fontSize: '18px', fontWeight: '500', color: '#000000', pb: '7px !important', px: '26px' }}>
        {serviceId ? 'Edit Service' : 'Add Service'}
      </DialogTitle>
      <Divider sx={{ mx: '26px', my: '0px !important' }} color='#999999' />
      <IconButton size='small' onClick={handleClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
        <img src='/icons/Close.png' alt='Close' style={{ cursor: 'pointer' }} />
      </IconButton>
      <DialogContent sx={{ position: 'relative', mt: '30px', px: '26px' }}>
        {loading && (
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
            <FadeLoader color='#36d7b7' />
          </div>
        )}
        <Box sx={{ position: 'relative', filter: loading ? 'blur(5px)' : 'none' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={10}>
                <CustomInputLabel label={<span className='required-label'>Name</span>} />
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <Controller
                    name='name'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        name='name'
                        value={value}
                        onChange={onChange}
                        placeholder='Enter service name'
                        error={Boolean(errors.name)}
                      />
                    )}
                  />
                  {errors.name && <FormHelperText sx={{ color: 'error.main' }}>{errors.name.message}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <CustomInputLabel label={'Status'} />
                <FormControl fullWidth sx={{ mt: 3 }}>
                  <Controller
                    name='status'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomSwitch
                        checked={value}
                        onChange={e => onChange(e.target.checked)}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    )}
                  />
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
                variant='contained'
                type='submit'
                sx={{
                  borderRadius: '8px',
                  width: '89px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#FFFFFF'
                }}
              >
                {serviceId ? 'Update' : 'Save'}
              </Button>
            </DialogActions>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default AddService
