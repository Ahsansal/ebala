//** React Imports
import React, { useState } from 'react'
//** MUI Imports
import { Alert, Box, Button, Grid } from '@mui/material'
//** Internal/External Imports
import toast from 'react-hot-toast'
import ExperienceRepitition from './experienceRepitition'
//** API Imports
import { addDoctorExperienceById } from 'src/services/doctor.service'

const AddExperience = ({
  doctorId,
  handleNext,
  setLoading,
  doctorData,
  handleClose,
  userFetchData,
  setDoctorData,
  editDoctorExperience
}) => {
  const [gridError, setGridError] = useState('')
  const [gridItems, setGridItems] = useState([
    {
      id: 1,
      jobTitle: '',
      companyName: '',
      yearStart: '',
      yearEnd: '',
      description: '',
      specialization: '',
      location: '',
      position: '',
      jobType: '',
      isCreate: true,
      isUpdated: false,
      isDeleted: false
    }
  ])

  const reset = () => {
    setGridItems([])
    setLoading(false)
    setGridError('')
  }

  const handleSaveAndContinue = async data => {
    if (
      !gridItems?.every(
        item =>
          item?.jobTitle?.trim() !== '' &&
          item?.companyName?.trim() !== '' &&
          item?.position?.trim() !== '' &&
          item?.yearStart?.trim() !== '' &&
          item?.yearEnd?.trim() !== '' &&
          item?.description?.trim() !== '' &&
          item?.specialization?.trim() !== '' &&
          item?.location?.trim() !== ''
      )
    ) {
      setGridError('Please Fill all the fields')
    } else if (doctorId) {
      let experiences = gridItems.filter(item => !item.experienceId)
      if (experiences.length > 0) {
        setLoading(true)
        const res = await addDoctorExperienceById(doctorId, { experiences: experiences })
        if (res?.success) {
          userFetchData()
          setLoading(false)
          handleClose()
          toast.success('Experience added successfully!')
        } else {
          setLoading(false)
          toast.error('Server error')
        }
      } else {
        handleClose()
      }
    } else {
      let newGridItems = gridItems.map(obj => {
        const { id, ...rest } = obj
        return rest
      })
      const UpdatesData = {
        ...doctorData,
        experiences: newGridItems
      }
      setDoctorData(UpdatesData)

      handleNext()
    }
  }

  return (
    <Box>
      <Grid container>
        <Grid xs={12}>
          <ExperienceRepitition
            doctorId={doctorId}
            setGridError={setGridError}
            gridItems={gridItems}
            setGridItems={setGridItems}
            editDoctorExperience={editDoctorExperience}
            userFetchData={userFetchData}
            setLoading={setLoading}
          />
          {gridError && (
            <Alert severity='error' className='mt-2'>
              {gridError}
            </Alert>
          )}
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: '40px' }}>
        <Box></Box>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            gap: '10px'
          }}
        >
          <Button
            onClick={handleClose}
            sx={{
              mr: 1,
              width: 'auto',
              height: '40px',
              borderRadius: '8px',
              color: '#4D5856',
              backgroundColor: '#CCCFCF',
              textTransform: 'capitalize'
            }}
          >
            Exit
          </Button>
          {!doctorId && (
            <Button
              onClick={() => handleNext()}
              sx={{
                mr: 1,
                width: 'auto',
                height: '40px',
                borderRadius: '8px',
                color: '#4D5856',
                backgroundColor: '#CCCFCF',
                textTransform: 'capitalize'
              }}
            >
              Skip
            </Button>
          )}
          <Button
            onClick={handleSaveAndContinue}
            variant='contained'
            sx={{
              width: 'auto',
              height: '40px',
              borderRadius: '8px',
              color: '#FFFFFF',
              textTransform: 'capitalize'
            }}
          >
            {doctorId ? 'Update & Close' : 'Next'}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default AddExperience
