import React, { useState } from 'react'
// ** MUI Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import {
  Box,
  Menu,
  Button,
  Rating,
  Dialog,
  MenuItem,
  IconButton,
  Typography,
  DialogActions,
  DialogContent
} from '@mui/material'
// ** External Imports
import Lottie from 'lottie-react'
import toast from 'react-hot-toast'
import { FadeLoader } from 'react-spinners'
// ** Internal Imports
import Icon from 'src/@core/components/icon'
import DeleteGifIcon from 'src/gifs/delete.json'
//** API Imports
import { removeDoctor } from 'src/services/doctor.service'

export const getColumns = ({ userFetchData, toggleAddDoctorModal, setDoctorId }) => {
  const renderClient = row => {
    if (row?.profileUrl) {
      return <CustomAvatar src={row?.profileUrl} sx={{ width: 40, height: 40 }} />
    } else {
      return (
        <CustomAvatar
          skin='light'
          color={row.avatarColor || 'primary'}
          sx={{ width: 40, height: 40, fontSize: '1rem' }}
        ></CustomAvatar>
      )
    }
  }

  const RowOptions = ({ row, id, Delid }) => {
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
      setDoctorId(id)
      toggleAddDoctorModal()
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
      const res = await removeDoctor(id)
      if (res?.success) {
        setDelLoading(false)
        toast.success('Doctor removed Successfully!')
      } else {
        setDelLoading(false)
        toast.error('Server error')
      }
      handleRowOptionsClose()
      handleClose()
      userFetchData()
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
          <MenuItem sx={{ '& svg': { mr: 2 } }} onClick={() => handleEdit(id)}>
            <Icon icon='mdi:pencil-outline' fontSize={20} />
            Edit
          </MenuItem>
          <MenuItem onClick={() => handleClickOpen()} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon='mdi:delete-outline' fontSize={20} />
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
                      color: 'black'
                    }}
                    align='center'
                  >
                    {'Are you sure?'}
                  </Typography>
                  <Typography align='center'>{'You want to delete this Teacher'}</Typography>
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

  const columns = [
    {
      flex: 1,
      maxWidth: 90,
      field: 'id',
      headerName: 'ID',
      align: 'center',
      headerAlign: 'center',
      renderCell: ({ row }) => {
        const { id } = row
        return (
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', height: 'fit-content' }}>
            <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#333333' }}>{id}</Typography>
          </Box>
        )
      }
    },
    {
      flex: 1,
      maxWidth: 120,
      field: 'ProfileURL',
      headerName: 'Profile',
      align: 'center',
      headerAlign: 'center',
      renderCell: ({ row }) => {
        return <Box sx={{ display: 'flex', alignItems: 'center' }}>{renderClient(row)}</Box>
      }
    },
    {
      flex: 1,
      maxWidth: 200,
      field: 'firstName',
      headerName: 'Name',
      align: 'left',
      headerAlign: 'left',
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
      flex: 1,
      maxWidth: 200,
      field: 'name',
      headerName: 'Email',
      renderCell: ({ row }) => {
        const { email } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', height: 'fit-content' }}>
            <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#333333' }}>{email}</Typography>
          </Box>
        )
      }
    },
    {
      flex: 1,
      maxWidth: 150,
      field: 'GradeName',
      headerName: 'Gender',
      headerAlign: 'left',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', height: 'fit-content' }}>
            <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#333333' }}>
              {row?.gender ? row.gender : 'Not Specified'}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 1,
      maxWidth: 150,
      field: 'phone',
      headerName: 'Language',
      headerAlign: 'left',
      renderCell: ({ row }) => {
        const { language } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', height: 'fit-content' }}>
            <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#333333' }}>
              {language || 'Not specified'}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 1,
      maxWidth: 150,
      field: 'dob',
      headerName: 'Date of birth',
      renderCell: ({ row }) => {
        const { dob } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', height: 'fit-content' }}>
            <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#333333' }}>
              {dob ? dob : 'Not specified'}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 1,
      maxWidth: 150,
      field: 'experience',
      headerName: 'Total Experience',
      headerAlign: 'left',
      renderCell: ({ row }) => {
        const { totalExperience } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', height: 'fit-content' }}>
            <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#333333' }}>
              {totalExperience || 'Not specified'}
            </Typography>
          </Box>
        )
      }
    },
    // {
    //   flex: 1,
    //   maxWidth: 250,
    //   field: 'id/password',
    //   headerName: 'ID/Password',
    //   renderCell: ({ row }) => {
    //     const { id, name, password } = row
    //     const handleCopyClick = () => {
    //       const email = row.email
    //       const pass = row.password
    //       const textToCopy = `email: ${email}\nPassword: ${pass}`
    //       navigator.clipboard
    //         .writeText(textToCopy)
    //         .then(() => {
    //           toast.success('Copied Email & Password', {
    //             position: 'top-center',
    //             duration: 2000
    //           })
    //         })
    //         .catch(error => {
    //           toast.error('Failed to Copy Password', {
    //             position: 'top-center',
    //             duration: 2000
    //           })
    //         })
    //     }
    //     const passFunc = () => {
    //       setSelectedRowIndex(id)
    //       setShowPass(!showPass)
    //     }
    //     return (
    //       <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
    //         <Box sx={{ display: 'flex', flexDirection: 'column', width: '80%', overflow: 'hidden' }}>
    //           <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#333333' }}>
    //             {row?.email || 'abubakar09'}
    //           </Typography>

    //           <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#333333' }}>*******</Typography>
    //         </Box>

    //         <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '20%' }}>
    //           <Typography className='cursor-pointer'>
    //             <IconButton size='small' onClick={handleCopyClick}>
    //               <Icon icon='cil:copy' />
    //             </IconButton>
    //           </Typography>
    //         </Box>
    //       </Box>
    //     )
    //   }
    // },
    {
      flex: 1,
      maxWidth: 180,
      sortable: false,
      field: 'totalRating',
      align: 'center',
      headerAlign: 'center',
      headerName: 'Rating',
      renderCell: ({ row }) => <Rating name='read-only' value={row?.totalRating} readOnly />
    },
    {
      flex: 1,
      maxWidth: 90,
      sortable: false,
      field: 'actions',
      align: 'center',
      headerAlign: 'center',
      headerName: 'Actions',
      renderCell: ({ row }) => <RowOptions row={row} id={row?.id} />
    }
  ]

  return columns
}
