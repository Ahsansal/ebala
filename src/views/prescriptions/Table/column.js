//** React Imports
import { useState } from 'react'
//** MUI Imports
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Menu,
  MenuItem,
  Typography
} from '@mui/material'
//** Internal Imports
import Icon from 'src/@core/components/icon'
import DeleteGifIcon from 'src/gifs/delete.json'
//** External Imports
import Lottie from 'lottie-react'
import toast from 'react-hot-toast'
import { FadeLoader } from 'react-spinners'
//** API Imports
import { remove } from 'src/services/prescriptions.service'

const Columns = ({ toggleEdit, data, setPrescriptions }) => {
  const RowOptions = ({ id }) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const [open, setOpen] = useState(false)
    const [delLoading, setDelLoading] = useState(false)
    const rowOptionsOpen = Boolean(anchorEl)

    const handleRowOptionsClick = event => {
      setAnchorEl(event.currentTarget)
    }

    const handleRowOptionsClose = () => {
      setAnchorEl(null)
    }
    const handleEdit = id => {
      // openEditModal(true)
      toggleEdit(id)
      handleRowOptionsClose()
    }

    const handleClickOpen = () => {
      setOpen(true)
      handleRowOptionsClose()
    }

    const handleClose = () => {
      setOpen(false)
      handleRowOptionsClose()
    }

    const handleDelete = async id => {
      setDelLoading(true)
      const res = await remove(id)
      if (res?.success) {
        setPrescriptions(data.filter(prescription => prescription.id !== id))
        setDelLoading(false)
        toast.success('Prescription removed Successfully!')
      } else {
        setDelLoading(false)
        toast.error('Failed to remove prescription')
      }
      handleRowOptionsClose()
      handleClose()
    }

    return (
      <>
        <IconButton size='small' onClick={handleRowOptionsClick} sx={{ backgroundColor: '#0000000D' }}>
          <Icon icon='mdi:dots-horizontal' style={{ color: '#333333' }} />
        </IconButton>
        <Menu
          keepMounted
          anchorEl={anchorEl}
          open={rowOptionsOpen}
          onClose={handleRowOptionsClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          PaperProps={{ style: { minWidth: '8rem' } }}
        >
          <MenuItem onClick={() => handleEdit(id)} sx={{ '& svg': { mr: 2 } }}>
            <Icon color='primary' icon='mdi:pencil-outline' fontSize='20px' />
            Edit
          </MenuItem>
          <MenuItem onClick={() => handleClickOpen()} sx={{ '& svg': { mr: 2 } }}>
            <Icon color='#a70000' icon='mdi:delete-outline' fontSize='20px' />
            Delete
          </MenuItem>
        </Menu>
        {open && (
          <Dialog open={open} onClose={handleClose}>
            {delLoading && (
              <div
                style={{
                  width: '100%',
                  height: '90%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  zIndex: 10
                }}
              >
                <FadeLoader color='#04463A' />
              </div>
            )}
            <Box sx={{ filter: delLoading ? 'blur(5px)' : 'none' }}>
              <DialogContent
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  position: 'relative'
                }}
              >
                <Lottie
                  animationData={DeleteGifIcon}
                  loop
                  autoplay
                  style={{ width: '300px', height: '250px' }}
                  rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
                />
                <Box sx={{ mt: '10px', width: '25vw' }}>
                  <Typography
                    sx={{
                      mb: 2,
                      fontSize: '26px',
                      fontWeight: '600',
                      color: '#333333'
                    }}
                    align='center'
                  >
                    {'Are you sure?'}
                  </Typography>
                  <Typography align='center'>{'You want to delete this Prescription'}</Typography>
                </Box>
              </DialogContent>
              <DialogActions sx={{ mb: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button
                  variant='contained'
                  onClick={handleClose}
                  sx={{
                    backgroundColor: '#B9BBBD',
                    width: '100px'
                  }}
                  color='secondary'
                >
                  No
                </Button>
                <Button
                  variant='contained'
                  onClick={() => handleDelete(id)}
                  sx={{
                    backgroundColor: '#FB4B4B',
                    width: '100px',
                    '&:hover': {
                      backgroundColor: 'red'
                    }
                  }}
                >
                  Yes
                </Button>
              </DialogActions>
            </Box>
          </Dialog>
        )}
      </>
    )
  }

  const column = [
    {
      flex: 0.05,
      minWidth: 50,
      field: 'id',
      headerName: '#',
      align: 'center',
      headerAlign: 'center'
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'title',
      headerName: 'Prescription title',
      align: 'center',
      headerAlign: 'center',
      renderCell: ({ row }) => {
        const { title } = row
        return (
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', height: 'fit-content' }}>
            <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#333333' }}>{title}</Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      minWidth: 100,
      field: 'diagnose',
      headerName: 'Diagnose',
      align: 'center',
      headerAlign: 'center',
      renderCell: ({ row }) => {
        const { diagnose } = row
        return (
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', height: 'fit-content' }}>
            <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#333333' }}>{diagnose}</Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'symptoms',
      headerName: 'Symptoms',
      align: 'center',
      headerAlign: 'center',
      renderCell: ({ row }) => {
        const { symptoms } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', height: 'fit-content' }}>
            <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#333333' }}>{symptoms}</Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'user',
      headerName: 'Patient Name',
      align: 'center',
      headerAlign: 'center',
      renderCell: ({ row }) => {
        const {
          user: { name }
        } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', height: 'fit-content' }}>
            <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#333333' }}>{name}</Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'doctor',
      headerName: 'Doctor Name',
      align: 'center',
      headerAlign: 'center',
      renderCell: ({ row }) => {
        const {
          doctor: { name }
        } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', height: 'fit-content' }}>
            <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#333333' }}>{name}</Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 90,
      sortable: false,
      align: 'center',
      headerAlign: 'center',
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => <RowOptions id={row.id} />
    }
  ]

  return column
}

export default Columns
