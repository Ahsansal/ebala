// ** React/Next Imports
import { useState, useEffect, forwardRef } from 'react'
import Image from 'next/image'
// ** MUI Imports
import {
  Box,
  Fade,
  Grid,
  Button,
  Select,
  Dialog,
  MenuItem,
  TextField,
  IconButton,
  FormControl,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormHelperText
} from '@mui/material'
//** Form Imports
import * as yup from 'yup'
import { FadeLoader } from 'react-spinners'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
//** Internal Imports
import Medicine from './medicine'
import { toast } from 'react-hot-toast'
import { getAllDoctor } from 'src/services/doctor.service'
import CustomInputLabel from 'src/views/components/inputLabel'
import { getAllUsers } from 'src/services/appointments.service'
import { create, update } from 'src/services/prescriptions.service'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

// const showErrors = (field, valueLen, min) => {
//   if (valueLen === 0) {
//     return `${field} field is required`
//   } else if (valueLen > 0 && valueLen < min) {
//     return `${field} must be at least ${min} characters`
//   } else {
//     return ''
//   }
// }

const defaultValues = {
  title: '',
  diagnose: '',
  symptoms: ''
}

const AddPrescription = ({
  open,
  toggle,
  prescriptions,
  fetchAll,
  setPrescriptions,
  loading,
  setLoading,
  editMode,
  setEditMode,
  editData,
  setEditData
}) => {
  // ** State
  const [patients, setPatients] = useState([])
  const [doctors, setDoctors] = useState([])
  const [userError, setUserError] = useState(false)
  const [docError, setDocError] = useState(false)
  const [gridError, setGridError] = useState([])
  const [gridItems, setGridItems] = useState([])
  const [userValue, setUserValue] = useState('')
  const [docValue, setDocValue] = useState('')

  const schema = yup.object().shape({
    title: yup.string().required('title is required'),
    diagnose: yup.string().required('diagnose is required'),
    symptoms: yup.string().required('symptoms is required')
    // user: yup.number().required('User is required'),
    // doc: yup.string().required('Doctor is required')
    //   frequency: yup.string().required('frequency is required'),
    //   duration: yup.string().required('duration is required'),
    //   instruction: yup.string().required('instruction is required')
  })
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: editMode ? editData : defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const resetForm = () => {
    reset()
    setLoading(false)
    setUserValue('')
    setDocValue('')
    setGridError([])
  }

  const handleClose = () => {
    toggle()
    resetForm()
  }

  useEffect(() => {
    getAllDoctor().then(res => {
      setDoctors(res?.doctors)
    })
    getAllUsers().then(res => {
      setPatients(res?.users)
    })
    // Cleanup function
    return () => {
      setEditMode(false)
      setEditData([])
      resetForm()
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (editMode) {
      setUserValue(editData?.user?.userId)
      setDocValue(editData?.doctor?.doctorId)
    }
    // eslint-disable-next-line
  }, [editData])

  const onChangeUserValue = ({ target }) => {
    setUserValue(target.value)
    setUserError(false)
  }
  const onChangeDocValue = ({ target }) => {
    setDocValue(target.value)
    setDocError(false)
  }
  const onSubmit = ({ title, diagnose, symptoms }) => {
    userValue === '' && setUserError(true)
    docValue === '' && setDocError(true)
    const anyGridItemEmpty = gridItems.some(
      item =>
        item.name.trim() === '' ||
        item.dosage.trim() === '' ||
        item.frequency.trim() === '' ||
        item.duration.trim() === '' ||
        item.instruction.trim() === ''
    )
    if (anyGridItemEmpty) {
      setGridError('Please Fill Medicine Details')
    } else if (userError || docError) {
      toast.error(`Please add ${userError ? 'patient' : 'doctor'}`)
    } else {
      setGridError('')
      const formData = {
        title,
        diagnose,
        symptoms,
        userId: userValue,
        doctorId: docValue,
        medicines: gridItems?.map(item => {
          return {
            name: item?.name,
            dosage: item?.dosage,
            frequency: item?.frequency,
            duration: item?.duration,
            instruction: item?.instruction
          }
        })
      }
      setLoading(true)
      if (editMode) {
        formData.id = editData.id
        update(formData).then(res => {
          if (res?.success) {
            //** Commented this code because we are fetching the data again from API after update */

            // const updatedPrescriptions = prescriptions.map(prescription => {
            //   if (prescription.id === editData.id) {
            //     return {
            //       title,
            //       diagnose,
            //       symptoms,
            //       user: userValue,
            //       doc: docValue,
            //       medicines: gridItems?.map(item => {
            //         return {
            //           name: item?.name,
            //           dosage: item?.dosage,
            //           frequency: item?.frequency,
            //           duration: item?.duration,
            //           instruction: item?.instruction
            //         }
            //       })
            //     }
            //   }
            //   return prescription
            // })
            // setPrescriptions(updatedPrescriptions)
            setLoading(false)
            toggle()
            fetchAll()
            toast.success('Prescription updated successfully')
            resetForm()
          } else {
            setLoading(false)
            toast.error('Failed to update prescription')
          }
        })
      } else {
        create(formData).then(res => {
          if (res?.success) {
            setPrescriptions([res?.prescription, ...prescriptions])
            setLoading(false)
            toggle()
            toast.success('Prescription created successfully')
            resetForm()
          } else {
            setLoading(false)
            toast.error('Failed to create prescription')
          }
        })
      }
    }
  }

  return (
    <Dialog
      fullWidth
      open={open}
      maxWidth='md'
      scroll='body'
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') {
          handleClose()
        }
      }}
      TransitionComponent={Transition}
    >
      <DialogTitle sx={{ borderBottom: '1px solid #999999', paddingBottom: '8px', mx: '30px', pl: '0px !important' }}>
        {`${editMode ? 'Edit' : 'Add'} prescription`}
      </DialogTitle>
      <IconButton size='small' onClick={handleClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
        <Image src='/icons/Close.png' alt='Close' width={20} height={20} />
      </IconButton>
      <DialogContent sx={{ position: 'relative' }}>
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
        <Box sx={{ position: 'relative', filter: loading ? 'blur(5px)' : 'none', mx: '10px' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <CustomInputLabel label={<span className='required-label'>Title</span>} />
                <FormControl fullWidth sx={{ mb: 0 }}>
                  <Controller
                    name='title'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value || ''}
                        onChange={onChange}
                        placeholder='Title'
                        error={Boolean(errors.title)}
                      />
                    )}
                  />
                  {errors.title && <FormHelperText sx={{ color: 'error.main' }}>{errors.title.message}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomInputLabel label={<span className='required-label'>User</span>} />
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <Controller
                    name='user'
                    control={control}
                    rules={{ required: true }}
                    render={() => (
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={userValue}
                        onChange={onChangeUserValue}
                        name='user'
                        error={userError}
                        displayEmpty
                        IconComponent={() => (
                          <Image src='/icons/button_angle-down.svg' alt='down arrow' width={24} height={24} />
                        )}
                      >
                        <MenuItem disabled value={''}>
                          {'Please select User'}
                        </MenuItem>
                        {patients.length === 0 ? (
                          <MenuItem disabled value={''}>
                            No User Found
                          </MenuItem>
                        ) : (
                          patients?.map(item => (
                            <MenuItem key={item?.id} value={item?.id}>
                              {item?.name}
                            </MenuItem>
                          ))
                        )}
                      </Select>
                    )}
                  />
                  {}
                  {userError && <FormHelperText sx={{ color: 'error.main' }}>{'user is required'}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomInputLabel label={<span className='required-label'>Doctor</span>} />
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <Controller
                    name='doc'
                    control={control}
                    rules={{ required: true }}
                    render={() => (
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={docValue}
                        onChange={onChangeDocValue}
                        name='doc'
                        error={docError}
                        displayEmpty
                        IconComponent={() => (
                          <Image src='/icons/button_angle-down.svg' alt='down arrow' width={24} height={24} />
                        )}
                      >
                        <MenuItem disabled value={''}>
                          {'Please select Doctor'}
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
                    )}
                  />
                  {docError && <FormHelperText sx={{ color: 'error.main' }}>{'doctor is required'}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomInputLabel label={<span className='required-label'>Diagnose</span>} />
                <FormControl fullWidth sx={{ mb: 0 }}>
                  <Controller
                    name='diagnose'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        // label='Name'
                        onChange={onChange}
                        placeholder='Diagnose'
                        error={Boolean(errors.diagnose)}
                      />
                    )}
                  />
                  {errors.diagnose && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.diagnose.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomInputLabel label={<span className='required-label'>symptoms</span>} />
                <FormControl fullWidth sx={{ mb: 0 }}>
                  <Controller
                    name='symptoms'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        // label='Name'
                        onChange={onChange}
                        placeholder='Symptoms'
                        error={Boolean(errors.symptoms)}
                      />
                    )}
                  />
                  {errors.symptoms && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.symptoms.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Medicine
                  setGridError={setGridError}
                  gridItems={gridItems}
                  setGridItems={setGridItems}
                  editMode={editMode}
                  editMedicines={editData?.medicines}
                />
                <FormHelperText sx={{ color: 'error.main' }}>
                  {gridError && (
                    <FormHelperText
                      sx={{
                        color: 'error.main',
                        mx: '20px'
                      }}
                    >
                      {gridError}
                    </FormHelperText>
                  )}
                </FormHelperText>
              </Grid>
            </Grid>
            <DialogActions sx={{ justifyContent: 'end', pr: '0px' }}>
              <Button
                variant='outlined'
                onClick={handleClose}
                sx={{
                  borderRadius: '8px',
                  width: '89px',
                  height: '40px',
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
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                variant='contained'
                type='submit'
                sx={{
                  mr: 1,
                  width: '89px',
                  height: '40px',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                  '&:hover': {
                    background: '#043919'
                  }
                }}
              >
                {editMode ? 'Update' : 'Add'}
              </Button>
            </DialogActions>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default AddPrescription
