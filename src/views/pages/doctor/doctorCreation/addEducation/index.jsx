//** React Imports
import React, { useState } from 'react'
//** MUI Imports
import { Alert, Box, Button, Grid } from '@mui/material'
//** Internal Imports
import EducationRepitition from './educationRepitition'
//API Imports
import { addDoctorEducationById } from 'src/services/doctor.service'
import toast from 'react-hot-toast'

const AddEducation = ({
  doctorId,
  handleNext,
  handleClose,
  setDoctorData,
  doctorData,
  editDoctorEducation,
  userFetchData,
  setLoading
}) => {
  const [gridError, setGridError] = useState('')
  const [gridItems, setGridItems] = useState([
    {
      id: 1,
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

  const reset = () => {
    setGridItems([])
    setLoading(false)
    setGridError('')
  }

  const handleSaveAndContinue = async data => {
    if (
      !gridItems?.every(
        item =>
          item?.degreeName?.trim() !== '' &&
          item?.instituteName?.trim() !== '' &&
          item?.yearStart?.trim() !== '' &&
          item?.yearEnd?.trim() !== '' &&
          item?.specialization?.trim() !== '' &&
          item?.Subjects?.trim() !== '' &&
          item?.degreeType?.trim() !== ''
      )
    ) {
      setGridError('Please Fill all the fields')
    } else if (doctorId) {
      let educations = gridItems.filter(item => !item.educationId)
      if (educations.length > 0) {
        for (let i = 0; i < educations.length; i++) {
          if ('Subjects' in educations[i]) {
            educations[i].subjects = educations[i].Subjects
            delete educations[i].Subjects
            delete educations[i].isCreate
            delete educations[i].isUpdated
            delete educations[i].isDeleted
          }
        }
        setLoading(true)
        const res = await addDoctorEducationById(doctorId, { educations: educations })
        if (res?.success) {
          userFetchData()
          setLoading(false)
          handleClose()
          toast.success('Education added successfully!')
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
      const Data = {
        ...doctorData,
        educations: newGridItems
      }
      setDoctorData(Data)

      handleNext()
    }
  }

  return (
    <Box>
      <Grid container>
        <Grid xs={12}>
          <EducationRepitition
            doctorId={doctorId}
            setGridError={setGridError}
            gridItems={gridItems}
            setGridItems={setGridItems}
            editDoctorEducation={editDoctorEducation}
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

export default AddEducation
