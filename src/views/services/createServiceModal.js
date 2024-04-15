import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import {
  Card,
  CardContent,
  CardHeader,
  DialogContentText,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { createServices } from 'src/services/patient.service'
import { useState } from 'react'
import { useRouter } from 'next/router'

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
  // border: '2px solid #000',
  // borderRadius: 20,
  boxShadow: 24,
  p: 4
}

export default function ServiceModal({ serviceFetchData }) {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [name, setName] = useState('')
  const [status, setStatus] = useState('')
  const [error, setError] = useState()

  const data = { name, status }
  const handleCreateNewUser = async e => {
    e.preventDefault()
    const response = await createServices(data)
    if (response.success) {
      setOpen(false)
      serviceFetchData()
    } else {
      setError(response.message)
    }
  }

  return (
    <div>
      <Button variant='contained' endIcon={<AddIcon />} onClick={handleOpen}>
        {' '}
        Add Service{' '}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Card sx={style}>
          <CardHeader title='Create New Service' />
          <CardContent>
            <form
            // onSubmit={e => e.preventDefault()}
            >
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Name'
                    placeholder='Create email'
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                  <DialogContentText sx={{ mb: 6 }}>
                    <div className='text-red-700 px-5'>{error}</div>
                  </DialogContentText>
                </Grid>

                {/* <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        type='email'
                                        label='Email'
                                        placeholder='carterleonard@gmail.com'
                                        value={email} onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor='form-layouts-basic-password'>Password</InputLabel>
                                        <OutlinedInput
                                            label='Password'
                                            value={password} onChange={(e) => setPassword(e.target.value)}
                                            id='form-layouts-basic-password'

                                            aria-describedby='form-layouts-basic-password-helper'
                                            endAdornment={
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                        edge='end'
                                                        aria-label='toggle password visibility'
                                                    >
                                                        {/* <Icon icon={values.showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </Grid> */}
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    gap: 5,
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 5
                  }}
                >
                  <Button type='submit' variant='contained' size='large' onClick={handleCreateNewUser}>
                    Create
                  </Button>
                  {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography sx={{ mr: 2 }}>Already have an account?</Typography>
                                    <Link href='/' onClick={e => e.preventDefault()}>
                                        Log in
                                    </Link>
                                </Box> */}
                </Box>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Modal>
    </div>
  )
}
