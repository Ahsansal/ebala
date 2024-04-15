import React, { useState } from 'react'
//** MUI Imports
import {
  Box,
  Card,
  Grid,
  Radio,
  Modal,
  Button,
  TextField,
  Typography,
  RadioGroup,
  IconButton,
  CardContent,
  DialogTitle,
  FilledInput,
  InputAdornment,
  FormControlLabel
} from '@mui/material'
import { AddIcon, Visibility, VisibilityOff } from '@mui/icons-material'
//** API Imports
import { createDoctor } from 'src/services/user.service'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: 300,
    sm: 400,
    md: 500,
    lg: 500,
    xl: 600
  },
  bgcolor: 'background.paper',
  boxShadow: 24,
  paddingX: 2
}

export default function DoctorCreateModal({ userFetchData }) {
  // const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [gender, setGender] = useState('male')
  const [language, setLanguage] = useState('')
  const [dob, setDob] = useState()

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const data = { name, email, password, language, gender, dob }
  const handleCreateNewUser = async e => {
    e.preventDefault()
    const response = await createDoctor(data)
    if (response.success) {
      setOpen(false)
      userFetchData()
    } else {
      setError(response.message)
    }
  }

  const handleChange = event => {
    setGender(event.target.value)
  }

  return (
    <>
      <Button variant='contained' endIcon={<AddIcon />} onClick={handleOpen}>
        {' '}
        Add New Doctor{' '}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Card sx={style}>
          <DialogTitle
            sx={{
              borderBottom: '1px solid #999999',
              paddingBottom: '8px',
              mx: '25px',
              pl: '0px !important',
              marginBlock: 6
            }}
          >
            Add New Doctor
          </DialogTitle>
          <IconButton size='small' onClick={handleClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <img src='/icons/Close.png' alt='Close' style={{ cursor: 'pointer' }} />
          </IconButton>
          <CardContent>
            <form>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <Typography variant={'body1'} sx={{ paddingLeft: 2 }}>
                    Name
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder='Create name'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    type='email'
                    autoComplete=''
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant={'body1'} sx={{ paddingLeft: 2 }}>
                    Email
                  </Typography>
                  <TextField
                    fullWidth
                    autoComplete=''
                    type='email'
                    placeholder='carterleonard@gmail.com'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant={'body1'} sx={{ paddingLeft: 2 }}>
                    Date of birth
                  </Typography>
                  <TextField fullWidth value={dob} onChange={e => setDob(e.target.value)} type='date' autoComplete='' />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant={'body1'} sx={{ paddingLeft: 2 }}>
                    Language
                  </Typography>
                  <TextField
                    fullWidth
                    autoComplete=''
                    type='text'
                    placeholder='Enter language'
                    value={language}
                    onChange={e => setLanguage(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant={'body1'} sx={{ paddingLeft: 2 }} htmlFor='filled-adornment-password'>
                    Password
                  </Typography>

                  <FilledInput
                    fullWidth
                    autoComplete=''
                    id='filled-adornment-password'
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge='end'
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    defaultValue={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  {/* </DialogContentText > */}
                </Grid>
                <Grid item xs={12}>
                  <Typography variant={'body2'} sx={{ paddingY: 0 }}>
                    Select Gander
                  </Typography>
                  <RadioGroup
                    aria-labelledby='demo-controlled-radio-buttons-group'
                    name='controlled-radio-buttons-group'
                    value={gender}
                    onChange={handleChange}
                    sx={{ display: 'flex' }}
                  >
                    <FormControlLabel value='male' control={<Radio />} label='Male' />
                    <FormControlLabel value='female' control={<Radio />} label='Female' />
                  </RadioGroup>
                </Grid>
                {/* <Grid item xs={12}> */}
                <div className='text-red-700 pl-6'>{error}</div>
                {/* </Grid> */}
                <Grid item xs={12}>
                  <Box
                    sx={{
                      gap: 5,
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end',
                      marginTop: 0
                    }}
                  >
                    <Button
                      type='submit'
                      variant='contained'
                      size='large'
                      onClick={handleClose}
                      sx={{
                        borderRadius: '8px',
                        width: '89px',
                        background: '#CCCFCF',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#242424',
                        border: '0px',
                        '&:hover': {
                          background: '#A0A3A3',
                          border: '0px'
                        }
                      }}
                    >
                      Cancel
                    </Button>

                    <Button
                      type='submit'
                      variant='contained'
                      size='large'
                      onClick={handleCreateNewUser}
                      sx={{
                        borderRadius: '8px',
                        width: '89px',
                        fontSize: '14px',
                        fontWeight: '600',
                        border: '0px',
                        '&:hover': {
                          background: '#A0A3A3',
                          border: '0px'
                        }
                      }}
                    >
                      Create
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Modal>
    </>
  )
}
