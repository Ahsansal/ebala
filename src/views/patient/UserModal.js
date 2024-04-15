// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import { getAllDoctor, getAllUser, updateDoctor, updateUser } from 'src/services/patient.service'
import { useRouter } from 'next/router'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { FilledInput, FormControl, Grid, IconButton, InputAdornment, InputLabel } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const UserModal = ({ user, userFetchData }) => {
  // ** State
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const id = user.id
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState()
  const [showPassword, setShowPassword] = useState(false)

  const data = { name, email, password, id }
  const handleSubmit = async () => {
    const response = await updateUser(data)
    if (response.success) {
      setOpen(false)
      userFetchData()
    } else {
      setError(response.message)
    }
  }

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  return (
    <Fragment>
      <Button variant='contained' endIcon={<MoreHorizIcon />} onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog sx={{ fullWidth: 900 }} open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Edit the Record</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>Edit Name, Email and Password here..</DialogContentText>
          <TextField
            id='name'
            autoFocus
            fullWidth
            type='text'
            name={'name'}
            label='Name'
            defaultValue={user.name}
            onChange={e => setName(e.target.value)}
          />
        </DialogContent>
        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}></DialogContentText>
          <TextField
            id='email'
            autoFocus
            fullWidth
            type='email'
            defaultValue={user.email}
            name={'email'}
            label='Email Address'
            onChange={e => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>
            <InputLabel htmlFor='filled-adornment-password'>Password</InputLabel>
            <FilledInput
              autoFocus
              fullWidth
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
              defaultValue={user.password}
              onChange={e => setPassword(e.target.value)}
            />
          </DialogContentText>
        </DialogContent>

        <DialogContentText sx={{ mb: 6 }}>
          <div className='text-red-700 px-5'>{error}</div>
        </DialogContentText>

        <DialogActions className='dialog-actions-dense'>
          <Button variant='contained' onClick={handleClose}>
            Close
          </Button>
          <Button variant='contained' onClick={handleSubmit}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default UserModal
