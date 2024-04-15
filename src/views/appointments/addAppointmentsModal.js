//** React/Next Imports
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
//** MUI Imports
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  TextField,
  TextareaAutosize,
  Typography,
  styled
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
import Loader from 'src/components/Loader'
//** API Imports
import { getByIdDoctor } from 'src/services/doctor.service'
import { create, getByID, update } from 'src/services/appointments.service'
import { getAllDoctors, getAllUsers } from 'src/services/appointments.service'
import { getAllDoctorsByServiceId, getAll as getAllServices } from 'src/services/services.service'

const genderDoctor = ['Male', 'Female', 'Other']
const havingAbuse = ['Yes', 'No']
const havingEmg = ['Yes', 'No']

const defaultValues = {
  name: '',
  bookingFor: '',
  dob: '',
  age: '',
  height: '',
  weight: '',
  gender: '',
  abuse: '',
  problem: '',
  emergency: '',
  note: '',
  status: true
}
const AddAppointment = ({ open, toggle, fetchAppointment, appointmentId }) => {
  const [doctors, setDoctors] = useState([])
  const [patients, setPatients] = useState([])
  const [selectedService, setSelectedService] = useState('')
  const [timeSlotLoader, setTimeSlotLoader] = useState(false)
  const [patient, setPatient] = useState({})
  const [services, setServices] = useState([])
  const [timeSlotes, setTimeSlotes] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedDoctorId, setSelectedDoctorId] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [error, setError] = useState('')
  const [doctorDropdownDisabled, setDoctorDropdownDisabled] = useState(true)

  const schema = yup.object().shape({
    bookingFor: yup.string().required(),
    dob: yup.string().required(),
    age: yup.number().typeError('Age field is required').required(),
    height: yup.string().required(),
    weight: yup.string().required(),
    gender: yup.string().typeError('Gender field is required').required(),
    abuse: !appointmentId && yup.string().required(),
    problem: yup.string().required(),
    emergency: !appointmentId && yup.string().required(),
    serviceId: !appointmentId && yup.string().typeError('Service field is required').required(),
    doctorId: !appointmentId && yup.string().typeError('Doctor field is required').required(),
    patientId: !appointmentId && yup.string().typeError('Patient field is required').required()
  })

  const Textarea = styled(TextareaAutosize)(
    ({ theme }) => `
    width: 100%;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: #666;
    background: ${theme.palette.customColors.main};
    border: 1px solid ${'#B9BBBD'};
    box-shadow: none;

    &:hover {
      // border: 1px solid ${'#04463A'};
    }
    &:active {
      border: 2px solid ${'#04463A'};
    }
    &:focus {
      border: 2px solid ${'#04463A'};
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
  )
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
  const handleChangeDoctor = async value => {
    setTimeSlotLoader(true)
    setSelectedDoctorId(value)

    const res = await getByIdDoctor(value)
    try {
      if (res.success) {
        const notBookedSlots = res?.doctor?.timeSlots.filter(slot => slot.isBooked === 0)
        setTimeSlotes(notBookedSlots)
      }
    } catch (error) {
      console.error('Error : ', error.message)
    }
    setTimeSlotLoader(false)
  }
  const fetchSubjectsById = async id => {
    setLoading(true)
    const res = await getByID(id)
    if (res?.success) {
      setLoading(false)
      const { weight, haveYouBeenAbuse, isEmergency, ...rest } = res?.appointment
      const numericWeight = parseInt(weight)
      const emergency = isEmergency ? 'Yes' : 'No'
      reset({
        weight: numericWeight,
        abuse: haveYouBeenAbuse,
        emergency: emergency,
        ...rest
      })
      setPatient(res?.appointment?.user?.userId)
      setSelectedSlot(res?.appointment?.timeSlot?.timeslotId)
      setTimeSlotes([res?.appointment?.timeSlot])
      setSelectedService(res?.appointment?.service?.serviceId)
      getAllDoctorsByService(res?.appointment?.service?.serviceId)
      setSelectedDoctorId(res?.appointment?.doctor?.doctorId)
    } else {
      setLoading(false)
      reset(defaultValues)
    }
  }
  const getAllDoctorsByService = async serviceId => {
    setDoctorDropdownDisabled(true)
    const res = await getAllDoctorsByServiceId(serviceId)
    if (res?.success) {
      setDoctors(res.doctors)
    }
    setDoctorDropdownDisabled(false)
  }

  useEffect(() => {
    if (appointmentId) {
      fetchSubjectsById(appointmentId)
    } else {
      reset(defaultValues)
    }
  }, [appointmentId])

  const fetchDoctors = async () => {
    const res = await getAllDoctors()
    if (res?.success) {
      setDoctors(res?.doctors)
    } else {
      setDoctors([])
    }
  }
  const fetchUsers = async () => {
    const res = await getAllUsers()
    if (res?.success) {
      setPatients(res?.users)
    } else {
      setPatients([])
    }
  }

  const fetchServices = async () => {
    const res = await getAllServices()
    if (res?.success) {
      setServices(res?.services)
    } else {
      setServices([])
    }
  }
  useEffect(() => {
    fetchDoctors()
    fetchUsers()
    fetchServices()
  }, [])
  const onSubmit = async data => {
    if (selectedSlot !== null) {
      if (appointmentId) {
        const updatePayload = {
          id: appointmentId,
          ...data
        }
        setLoading(true)
        const res = await update(updatePayload, appointmentId)
        if (res?.success) {
          setLoading(false)
          toggle()
          fetchAppointment()
          resetForm()
          toast.success('Appointment Updated Susscessfully')
        } else {
          setLoading(false)
          toast.error(res?.message)
        }
      } else {
        const formData = {
          userId: parseInt(data?.patientId),
          bookingFor: data?.bookingFor,
          dob: data?.dob,
          age: parseInt(data?.age),
          height: data?.height,
          weight: `${data?.weight} lbs`,
          gender: data?.gender,
          haveYouBeenAbuse: data?.abuse,
          problem: data?.problem,
          isEmergency: data?.emergency === 'Yes' ? true : false,
          doctorId: parseInt(data?.doctorId),
          serviceId: parseInt(data?.serviceId),
          timeSlotId: selectedSlot
        }

        setLoading(true)
        const res = await create(formData)
        if (res?.success) {
          setLoading(false)
          fetchAppointment()
          toggle()
          resetForm()
          handleClose()
          toast.success('Appointment Created')
        } else {
          setLoading(false)
          toast.error(res?.message)
          handleClose()
        }
      }
    } else {
      setError('Please select a slot')
      return
    }
  }
  const handleSlotChange = id => {
    setSelectedSlot(id)
    setError('')
  }

  const handleChangeService = async event => {
    const serviceId = event.target.value
    getAllDoctorsByService(serviceId)
    setSelectedService(serviceId)
    setTimeSlotes([])
    setSelectedSlot('')
  }

  return (
    <Dialog fullWidth open={open} maxWidth='md' scroll='body' onClose={handleClose} sx={{ px: '26px' }}>
      <DialogTitle sx={{ fontSize: '18px', fontWeight: '500', color: '#000000', pb: '7px !important', px: '26px' }}>
        {appointmentId ? 'Edit ' : 'Add '}Appointment
      </DialogTitle>
      <Divider sx={{ mx: '26px', my: '0px !important' }} color='#999999' />
      <IconButton size='small' onClick={handleClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
        <Image alt='Close' src='/icons/Close.png' width={20} height={20} style={{ cursor: 'pointer' }} />
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
            <Grid spacing={3} container>
              <Grid item xs={6}>
                <CustomInputLabel label={<span className='required-label'>Patient</span>} />
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <Controller
                    name='patientId'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        labelId='demo-simple-select-label'
                        value={patient}
                        onChange={evt => {
                          onChange(evt)
                          setPatient(evt?.target?.value)
                        }}
                        name='patientId'
                        error={Boolean(errors?.patientId)}
                        displayEmpty
                        IconComponent={() => (
                          <Image
                            alt='down arrow'
                            src='/icons/button_angle-down.svg'
                            width={24}
                            height={24}
                            className='mr-2'
                          />
                        )}
                      >
                        <MenuItem disabled value={''}>
                          {'Please select Patient'}
                        </MenuItem>
                        {patients?.map(option => (
                          <MenuItem key={option.id} value={option?.id}>
                            {option?.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.patientId && (
                    <>
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.patientId.message}</FormHelperText>{' '}
                    </>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <CustomInputLabel label={<span className='required-label'>Services</span>} />
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <Controller
                    name='serviceId'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        labelId='demo-simple-select-label'
                        value={selectedService}
                        onChange={e => {
                          onChange(e)
                          handleChangeService(e)
                        }}
                        name='serviceId'
                        error={Boolean(errors?.serviceId)}
                        displayEmpty
                        IconComponent={() => (
                          <Image
                            alt='down arrow'
                            src='/icons/button_angle-down.svg'
                            width={24}
                            height={24}
                            className='mr-2'
                          />
                        )}
                      >
                        <MenuItem disabled value={''}>
                          {'Please select Service'}
                        </MenuItem>
                        {services?.map(option => (
                          <MenuItem key={option.id} value={option?.id}>
                            {option?.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.serviceId && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.serviceId.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <CustomInputLabel label={<span className='required-label'>Doctor</span>} />
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <Controller
                    name='doctorId'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        labelId='demo-simple-select-label'
                        value={selectedDoctorId}
                        onChange={e => {
                          onChange(e)
                          handleChangeDoctor(e?.target?.value)
                        }}
                        name='doctorId'
                        error={Boolean(errors?.doctorId)}
                        disabled={doctorDropdownDisabled}
                        displayEmpty
                        IconComponent={() => (
                          <Image
                            alt='down arrow'
                            src='/icons/button_angle-down.svg'
                            width={24}
                            height={24}
                            className='mr-2'
                          />
                        )}
                      >
                        <MenuItem disabled value={''}>
                          {'Please select Doctor'}
                        </MenuItem>
                        {doctors?.map(option => (
                          <MenuItem key={option.doctorId} value={option?.doctorId}>
                            {option?.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.serviceId && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.serviceId.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} spacing={3} container sx={{ py: '20px', px: '20px' }}>
                {timeSlotes?.map((slot, index) => {
                  return (
                    <Grid item xs={2} key={index}>
                      <Chip
                        label={`${slot?.startTime} - ${slot?.endTime}`}
                        variant='filled'
                        onClick={() => handleSlotChange(slot?.timeslotId)}
                        sx={{
                          backgroundColor: selectedSlot === slot?.timeslotId ? '#B5DED0' : '#dbd5d5'
                        }}
                      />
                    </Grid>
                  )
                })}
                <Box className='ml-2'>
                  {timeSlotLoader ? (
                    <Loader size={20} />
                  ) : (
                    selectedDoctorId !== null &&
                    timeSlotes.length === 0 && (
                      <Typography sx={{ ml: 3, mt: 3 }} color={'red'}>
                        No Slots found against this Doctor
                      </Typography>
                    )
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomInputLabel label={<span className='required-label'>Patient Name</span>} />
                <FormControl fullWidth>
                  <Controller
                    name='bookingFor'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        onChange={onChange}
                        placeholder='Patient Name'
                        error={Boolean(errors.bookingFor)}
                        helperText={errors.bookingFor ? errors.bookingFor.message : ''}
                        className=' p-[10px] '
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomInputLabel label={<span className='required-label'>Date of Birth</span>} />
                <FormControl fullWidth>
                  <Controller
                    name='dob'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value || ''}
                        onChange={onChange}
                        type='date'
                        error={Boolean(errors.dob)}
                        helperText={errors.dob ? errors.dob.message : ''}
                        className=' p-[10px] '
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomInputLabel label={<span className='required-label'>Age</span>} />
                <FormControl fullWidth>
                  <Controller
                    name='age'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value || ''}
                        onChange={onChange}
                        placeholder='Age'
                        type='number'
                        error={Boolean(errors.age)}
                        helperText={errors.age ? errors.age.message : ''}
                        className=' p-[10px] '
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomInputLabel label={<span className='required-label'>Patient Height</span>} />
                <FormControl fullWidth>
                  <Controller
                    name='height'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value || ''}
                        onChange={onChange}
                        placeholder='Patient Height'
                        error={Boolean(errors.height)}
                        helperText={errors.height ? errors.height.message : ''}
                        className=' p-[10px] '
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomInputLabel label={<span className='required-label'>Patient Weight</span>} />
                <FormControl fullWidth>
                  <Controller
                    name='weight'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value || ''}
                        type='number'
                        onChange={onChange}
                        placeholder='Patient Weight in lbs'
                        error={Boolean(errors.weight)}
                        helperText={errors.weight ? errors.weight.message : ''}
                        className=' p-[10px] '
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomInputLabel label={<span className='required-label'>Gender</span>} />
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <Controller
                    name='gender'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        labelId='demo-simple-select-label'
                        value={value || ''}
                        onChange={onChange}
                        name='gender'
                        error={Boolean(errors?.gender)}
                        displayEmpty
                        IconComponent={() => (
                          <Image
                            src='/icons/button_angle-down.svg'
                            alt='down arrow'
                            width={24}
                            height={24}
                            className='mr-2'
                          />
                        )}
                      >
                        <MenuItem disabled value={''}>
                          {'gender'}
                        </MenuItem>
                        {genderDoctor?.map(option => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.gender && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.gender.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomInputLabel label={<span className='required-label'>Have you been abuse?</span>} />
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <Controller
                    name='abuse'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        labelId='demo-simple-select-label'
                        value={value || ''}
                        onChange={onChange}
                        name='abuse'
                        error={Boolean(errors?.abuse)}
                        displayEmpty
                        IconComponent={() => (
                          <Image
                            src='/icons/button_angle-down.svg'
                            alt='down arrow'
                            width={24}
                            height={24}
                            className='mr-2'
                          />
                        )}
                      >
                        <MenuItem disabled value={''}>
                          {'Have You Been Abuse?'}
                        </MenuItem>
                        {havingAbuse?.map(option => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.abuse && <FormHelperText sx={{ color: 'error.main' }}>{errors.abuse.message}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomInputLabel label={<span className='required-label'>Emergency</span>} />
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <Controller
                    name='emergency'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        labelId='demo-simple-select-label'
                        value={value || ''}
                        onChange={onChange}
                        error={Boolean(errors?.emergency)}
                        displayEmpty
                        IconComponent={() => (
                          <Image
                            src='/icons/button_angle-down.svg'
                            alt='down arrow'
                            width={24}
                            height={24}
                            className='mr-2'
                          />
                        )}
                      >
                        <MenuItem disabled value={''}>
                          {'Emergency'}
                        </MenuItem>
                        {havingEmg?.map(option => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.emergency && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.emergency.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <CustomInputLabel label={<span className='required-label'>Problem</span>} />
                <FormControl fullWidth sx={{ mb: 0 }}>
                  <Controller
                    name='problem'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Textarea
                        value={value}
                        onChange={onChange}
                        placeholder='Problem'
                        error={Boolean(errors.problem)}
                        helperText={errors.problem ? errors.problem.message : ''}
                        aria-label='minimum height'
                        minRows={4}
                      />
                    )}
                  />
                  {errors.problem && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.problem.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              {appointmentId && (
                <Grid item xs={12}>
                  <CustomInputLabel label={'Note'} />
                  <FormControl fullWidth sx={{ mb: 0 }}>
                    <Controller
                      name='updateNote'
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <Textarea
                          value={value}
                          onChange={onChange}
                          placeholder='Write a update Note'
                          aria-label='minimum height'
                          minRows={4}
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
              )}
            </Grid>
            {error && (
              <Alert sx={{ mt: 3 }} severity='error'>
                {error}
              </Alert>
            )}
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
                {appointmentId ? 'Update' : 'Save'}
              </Button>
            </DialogActions>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default AddAppointment
