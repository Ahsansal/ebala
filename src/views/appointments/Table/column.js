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
import { TiCancelOutline } from 'react-icons/ti'
import DeleteGifIcon from 'src/gifs/delete.json'
import CancelAppointment from '../CancelAppointment'
//** External Imports
import Lottie from 'lottie-react'
import toast from 'react-hot-toast'
import { FadeLoader } from 'react-spinners'
//** API Imports
import { remove } from 'src/services/appointments.service'
import { formatDate } from 'src/@core/utils/format'

const Columns = ({ fetchAppointment, toggleEdit, Background_Color }) => {
  const RowOptions = ({ id }) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const [open, setOpen] = useState(false)
    const [delLoading, setDelLoading] = useState(false)
    const [openCancelModel, setOpenCancelModel] = useState(false)
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

    const handleCancelAppointment = id => {
      setOpenCancelModel(true)
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
        setDelLoading(false)
        toast.success('Appointment removed successfully!')
        fetchAppointment()
      } else {
        setDelLoading(false)
        toast.error('Server error')
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
          <MenuItem onClick={() => handleCancelAppointment(id)} sx={{ '& svg': { mr: 2 } }}>
            <TiCancelOutline color='#a70000' fontSize='20px' />
            Cancel
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
                  <Typography align='center'>{'You want to delete this Appointment'}</Typography>
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

        {openCancelModel && (
          <CancelAppointment
            id={id}
            open={openCancelModel}
            close={setOpenCancelModel}
            fetchAppointment={fetchAppointment}
          />
        )}
      </>
    )
  }

  const column = [
    {
      flex: 0.05,
      minWidth: 50,
      field: 'id',
      headerName: 'Id'
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'doctor',
      headerName: 'Doctor',
      renderCell: ({ row }) => {
        const { doctor } = row
        return (
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', height: 'fit-content' }}>
            <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#333333' }}>{doctor?.name}</Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      minWidth: 100,
      field: 'user',
      headerName: 'Patient',
      align: 'left',
      headerAlign: 'left',
      renderCell: ({ row }) => {
        const { user } = row
        return (
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', height: 'fit-content' }}>
            <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#333333' }}>{user?.name}</Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'service',
      headerName: 'Service',
      align: 'left',
      headerAlign: 'left',
      renderCell: ({ row }) => {
        const { service } = row
        return (
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', height: 'fit-content' }}>
            <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#333333' }}>{service?.name}</Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'date',
      headerName: 'Date',
      align: 'left',
      headerAlign: 'left',
      renderCell: ({ row }) => {
        const { timeSlot } = row
        return (
          <Box>
            <Typography sx={{ textAlign: 'center', fontSize: '14px', fontWeight: '500', color: '#333333' }}>
              {`${timeSlot?.day}, ${formatDate(timeSlot?.date)}`}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'timeSlot',
      headerName: 'TimeSlot',
      align: 'center',
      headerAlign: 'center',
      renderCell: ({ row }) => {
        const { timeSlot } = row
        return (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              height: 'fit-content'
            }}
          >
            <Typography
              sx={{
                textAlign: 'center',
                m: '5px',
                fontSize: '14px',
                fontWeight: '500',
                color: 'white',
                backgroundColor: '#4F786A',
                px: '12px',
                py: '5px',
                borderRadius: '30px'
              }}
            >
              {`${timeSlot?.startTime} - ${timeSlot?.endTime}`}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'isCancel',
      headerName: 'Status',
      align: 'center',
      headerAlign: 'center',
      renderCell: ({ row }) => {
        const { isCancel } = row
        return (
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', height: 'fit-content' }}>
            <Typography sx={{ fontSize: '14px', fontWeight: '500', color: `${isCancel ? '#a70000' : '#333333'}` }}>
              {isCancel ? 'Cancelled' : 'Active'}
            </Typography>
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
