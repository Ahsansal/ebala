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
import { remove } from 'src/services/services.service'
import { formatDate } from 'src/@core/utils/format'
import CustomSwitch from '../switchbutton'

const Columns = ({ fetchServices, toggleEdit, Background_Color }) => {
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
        setDelLoading(false)
        toast.success('Service removed Successfully!')
        fetchServices()
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
                  <Typography align='center'>{'You want to delete this Service'}</Typography>
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

  const handleChangeSwitch = (id) => {
    toggleEdit(id)
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
      field: 'name',
      headerName: 'Name',
      renderCell: ({ row }) => {
        const { name } = row
        return (
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', height: 'fit-content' }}>
            <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#333333' }}>{name}</Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      minWidth: 100,
      field: 'createdAt',
      headerName: 'Created At',
      align: 'center',
      headerAlign: 'center',
      renderCell: ({ row }) => {
        const { createdAt } = row
        return (
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', height: 'fit-content' }}>
            <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#333333' }}>
              {formatDate(createdAt)}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'status',
      headerName: 'Status',
      align: 'center',
      headerAlign: 'center',
      renderCell: ({ row }) => {
        const { status } = row

        return (
          <Box
            sx={{
              borderRadius: '30px',
              display: 'flex',
              alignItems: 'flex-start',
              flexDirection: 'column',
              height: 'fit-content'
            }}
          >
            <CustomSwitch checked={status} onChange={()=>handleChangeSwitch(row?.id)} inputProps={{ 'aria-label': 'controlled' }} />
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
