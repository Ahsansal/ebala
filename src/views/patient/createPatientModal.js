import { useState, useEffect } from 'react'
//** MUI Imports
import {
  Box,
  Grid,
  Chip,
  Dialog,
  Button,
  Select,
  Divider,
  MenuItem,
  TextField,
  IconButton,
  FormControl,
  DialogTitle,
  DialogActions,
  DialogContent,
  FormHelperText,
  FormControlLabel
} from '@mui/material'
//** Internal Imports
import CustomSwitch from './switchbutton'
import CustomInputLabel from '../components/inputLabel'
//** External Imports
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { Icon } from '@iconify/react'
import { FadeLoader } from 'react-spinners'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
//** API Imports
import { createUser, getByID, update, getAllSer } from 'src/services/patient.service'

const defaultValues = {
  name: '',
  phoneNumber: '',
  email: '',
  password: '',
  status: '1'
}
const AddPatient = ({ open, toggle, fetchPatients, patientId }) => {
  // const [error, setError] = useState([])
  const [loading, setLoading] = useState(false)
  const [services, setServices] = useState([])
  const [patientService, setPatientService] = useState([])
  const [status, setStatus] = useState('1') // State to track the status

  const schema = yup.object().shape({
    name: yup
      .string()
      .required('Patient Name is required')
      .matches(/^[a-zA-Z\s]{3,50}$/, {
        message: 'Patient Name must be a minimum of 3 and maximum 50 alphabetic characters.'
      }),

    email: yup.string().required('Email is required'),
    phoneNumber: yup.string().required('Phone number is required'),
    password:
      !patientId &&
      yup
        .string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_+=~`[\]{}|\\:;"'<>,.?/])[a-zA-Z\d!@#$%^&*()\-_+=~`[\]{}|\\:;"'<>,.?/]{8,}$/,
          'Password must contain at least one symbol, one uppercase letter, and one numeric digit'
        )
  })

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    // defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const resetForm = () => {
    reset()
    setLoading(false)
    // setError([])
  }

  const handleClose = () => {
    toggle()
    resetForm()
  }

  const fetchPatientById = async id => {
    setLoading(true)
    const res = await getByID(id)
    if (res?.success) {
      setLoading(false)
      const obj = {
        ...res?.user,
        name: res?.user?.name,
        status: res?.user?.status, // Update status from response
        email: res?.user?.email,
        phoneNumber: res?.user?.phoneNumber,
        password: res?.user?.password,
        selectedServices: res?.user?.selectedServices?.map(data => data?.service?.serviceId) || []
      }
      const servicesSelect = res?.user?.selectedServices?.map(data => data?.service?.serviceId)
      setPatientService(servicesSelect)
      reset(obj)
      setStatus(res?.user?.status) // Update status in the component state
    } else {
      setLoading(false)
      reset(defaultValues)
    }
  }

  useEffect(() => {
    if (patientId) {
      fetchPatientById(patientId)
    } else {
      reset(defaultValues)
    }
  }, [patientId])

  const fetchService = async () => {
    const res = await getAllSer()

    if (res?.success) {
      setServices(res?.services)
    } else {
      toast.error('Server Error')
    }
  }

  useEffect(() => {
    fetchService()
  }, [])

  const handleChange = event => {
    const {
      target: { value }
    } = event
    setPatientService(value)
  }

  const handleRemoveChip = valueToRemove => {
    const updatedPatientService = patientService.filter(value => value !== valueToRemove)
    setPatientService(updatedPatientService)
  }

  const onSubmit = async data => {
    const commonFields = {
      name: data?.name,
      email: data?.email,
      status: data?.status,
      phoneNumber: data?.phoneNumber
    }

    if (patientId) {
      setLoading(true)
      let payloadData = {
        ...commonFields,
        id: data.id,
        status: data?.status,
        services: patientService.join(',')
      }

      const res = await update(payloadData, patientId)
      if (res?.success) {
        setLoading(false)
        handleClose()
        fetchPatients()
      } else {
        setLoading(false)
        toast.error(res?.message)
      }
    } else {
      const formData = {
        ...commonFields,
        password: data?.password,
        services: data?.services.join(',')
      }

      // setLoading(true)
      const res = await createUser(formData)
      if (res?.success) {
        setLoading(false)
        handleClose()
        fetchPatients()
        // setIsSuccessModal(true)
      } else {
        setLoading(false)
        // toast.error(res?.message)
        // setError(res?.response?.data?.errors)
        // setError('error')
      }
    }
  }

  return (
    <Dialog fullWidth open={open} maxWidth='md' scroll='body' onClose={handleClose} sx={{ px: '26px' }}>
      <DialogTitle sx={{ fontSize: '18px', fontWeight: '500', color: '#000000', pb: '7px !important', px: '26px' }}>
        {/* {subjectId ? 'Edit Patient' : 'Add Patient'}
         */}
        {patientId ? 'Update Patient' : 'Add Patient'}
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
              <Grid item xs={12} sm={6}>
                <CustomInputLabel label={<span className='required-label'>Patient Name</span>} />
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <Controller
                    name='name'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        name='name'
                        value={value}
                        // label='Subject Name'
                        onChange={onChange}
                        placeholder='Enter Subject'
                        error={Boolean(errors.name)}
                      />
                    )}
                  />
                  {errors.name && <FormHelperText sx={{ color: 'error.main' }}>{errors.name.message}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomInputLabel label={<span className='required-label'>Phone Number</span>} />
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <Controller
                    name='phoneNumber'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        name='phoneNumber'
                        value={value}
                        type='number'
                        onChange={onChange}
                        placeholder='Enter phoneNumber'
                        error={Boolean(errors.phoneNumber)}
                      />
                    )}
                  />
                  {errors.phoneNumber && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.phoneNumber.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                  <CustomInputLabel label={'Gender'} />
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <Controller
                      name='gender'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <Select
                          labelId='demo-simple-select-label'
                          id='demo-simple-select'
                          // label='Gender'
                          value={value || 'Male '}
                          onChange={onChange}
                          name='gender'
                          error={Boolean(errors.gender)}
                          displayEmpty
                          IconComponent={() => (
                            <img
                              src='/icons/button_angle-down.svg'
                              alt='down arrow'
                              style={{ width: '24px', height: '24px', marginRight: '8px' }}
                            />
                          )}
                        >
                          <MenuItem disabled value={''}>
                            {'Please select Gender'}
                          </MenuItem>
                          {gender?.map((item, index) => (
                            <MenuItem key={index} value={item}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                    {errors.gender && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.gender.message}</FormHelperText>
                    )}
                  </FormControl>
                </Grid> */}
              <Grid item xs={12} sm={6}>
                <CustomInputLabel label={<span className='required-label'>Email</span>} />
                <FormControl fullWidth sx={{ mb: 0 }}>
                  <Controller
                    name='email'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        type='email'
                        value={value}
                        // label='Email'
                        onChange={onChange}
                        placeholder='johndoe@email.com'
                        error={Boolean(errors.email)}
                        // autoComplete='new-password'
                      />
                    )}
                  />
                  {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomInputLabel label={<span className='required-label'>Password</span>} />
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <Controller
                    name='password'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <>
                        <TextField
                          type='password'
                          value={patientId ? '' : value || ''}
                          onChange={onChange}
                          placeholder={patientId ? 'Password cannot be changed' : 'Password'}
                          disabled={patientId}
                          error={Boolean(errors.password)}
                          // autoComplete='new-password'
                        />
                      </>
                    )}
                  />
                  {errors.password && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.password.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <CustomInputLabel label={'Service'} />
                <FormControl sx={{ width: '100%' }}>
                  <Controller
                    name='services'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        value={patientService}
                        name='services'
                        error={Boolean(errors.services)}
                        multiple
                        displayEmpty
                        IconComponent={() => (
                          <img
                            src='/icons/button_angle-down.svg'
                            alt='down arrow'
                            style={{ width: '24px', height: '24px', marginRight: '8px' }}
                          />
                        )}
                        onChange={e => {
                          onChange(e)
                          handleChange(e)
                        }}
                        renderValue={selected => {
                          return []
                        }}
                      >
                        <MenuItem disabled value={''}>
                          {'Please select Service'}
                        </MenuItem>
                        {services?.map(option => (
                          <MenuItem key={option} value={option?.id}>
                            {option?.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.services && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.services.message}</FormHelperText>
                  )}
                </FormControl>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, marginTop: '10px' }}>
                  {patientService?.map(value => (
                    <Chip
                      style={{
                        fontSize: '14px',
                        fontWeight: '500',
                        background: '#B5DED0',
                        paddingInline: '5px',
                        textAlign: 'center'
                      }}
                      key={value}
                      label={
                        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                          {services?.find(item => item?.id === value)?.name}
                          <IconButton size='small' onClick={() => handleRemoveChip(value)}>
                            <Icon icon='basil:cross-solid' />
                          </IconButton>
                        </div>
                      }
                    />
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12} sm={1} sx={{ display: 'flex', alignItems: 'center', mt: '10px' }}>
                <FormControl fullWidth>
                  <Controller
                    name='status'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <div className=''>
                        <FormControlLabel
                          control={
                            <CustomSwitch
                              checked={value === '1'} // Check if status is 'Active'
                              onChange={e => onChange(e.target.checked ? '1' : '0')}
                              inputProps={{ 'aria-label': 'controlled' }}
                              sx={{ ml: '20px' }}
                            />
                          }
                          label={
                            <span
                              style={{
                                color: '#1A2825',
                                fontWeight: '500',
                                fontSize: '14px',
                                alignItems: 'center'
                              }}
                            >
                              Active
                            </span>
                          }
                          labelPlacement='start' // Adjust label placement as needed
                        />
                      </div>
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <DialogActions sx={{ pb: { xs: 8, sm: 2 }, px: { xs: 8, sm: 1 }, justifyContent: 'end' }}>
              <Button
                variant='outlined'
                onClick={handleClose}
                sx={{
                  borderRadius: '8px',
                  width: '89px',
                  background: '#CCCFCF',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#1A2825',
                  border: '0px',
                  '&:hover': {
                    background: '#A0A3A3',
                    color: '#242424',
                    border: '0px'
                  }
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
                  color: '#FFFFFF',
                  '&:hover': {
                    background: '#043919'
                  }
                }}
              >
                {/* {patientId ? 'Update' : 'Save'} */}
                {patientId ? 'Update' : 'Save'}
              </Button>
            </DialogActions>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default AddPatient
