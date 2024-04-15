//** React Imports
import React from 'react'
//** MUI Imports
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { Button, FormControl, Grid, TextField } from '@mui/material'
//**Internal/External Imports '
import toast from 'react-hot-toast'
import CustomInputLabel from 'src/views/components/inputLabel'
//** Icons Imports
import { FaCheck } from 'react-icons/fa6'
import { RxCross2 } from 'react-icons/rx'
import { MdModeEditOutline, MdDelete } from 'react-icons/md'
//** API Imports
import { updateDoctorExperience, deleteDoctorExperience } from 'src/services/doctor.service'
const ExperienceRepitition = ({
  doctorId,
  gridItems,
  setLoading,
  setGridError,
  setGridItems,
  userFetchData,
  editDoctorExperience
}) => {
  const [editExp, setEditExp] = React.useState(false)

  React.useEffect(() => {
    if (editDoctorExperience?.length > 0) {
      const formattedData = editDoctorExperience.map(item => ({
        ...item,
        id: item?.experienceId,
        isCreate: false,
        isUpdated: false,
        isDeleted: false
      }))
      setGridItems(formattedData)
    }
    // eslint-disable-next-line
  }, [editDoctorExperience])

  const handleAddGridItem = () => {
    setGridItems(prevItems => [
      ...prevItems,
      {
        id: prevItems[prevItems?.length - 1]?.id + 1,
        jobTitle: '',
        companyName: '',
        yearStart: '',
        yearEnd: '',
        specialization: '',
        specialization: '',
        location: '',
        position: '',
        jobType: '',
        isCreate: true,
        isUpdated: false,
        isDeleted: false
      }
    ])
    setGridError('')
  }

  const handleRemoveGridItem = id => {
    setGridItems(prevItems =>
      prevItems
        ?.map(item => {
          if (item.id === id && item.isCreate === false) {
            return {
              ...item,
              isCreate: false,
              isDeleted: true,
              isUpdated: false
            }
          } else if (item.isCreate === true && item.id === id) {
            return null
          } else {
            return item
          }
        })
        ?.filter(Boolean)
    )
    setGridError('')
  }
  const handleDeleteExperience = async id => {
    setLoading(true)
    const res = await deleteDoctorExperience(id)
    if (res?.success) {
      setLoading(false)
      userFetchData()
      handleRemoveGridItem(id)
      toast.success('Experience deleted successfully!')
    } else {
      setLoading(false)
      toast.error('Server error')
    }
  }
  const handleEditExperience = async exp => {
    setLoading(true)
    const res = await updateDoctorExperience(exp)
    if (res?.success) {
      setLoading(false)
      userFetchData()
      setEditExp(false)
      toast.success('Experience updated successfully!')
    } else {
      setLoading(false)
      toast.error('Server error')
    }
  }
  const handleInputChange = (id, fieldName, value) => {
    setGridItems(prevItems =>
      prevItems?.map(item => {
        if (item.isCreate === true && item.id === id) {
          return { ...item, [fieldName]: value, isUpdated: false }
        } else if (item.id === id && item.isCreate === false) {
          return { ...item, [fieldName]: value, isUpdated: true }
        } else {
          return item
        }
      })
    )
    setGridError('')
  }

  return (
    <>
      {gridItems
        ?.filter(item => !item?.isDeleted)
        ?.map((item, index) => (
          <Grid container spacing={1} key={index}>
            <Grid
              item
              xs={0.1}
              sx={{
                display: 'flex',
                alignItems: 'top',
                justifyContent: 'start',
                fontSize: '18px',
                fontWeight: '700',
                color: '#666666',
                mt: '24px'
              }}
            >
              {index + 1 + '#'}
            </Grid>
            <Grid
              item
              xs={11.53}
              sx={{
                backgroundColor: '#F2F4F7',
                mt: 5,
                borderRadius: '10px',
                marginBottom: '20px',
                border: '1px solid #B9BBBD',
                ml: '25px'
              }}
            >
              {doctorId && item.experienceId && (
                <Grid item xs={12} sm={12} sx={{ mt: 5, mr: 5 }}>
                  <div className='flex justify-end gap-2'>
                    {item.experienceId === editExp ? (
                      <>
                        <FaCheck
                          className='cursor-pointer'
                          size={20}
                          onClick={() => {
                            handleEditExperience(item)
                          }}
                        />
                        <RxCross2
                          className='cursor-pointer'
                          size={20}
                          onClick={() => {
                            setEditExp(false)
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <MdModeEditOutline
                          className='cursor-pointer'
                          size={20}
                          onClick={() => {
                            setEditExp(item.experienceId)
                          }}
                        />
                        <MdDelete
                          className='cursor-pointer'
                          size={20}
                          onClick={() => {
                            handleDeleteExperience(item.experienceId)
                          }}
                        />
                      </>
                    )}
                  </div>
                </Grid>
              )}
              <Grid
                container
                spacing={3}
                key={item?.id}
                sx={{ mt: 1, p: 2 }}
                style={item?.id !== editExp && item?.experienceId ? { pointerEvents: 'none', opacity: '0.5' } : {}}
              >
                <Grid item xs={12} sm={6}>
                <CustomInputLabel label={<span className='required-label'>Job Title</span>} />
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <TextField
                      value={item?.jobTitle}
                      onChange={e => handleInputChange(item?.id, 'jobTitle', e.target.value)}
                      placeholder='Enter Job Title'
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                <CustomInputLabel label={<span className='required-label'>Company Name</span>} />
                  <FormControl fullWidth>
                    <TextField
                      value={item?.companyName}
                      onChange={e => handleInputChange(item?.id, 'companyName', e.target.value)}
                      placeholder='Enter Company Name'
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                <CustomInputLabel label={<span className='required-label'>Description</span>} />
                  <FormControl fullWidth>
                    <TextField
                      value={item?.description}
                      onChange={e => handleInputChange(item?.id, 'description', e.target.value)}
                      placeholder='Enter Description'
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                <CustomInputLabel label={<span className='required-label'>Location</span>} />
                  <FormControl fullWidth>
                    <TextField
                      value={item?.location}
                      onChange={e => handleInputChange(item?.id, 'location', e.target.value)}
                      placeholder='Enter Location'
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                <CustomInputLabel label={<span className='required-label'>Specialization</span>} />
                  <FormControl fullWidth>
                    <TextField
                      value={item?.specialization}
                      onChange={e => handleInputChange(item?.id, 'specialization', e.target.value)}
                      placeholder='Enter specialization'
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                <CustomInputLabel label={<span className='required-label'>Position</span>} />
                  <FormControl fullWidth>
                    <TextField
                      value={item?.position}
                      onChange={e => handleInputChange(item?.id, 'position', e.target.value)}
                      placeholder='Enter Position'
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                <CustomInputLabel label={<span className='required-label'>Job Type</span>} />
                  <FormControl fullWidth>
                    <TextField
                      value={item?.jobType}
                      onChange={e => handleInputChange(item?.id, 'jobType', e.target.value)}
                      placeholder='Enter Job Type'
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                <CustomInputLabel label={<span className='required-label'>Year Start</span>} />
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <TextField
                      value={item?.yearStart}
                      type='date'
                      onChange={e => handleInputChange(item?.id, 'yearStart', e.target.value)}
                      placeholder='Enter Year Start'
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                <CustomInputLabel label={<span className='required-label'>Year End</span>} />
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <TextField
                      value={item?.yearEnd}
                      type='date'
                      onChange={e => handleInputChange(item?.id, 'yearEnd', e.target.value)}
                      placeholder='Enter Year Start'
                    />
                  </FormControl>
                </Grid>

                {index !== 0 && !item?.experienceId && (
                  <Grid item sm={8} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 5 }}>
                    <Button
                      variant='text'
                      color='error'
                      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                      onClick={() => handleRemoveGridItem(item?.id)}
                    >
                      <DeleteForeverIcon />
                      <p style={{ textTransform: 'capitalize' }}>Remove</p>
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        ))}
      <Grid>
        <Button
          variant='text'
          onClick={handleAddGridItem}
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3, px: 0 }}
        >
          <img src='/icons/AddGreen.png' alt='Add' style={{ cursor: 'pointer' }} />
          <p
            style={{
              marginLeft: '7px',
              fontSize: '16px',
              fontWeight: 500,
              lineHeight: '16px',
              color: '#115740',
              textTransform: 'capitalize'
            }}
          >
            Add Another
          </p>
        </Button>
      </Grid>
    </>
  )
}

export default ExperienceRepitition
