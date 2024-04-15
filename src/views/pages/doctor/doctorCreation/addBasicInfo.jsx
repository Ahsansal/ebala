//** React Imports
import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
//** MUI Imports
import {
  Box,
  Chip,
  Grid,
  Paper,
  Alert,
  Avatar,
  Button,
  Select,
  MenuItem,
  TextField,
  IconButton,
  FormControl,
  FormHelperText
} from '@mui/material'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
//** External Imports
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { Icon } from '@iconify/react'
import { yupResolver } from '@hookform/resolvers/yup'
//** Internal Imports
import CustomInputLabel from 'src/views/components/inputLabel'
//APIs Imports
import { getAll } from 'src/services/services.service'
import { updateDoctor } from 'src/services/doctor.service'

const doctorStatus = ['Active', 'In Active']
const genderDoctor = ['Male', 'Female', 'Other']

const AddBasicInfo = ({
  handleClose,
  handleNext,
  setDoctorData,
  editDoctorData,
  doctorId,
  setLoading,
  userFetchData
}) => {
  // const [companyLogo, setLogo] = useState(null)
  const [image, setImage] = useState('')
  const [logoError, setLogoError] = useState('')
  // const [logoFileID, setLogoFileID] = useState('')
  const [logoFileURL, setLogoFileURL] = useState('')
  const [services, setServices] = useState([])
  const [serviceError, setServiceError] = useState(false)
  // const [selectedService, setSelectedService] = useState([])
  const [doctorService, setDoctorService] = useState([])

  const defaultValue = {
    name: '',
    address: '',
    phoneNo: '',
    email: '',
    webUrl: ''
  }

  const dummyAvatar =
    'https://images.pexels.com/photos/20434627/pexels-photo-20434627/free-photo-of-view-t-b-o-tang-d-ng-dinh-da-n-ng.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'

  const schema = yup.object().shape({
    name: yup.string().required(),
    nameAr: yup.string().required(),
    email: yup.string().typeError('email field is required').required(),
    password: !doctorId && yup.string().typeError('password field is required').required(),
    status: yup.string().typeError('status field is required').required(),
    services: !doctorId && yup.number().typeError('services field is required').required(),
    gender: yup.string().typeError('Gender field is required').required(),
    dob: yup.string().required(),
    totalExperience: yup.string().typeError('totalExperience field is required').required(),
    specialization: yup.string().typeError('specialization field is required').required()
  })
  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValue,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const setDefaultValues = doctorData => {
    const { name, nameAr, email, gender, dob, totalExperience, specialization, status, services, profileUrl } =
      doctorData
    setValue('name', name)
    setValue('nameAr', nameAr)
    setValue('email', email)
    setValue('gender', gender)
    setValue('dob', dob)
    setValue('totalExperience', totalExperience)
    setValue('specialization', specialization)
    setValue('status', status === '0' ? 'Active' : 'In Active')
    setDoctorService(services.map(obj => obj.service?.serviceId))
  }

  const fetchService = async () => {
    const res = await getAll()
    if (res?.success) {
      setServices(res?.services)
    } else {
      toast.error('Server Error')
    }
  }

  useEffect(() => {
    fetchService()
    return () => {
      reset(defaultValue)
      setServiceError(false)
    }
    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (Object.entries(editDoctorData).length > 0) {
      setDefaultValues(editDoctorData)
    }
    //eslint-disable-next-line
  }, [editDoctorData])

  const handleChange = ({ target: { value } }) => {
    setServiceError(false)
    setDoctorService(value)
  }

  const handleRemoveChip = valueToRemove => {
    if (doctorService.length === 0) {
      setServiceError(true)
    }
    const updateDoctorService = doctorService.filter(value => value !== valueToRemove)
    setDoctorService(updateDoctorService)
  }

  const handleRemoveImage = async () => {
    setImage(null)
  }

  const handleImageChange = async event => {
    const file = event.target.files[0]
    if (file) {
      // setLogo(file)
      setLogoError('')
      const reader = new FileReader()
      reader.onload = async () => {
        setImage(reader.result)
        const formData = new FormData()
        formData.append('profileUrl', file)
        setLogoFileURL(file?.name)
        // const res = await addSchoolLogo(formData)
        // if (res?.success) {
        //   setLogoFileID(res?.file?.id)
        //   setLogoFileURL(res?.file?.url)
        // }
      }
      reader.readAsDataURL(file)
    }
  }

  const classes = {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    },
    avatar: {
      width: 150,
      height: 150
    },
    input: {
      display: 'none'
    }
  }

  const onSubmit = async data => {
    if (!doctorService.length) {
      setServiceError(true)
      return
    }
    const doctorData = {
      ...data,
      status: data?.status === 'Active' ? true : false,
      services: doctorService,
      profileUrl: logoFileURL || dummyAvatar
    }
    if (doctorId) {
      const { password, ...rest } = doctorData
      setLoading(true)
      const res = await updateDoctor({
        id: doctorId,
        ...rest
      })
      if (res?.success) {
        setLoading(false)
        userFetchData()
        handleNext()
        toast.success('Doctor Information updated successfully!')
      } else {
        setLoading(false)
        toast.error('Server Error')
      }
    } else {
      setDoctorData(doctorData)
      handleNext()
    }
  }

  // const handleInputChange = value => {
  //   setSelectedService(value)
  // }
  // const handleDeleteChip = id => {
  //   setSelectedService(prevStages => prevStages.filter(stageId => stageId !== id))
  // }

  return (
    <div className='relative'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} style={{ marginTop: '10px' }}>
          <Grid item xs={12} md={7}>
            <Paper>
              <div className={classes.root}>
                <Box
                  sx={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 5
                  }}
                >
                  {image ? (
                    <div className='flex gap-[10px] w-full items-center relative'>
                      <IconButton
                        sx={{ position: 'absolute', left: 85, top: -3, width: 15, height: 10, zIndex: '1' }}
                        onClick={handleRemoveImage}
                        color='secondary'
                      >
                        <RemoveCircleOutlineIcon sx={{ color: 'red', fontSize: 30 }} />
                      </IconButton>
                      <div>
                        <Avatar
                          src={image}
                          alt='Uploaded'
                          style={{
                            width: '96px',
                            height: '96px',
                            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                            borderRadius: '0px'
                          }}
                        />
                      </div>
                      <div className='flex flex-col gap-1 cursor-pointer'>
                        <span className='text-[#666666] font-medium text-[16px] cursor-pointer'>Doctor Profile</span>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className='flex gap-[10px] w-max  items-center justify-start'>
                        <input
                          accept='image/*'
                          id='image-upload'
                          type='file'
                          onChange={handleImageChange}
                          hidden
                          className='!h-1 !w-1'
                        />
                        <div
                          style={{
                            cursor: 'pointer',
                            border: '1px solid',
                            borderRadius: '10px',
                            position: 'relative'
                          }}
                          className='avatar-container'
                          onMouseEnter={() => {
                            document.getElementById('overlay').style.opacity = 1
                          }}
                          onMouseLeave={() => {
                            document.getElementById('overlay').style.opacity = 0
                          }}
                        >
                          <Avatar
                            alt='Uploaded'
                            style={{
                              width: '96px',
                              height: '96px',
                              cursor: 'pointer',
                              border: '1px solid',
                              borderRadius: '10px'
                            }}
                            src='/images/logoDoctor.png'
                          />
                          <div
                            id='overlay'
                            className='absolute text-center bottom-0 w-full rounded-br-md rounded-bl-md'
                            style={{
                              background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.34), rgba(0, 0, 0, 1))',
                              opacity: 0,
                              transition: 'opacity 0.3s',
                              height: '26px'
                            }}
                          >
                            <span className='text-[#ffffff] font-medium text-[12px] cursor-pointer'>Upload</span>
                          </div>
                        </div>

                        <div className='flex flex-col'>
                          <span className='text-[#666666] font-medium text-[16px] cursor-pointer'>Doctor Profile</span>
                          <span className='text-[#666666] font-normal text-[14px] cursor-pointer'>
                            <span className='text-[#04463A] font-semibold text-[14px] cursor-pointer underline mr-1'>
                              Upload
                            </span>
                          </span>
                        </div>
                      </label>
                    </div>
                  )}
                </Box>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
          <CustomInputLabel label={<span className='required-label'>Docter Name</span>} />
            <FormControl fullWidth>
              <Controller
                name='name'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value || ''}
                    onChange={onChange}
                    placeholder='Doctor Name'
                    error={Boolean(errors.name)}
                    helperText={errors.name ? errors.name.message : ''}
                    className=' p-[10px] '
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
             <CustomInputLabel label={<span className='required-label'>Doctor Name - Secondary Name</span>} />
            <FormControl fullWidth>
              <Controller
                name='nameAr'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value || ''}
                    onChange={onChange}
                    placeholder='Doctor Name'
                    error={Boolean(errors.nameAr)}
                    helperText={errors.nameAr ? errors.nameAr.message : ''}
                    className=' p-[10px] '
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
          <CustomInputLabel label={<span className='required-label'>E-mail</span>} />
            <FormControl fullWidth>
              <Controller
                name='email'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value || ''}
                    onChange={onChange}
                    placeholder='E-mail'
                    error={Boolean(errors.email)}
                    helperText={errors.email ? errors.email.message : ''}
                    className=' p-[10px] '
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
          <CustomInputLabel label={<span className='required-label'>Password</span>} />
            <FormControl fullWidth>
              <Controller
                name='password'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value || ''}
                    type='password'
                    onChange={onChange}
                    placeholder={doctorId ? 'Password cannot be changed' : 'Password'}
                    disabled={doctorId}
                    error={Boolean(errors.password)}
                    className='p-[10px]'
                  />
                )}
              />
              {errors.password && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.password.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={6}>
          <CustomInputLabel label={<span className='required-label'>Service</span>} />
            <FormControl sx={{ width: '100%' }}>
              <Controller
                name='services'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <Select
                    multiple
                    displayEmpty
                    value={doctorService}
                    name='services'
                    error={Boolean(errors.services) || serviceError}
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
              {(errors.services || serviceError) && (
                <FormHelperText sx={{ color: 'error.main' }}>minimum 1 service is required</FormHelperText>
              )}
            </FormControl>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, marginTop: '10px' }}>
              {doctorService?.map(value => (
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
          <Grid item xs={12} sm={6}>
          <CustomInputLabel label={<span className='required-label'>Status</span>} />
            <FormControl fullWidth sx={{ mb: 3 }}>
              <Controller
                name='status'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <Select
                    labelId='demo-simple-select-label'
                    value={value || ''}
                    onChange={onChange}
                    error={Boolean(errors?.status)}
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
                      {'Doctor Status'}
                    </MenuItem>
                    {doctorStatus?.map(option => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.status && <FormHelperText sx={{ color: 'error.main' }}>{errors.status.message}</FormHelperText>}
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
                      <img
                        src='/icons/button_angle-down.svg'
                        alt='down arrow'
                        style={{ width: '24px', height: '24px', marginRight: '8px' }}
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
              {errors.gender && <FormHelperText sx={{ color: 'error.main' }}>{errors.gender.message}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
          <CustomInputLabel label={<span className='required-label'>Date of birth</span>} />
            <FormControl fullWidth sx={{ mb: 0 }}>
              <Controller
                name='dob'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    type='date'
                    value={value}
                    onChange={onChange}
                    error={Boolean(errors.dob)}
                    className=' p-[10px] '
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                )}
              />
              {errors.dob && <FormHelperText sx={{ color: 'error.main' }}>{errors.dob.message}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
          <CustomInputLabel label={<span className='required-label'>Total Experience</span>} />
            <FormControl fullWidth>
              <Controller
                name='totalExperience'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value || ''}
                    onChange={onChange}
                    placeholder='School Mission'
                    error={Boolean(errors.totalExperience)}
                    helperText={errors.totalExperience ? errors.totalExperience.message : ''}
                    className='p-[10px]'
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
          <CustomInputLabel label={<span className='required-label'>Specialization</span>} />
            <FormControl fullWidth>
              <Controller
                name='specialization'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value || ''}
                    onChange={onChange}
                    placeholder='Specialization'
                    error={Boolean(errors.specialization)}
                    helperText={errors.specialization ? errors.specialization.message : ''}
                    className='p-[10px]'
                  />
                )}
              />
            </FormControl>
          </Grid>
        </Grid>

        {logoError && (
          <Alert severity='error' className='mt-2'>
            {logoError}
          </Alert>
        )}
        <Grid
          item
          xs={12}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            gap: '10px',
            marginTop: '38px'
          }}
        >
          <Button
            sx={{
              mr: 1,
              width: 'auto',
              height: '40px',
              borderRadius: '8px',
              color: '#4D5856',
              backgroundColor: '#CCCFCF',
              textTransform: 'capitalize'
            }}
            onClick={handleClose}
          >
            Exit
          </Button>
          <Button
            variant='contained'
            type='submit'
            sx={{
              width: 'auto',
              height: '40px',
              borderRadius: '8px',
              color: '#FFFFFF',
              textTransform: 'capitalize'
            }}
          >
            {doctorId ? 'Update & Next' : 'Next'}
          </Button>
        </Grid>
      </form>
    </div>
  )
}

export default AddBasicInfo
