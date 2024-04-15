import { useState } from 'react'
import Lottie from 'lottie-react'
import toast from 'react-hot-toast'
import { FadeLoader } from 'react-spinners'
import Icon from 'src/@core/components/icon'
import DeleteGifIcon from 'src/gifs/delete.json'
import { formatDate } from 'src/@core/utils/format'
import { remove } from 'src/services/notifications.service'
import { Box, Button, Dialog, Typography, DialogActions, DialogContent } from '@mui/material'

const Columns = ({ updateNotifications, background_color }) => {
  const DeleteModal = ({ id }) => {
    const [open, setOpen] = useState(false)
    const [delLoading, setDelLoading] = useState(false)

    const handleClickOpen = () => {
      setOpen(true)
    }

    const handleClose = () => {
      setOpen(false)
    }

    const handleDelete = async id => {
      setDelLoading(true)
      const res = await remove(id)
      if (res?.success) {
        setDelLoading(false)
        toast.success('Notification removed Successfully!')
        updateNotifications()
      } else {
        setDelLoading(false)
        toast.error('Server error')
      }
      handleClose()
    }

    return (
      <>
        <div onClick={handleClickOpen} className='cursor-pointer'>
          <Icon color='#a70000' icon='mdi:delete-outline' fontSize='25px' />
        </div>
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
                  <Typography align='center'>{'You want to delete this Notification'}</Typography>
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
      headerName: 'Id'
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'title',
      headerName: 'Title',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: 'fit-content' }}>
          <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#333333' }}>{row.title}</Typography>
        </Box>
      )
    },
    {
      flex: 0.2,
      minWidth: 150,
      field: 'message',
      headerName: 'Message'
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'dateTime',
      headerName: 'Date Time',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: 'fit-content' }}>
          <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#333333' }}>
            {formatDate(row.dateTime)}
          </Typography>
        </Box>
      )
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'doctor',
      headerName: 'Doctor Name',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: 'fit-content' }}>
          <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#333333' }}>{row.doctor?.name}</Typography>
        </Box>
      )
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'actionCategory',
      headerName: 'Action Category'
    },
    {
      flex: 0.1,
      minWidth: 90,
      sortable: false,
      align: 'center',
      headerAlign: 'center',
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => <DeleteModal id={row.id} />
    }
  ]

  return column
}

export default Columns
