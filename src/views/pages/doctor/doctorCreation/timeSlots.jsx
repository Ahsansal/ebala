//** React Imports
import React, { useState, useEffect } from 'react'
//** MUI Imports
import {
  Box,
  Chip,
  Grid,
  Button,
  Divider,
  Checkbox,
  TextField,
  FormGroup,
  Typography,
  FormControl,
  FormHelperText,
  FormControlLabel
} from '@mui/material'
//** Internal Imports
import EditTimeSlot from './editTimeSlot'
import CustomInputLabel from 'src/views/components/inputLabel'
//** External Imports
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
//** API Imports
import { createDoctor, addDoctorTimeSlots } from 'src/services/doctor.service'

const questionsData = [
  {
    key: 'timeDuration',
    title: 'Appointment Duration',
    options: ['15 minutes', '30 minutes', '45 minutes', '60 minutes']
  },
  {
    key: 'break',
    title: 'Break Duration',
    options: ['15 minutes', '30 minutes', '45 minutes', '60 minutes']
  }
]

const TimeSlots = ({
  doctorId,
  setLoading,
  doctorData,
  handleClose,
  userFetchData,
  setDoctorData,
  setIsSuccessModal,
  setEditDoctorData,
  editDoctorTimeSlots
}) => {
  const [formState, setFormState] = useState(() => {
    const initialState = {}
    questionsData.forEach(question => {
      initialState[question.key] = {
        selectedOptions: [],
        otherText: ''
      }
    })
    return initialState
  })

  const [timeSlots, setTimeSlots] = useState([])
  const [error, setError] = useState('')
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([])
  const [selectedDate, setSelectedDate] = useState('')
  const [show, setShow] = useState(false)
  const [selectedTimeSlotData, setSelectedTimeSlotData] = useState([])
  const [editTimeSlots, setEditTimeSlots] = useState(false)

  const handleCheckboxChange = (questionKey, option) => {
    setFormState(prevFormState => {
      const updatedState = { ...prevFormState }

      if (questionKey === 'workingDays') {
        const index = updatedState[questionKey].selectedOptions.indexOf(option)
        if (index === -1) {
          updatedState[questionKey].selectedOptions.push(option)
        } else {
          updatedState[questionKey].selectedOptions.splice(index, 1)
        }
      } else {
        if (option === 'Other') {
          updatedState[questionKey].selectedOptions = ['Other']
          updatedState[questionKey].otherText = ''
        } else {
          updatedState[questionKey].selectedOptions = [option]
          updatedState[questionKey].otherText = ''
        }
      }
      return updatedState
    })

    setError('')
  }

  const handleOtherTextChange = (questionKey, event) => {
    setFormState(prevFormState => ({
      ...prevFormState,
      [questionKey]: {
        ...prevFormState[questionKey],
        otherText: event.target.value
      }
    }))
  }

  const generateTimeSlots = () => {
    const appointmentDuration = parseInt(formState['timeDuration'].selectedOptions[0])
    const breakDuration = parseInt(formState['break'].selectedOptions[0])

    const startTime = 8 * 60 // Start from 8:00 AM in minutes
    const endTime = 17 * 60 // End at 5:00 PM in minutes

    const slots = []

    for (let time = startTime; time < endTime; time += appointmentDuration + breakDuration) {
      const slotStartTime = getTimeFromMinutes(time)
      const slotEndTime = getTimeFromMinutes(time + appointmentDuration)

      slots.push(<Chip key={`${slotStartTime}-${slotEndTime}`} label={`${slotStartTime} - ${slotEndTime}`} />)
    }

    setTimeSlots(slots)
  }

  const getTimeFromMinutes = minutes => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`
    const formattedMins = mins === 0 ? '00' : `${mins}`
    return `${formattedHours}:${formattedMins}`
  }

  useEffect(() => {
    if (formState['timeDuration'].selectedOptions.length && formState['break'].selectedOptions.length) {
      setShow(true)
      generateTimeSlots()
    }
  }, [formState])

  const defaultValue = {
    dateAndTime: '',
    startTime: '',
    endTime: ''
  }
  const schema = yup.object().shape({
    dateAndTime: yup.string().required(),
    startTime: yup.string().required(),
    endTime: yup.string().required()
  })

  const {
    reset,
    control,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValue,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const handleSubmit = async event => {
    for (const questionKey of Object.keys(formState)) {
      const { selectedOptions, otherText } = formState[questionKey]
      if (questionKey === 'workingDays' && selectedOptions.length === 0) {
        setError(`Please select at least one working day.`)
        return
      }

      if (selectedOptions.length === 0) {
        setError(`Please select an option for "${questionsData.find(q => q.key === questionKey)?.title}".`)
        return
      }

      if (selectedOptions.includes('Other') && !otherText.trim()) {
        setError(`Please enter a value for "${questionsData.find(q => q.key === questionKey)?.title} - Other".`)
        return
      }
      if (selectedDate === '') {
        setError(`Please enter a Date`)
        return
      }
      if (selectedTimeSlots.length === 0) {
        setError('Please select at least one time slot.')
        return
      }
    }
    setLoading(true)
    if (doctorId) {
      const res = await addDoctorTimeSlots(doctorId, { timeSlots: selectedTimeSlotData })
      if (res?.success) {
        setLoading(false)
        handleClose()
        toast.success('Time Slots added successfully!')
        userFetchData()
      } else {
        setLoading(false)
        toast.error('Failed to add Time Slots')
      }
    } else {
      const UpdatesData = {
        ...doctorData,
        slots: selectedTimeSlotData
      }

      setDoctorData(UpdatesData)

      const res = await createDoctor(UpdatesData)
      if (res?.success) {
        setLoading(false)
        handleClose()
        userFetchData()
        setIsSuccessModal(true)
      } else {
        setLoading(false)
        toast.error(res?.message)
        setError(res?.response?.data?.errors)
      }
    }
  }
  const saveDoctor = async () => {
    setLoading(true)
    const res = await createDoctor(doctorData)
    if (res?.success) {
      setLoading(false)
      handleClose()
      userFetchData()
      setIsSuccessModal(true)
    } else {
      setLoading(false)
      toast.error(res?.message)
    }
  }
  const getDayFromDate = dateString => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const date = new Date(dateString)
    const dayIndex = date.getDay()
    return days[dayIndex]
  }
  const handleTimeSlotClick = (startTime, endTime) => {
    setError('')
    const selectedDay = getDayFromDate(selectedDate)
    const newTimeSlot = {
      date: selectedDate,
      day: selectedDay,
      startTime,
      endTime
    }
    setSelectedTimeSlots(prevSelectedTimeSlots => {
      const isAlreadySelected = prevSelectedTimeSlots.some(
        slot => slot.startTime === startTime && slot.endTime === endTime
      )

      if (isAlreadySelected) {
        // Remove the time slot if it's already selected
        return prevSelectedTimeSlots.filter(slot => !(slot.startTime === startTime && slot.endTime === endTime))
      } else {
        // Add the time slot if it's not selected
        return [...prevSelectedTimeSlots, newTimeSlot]
      }
    })

    setSelectedTimeSlotData(prevSelectedTimeSlotData => {
      const isAlreadySelected = prevSelectedTimeSlotData.some(
        slot => slot.startTime === startTime && slot.endTime === endTime
      )

      if (isAlreadySelected) {
        return prevSelectedTimeSlotData.filter(slot => !(slot.startTime === startTime && slot.endTime === endTime))
      } else {
        // Update the date property with selectedDate
        newTimeSlot.date = selectedDate
        return [...prevSelectedTimeSlotData, newTimeSlot]
      }
    })
  }

  const getStartTimeFromChip = chipLabel => {
    const [startTime] = chipLabel.key.split('-').map(time => time.trim())
    return startTime
  }

  const getEndTimeFromChip = chipLabel => {
    const [, endTime] = chipLabel.key.split('-').map(time => time.trim())
    return endTime
  }
  const handleTimeSlotCheckBox = ({ target: { checked } }) => {
    setEditTimeSlots(checked)
  }

  return (
    <>
      {editDoctorTimeSlots?.timeSlots?.length > 0 && (
        <FormControlLabel control={<Checkbox onChange={handleTimeSlotCheckBox} />} label='Edit Existing Time Slots' />
      )}
      {editTimeSlots ? (
        <EditTimeSlot slots={editDoctorTimeSlots} updateTimeSlot={setEditDoctorData} />
      ) : (
        <form onSubmit={handleSubmit} style={{ margin: '1px 0px' }}>
          <FormControl component='fieldset' sx={{ width: '100%' }}>
            {questionsData.map(question => (
              <FormGroup key={question.key}>
                <Typography
                  className='required-label'
                  sx={{ fontWeight: '500', fontSize: '14px', color: '#242424', letterSpacing: '0.5px' }}
                >{`${question.title}`}</Typography>
                <Grid container sx={{ gap: '40px', mt: 2, ml: 1 }}>
                  {question.options.map(option => (
                    <Grid item key={option}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              question.key === 'workingDays'
                                ? formState[question.key]?.selectedOptions.includes(option)
                                : formState[question.key]?.selectedOptions[0] === option
                            }
                            onChange={() => handleCheckboxChange(question.key, option)}
                            sx={{ color: '#999999' }}
                            icon={<img src='/icons/unchecked.svg' alt='unchecked.svg' />}
                            checkedIcon={<img src='/icons/checked.svg' alt='checked.svg' />}
                          />
                        }
                        label={
                          <span style={{ color: '#242424', fontSize: '16px', fontWeight: 500, letterSpacing: '0.5px' }}>
                            {option}
                          </span>
                        }
                      />
                    </Grid>
                  ))}
                </Grid>
                {question.key !== questionsData[questionsData.length - 1].key && (
                  <Divider className='!mt-[20px] !mb-[20px]' />
                )}

                {formState[question.key]?.selectedOptions.includes('Other') && (
                  <TextField
                    label='Other'
                    variant='outlined'
                    value={formState[question.key]?.otherText}
                    onChange={event => handleOtherTextChange(question.key, event)}
                    fullWidth
                  />
                )}
              </FormGroup>
            ))}
          </FormControl>
          <Grid container spacing={3} style={{ marginTop: '10px' }}>
            <Grid item xs={12} sm={6}>
              <CustomInputLabel label={<span className='required-label'>Date</span>} />
              <FormControl fullWidth>
                <Controller
                  name='dateAndTime'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value || ''}
                      onChange={e => {
                        onChange(e)
                        setSelectedDate(e.target.value)
                        setError('')
                      }}
                      type='date'
                      error={Boolean(errors.dateAndTime)}
                      helperText={errors.dateAndTime ? errors.dateAndTime.message : ''}
                      className=' p-[10px] '
                      inputProps={{
                        min: new Date().toISOString().split('T')[0] // Set the min attribute to disable past dates
                      }}
                    />
                  )}
                />
                {errors.dateAndTime && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.dateAndTime.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={3} style={{ marginTop: '10px' }}>
            {show && (
              <Grid item xs={12}>
                <CustomInputLabel label={'Time Slots'} />
                <Grid container spacing={2} style={{ marginTop: '10px' }}>
                  {timeSlots.map((slot, index) => (
                    <Grid item xs={2} key={index}>
                      <Box
                        onClick={() => handleTimeSlotClick(getStartTimeFromChip(slot), getEndTimeFromChip(slot))}
                        sx={{
                          cursor: 'pointer',
                          textAlign: 'center',
                          borderRadius: '20px',
                          border: selectedTimeSlots.some(
                            selectedSlot =>
                              selectedSlot.startTime === getStartTimeFromChip(slot) &&
                              selectedSlot.endTime === getEndTimeFromChip(slot)
                          )
                            ? '0.5px solid #B5DED0'
                            : '0.5px solid #00000042',

                          backgroundColor: selectedTimeSlots.some(
                            selectedSlot =>
                              selectedSlot.startTime === getStartTimeFromChip(slot) &&
                              selectedSlot.endTime === getEndTimeFromChip(slot)
                          )
                            ? '#B5DED0'
                            : undefined
                        }}
                      >
                        {slot}
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            )}
          </Grid>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <Grid
            item
            xs={12}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '38px',
              width: '100%'
            }}
          >
            <div className='flex justify-between items-center w-full'>
              <div></div>
              <div className='flex gap-[10px]'>
                <Button
                  sx={{
                    height: '34px',
                    borderRadius: '8px',
                    border: '1px solid #CCCFCF',
                    color: '#4D5856',
                    padding: '10px 18px',
                    backgroundColor: '#CCCFCF',
                    textTransform: 'capitalize'
                  }}
                  onClick={handleClose}
                >
                  Exit
                </Button>
                {!doctorId && (
                  <Button
                    onClick={saveDoctor}
                    sx={{
                      height: '34px',
                      borderRadius: '8px',
                      border: '1px solid #CCCFCF',
                      color: '#4D5856',
                      padding: '10px 18px',
                      backgroundColor: '#CCCFCF',
                      textTransform: 'capitalize'
                    }}
                  >
                    Skip & Save Doctor
                  </Button>
                )}
                <Button
                  variant='contained'
                  // type='submit'
                  onClick={handleSubmit}
                  sx={{
                    padding: '10px 18px',
                    height: '34px',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                    textTransform: 'capitalize'
                  }}
                >
                  {doctorId ? 'Add New Time Slots' : 'Save'}
                </Button>
              </div>
            </div>
          </Grid>
        </form>
      )}
    </>
  )
}

export default TimeSlots
