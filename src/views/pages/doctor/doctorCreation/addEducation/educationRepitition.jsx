//** React Imports
import React from 'react'
//** MUI Imports
import { Button, FormControl, Grid, TextField } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
//**Internal/External Imports '
import toast from 'react-hot-toast'
import CustomInputLabel from 'src/views/components/inputLabel'
//** Icons Imports
import { FaCheck } from 'react-icons/fa6'
import { RxCross2 } from 'react-icons/rx'
import { MdModeEditOutline, MdDelete } from 'react-icons/md'
//** API Imports
import { deleteDoctorEducation, updateDoctorEducation } from 'src/services/doctor.service'
const EducationRepitition = ({
  doctorId,
  gridItems,
  setLoading,
  setGridError,
  setGridItems,
  userFetchData,
  editDoctorEducation
}) => {
  React.useEffect(() => {
    if (editDoctorEducation?.length > 0) {
      const formattedData = editDoctorEducation.map(item => ({
        ...item,
        id: item?.educationId,
        isCreate: false,
        isUpdated: true,
        isDeleted: false
      }))
      setGridItems(formattedData)
    }
    // eslint-disable-next-line
  }, [editDoctorEducation])

  const [editEdu, setEditEdu] = React.useState(false)
  const handleAddGridItem = () => {
    setGridItems(prevItems => [
      ...prevItems,
      {
        id: prevItems[prevItems?.length - 1]?.id + 1,
        degreeName: '',
        instituteName: '',
        yearStart: '',
        yearEnd: '',
        specialization: '',
        Subjects: '',
        degreeType: '',
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
  const handleDeleteEducation = async id => {
    setLoading(true)
    const res = await deleteDoctorEducation(id)
    if (res?.success) {
      setLoading(false)
      userFetchData()
      handleRemoveGridItem(id)
      toast.success('Education deleted successfully!')
    } else {
      setLoading(false)
      toast.error('Server error')
    }
  }
  const handleEditEducation = async id => {
    const updatePayload = gridItems.find(item => item.educationId === id)
    setLoading(true)
    const res = await updateDoctorEducation(updatePayload)
    if (res?.success) {
      setLoading(false)
      userFetchData()
      setEditEdu(false)
      toast.success('Education updated successfully!')
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
              {doctorId && item.educationId && (
                <Grid item xs={12} sm={12} sx={{ mt: 5, mr: 5 }}>
                  <div className='flex justify-end gap-2'>
                    {item.educationId === editEdu ? (
                      <>
                        <FaCheck
                          className='cursor-pointer'
                          size={20}
                          onClick={() => {
                            handleEditEducation(item.educationId)
                          }}
                        />
                        <RxCross2
                          className='cursor-pointer'
                          size={20}
                          onClick={() => {
                            setEditEdu(false)
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <MdModeEditOutline
                          className='cursor-pointer'
                          size={20}
                          onClick={() => {
                            setEditEdu(item.educationId)
                          }}
                        />
                        <MdDelete
                          className='cursor-pointer'
                          size={20}
                          onClick={() => {
                            handleDeleteEducation(item.educationId)
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
                style={item?.id !== editEdu && item?.educationId ? { pointerEvents: 'none', opacity: '0.5' } : {}}
              >
                <Grid item xs={12} sm={4}>
                <CustomInputLabel label={<span className='required-label'>Degree Name</span>} />
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <TextField
                      value={item?.degreeName}
                      onChange={e => handleInputChange(item?.id, 'degreeName', e.target.value)}
                      placeholder='Enter Degree Name'
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                <CustomInputLabel label={<span className='required-label'>Institute Name</span>} />
                  <FormControl fullWidth>
                    <TextField
                      value={item?.instituteName}
                      onChange={e => handleInputChange(item?.id, 'instituteName', e.target.value)}
                      placeholder='Enter Institute Name'
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                <CustomInputLabel label={<span className='required-label'>Specialization</span>} />
                  <FormControl fullWidth>
                    <TextField
                      value={item?.specialization}
                      onChange={e => handleInputChange(item?.id, 'specialization', e.target.value)}
                      placeholder='Enter Specialization'
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                <CustomInputLabel label={<span className='required-label'>Degree Type</span>} />
                  <FormControl fullWidth>
                    <TextField
                      value={item?.degreeType}
                      onChange={e => handleInputChange(item?.id, 'degreeType', e.target.value)}
                      placeholder='Enter Degree Type'
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                <CustomInputLabel label={<span className='required-label'>Subjects</span>} />
                  <FormControl fullWidth>
                    <TextField
                      value={item?.Subjects}
                      onChange={e => handleInputChange(item?.id, 'Subjects', e.target.value)}
                      placeholder='Enter Subjects'
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
                <div className='flex w-full'>
                  {index !== 0 && !item?.educationId && (
                    <Grid item sm={8} sx={{ mt: 5 }}>
                      <Button variant='text' color='error' onClick={() => handleRemoveGridItem(item?.id)}>
                        <DeleteForeverIcon />
                        <p style={{ textTransform: 'capitalize' }}>Remove</p>
                      </Button>
                    </Grid>
                  )}
                </div>
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

export default EducationRepitition
