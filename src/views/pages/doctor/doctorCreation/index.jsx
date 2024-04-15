//** React Imports
import React, { useState, useEffect, forwardRef } from 'react'
//** External Imports
import { FadeLoader } from 'react-spinners'
//** MUI Imports
import { Box, Fade, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material'
//** Internal Imports
import TimeSlots from './timeSlots'
import AddBasicInfo from './addBasicInfo'
import AddEducation from './addEducation'
import AddExperience from './addExperience'
import DeleteGifIcon from 'src/gifs/done.json'
import CustomStepper from 'src/views/components/customStepper'
import SuccessFullyDoneModal from '../../common/successfullyDoneModal'
//** API Imports
import { getByIdDoctor } from 'src/services/doctor.service'

const steps = ['Add Basic Information', 'Education', 'Experience', 'Time Slots']

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const CreateDoctor = ({ open, toggle, userFetchData, doctorId, setDoctorId }) => {
  const [doctorData, setDoctorData] = useState({})
  const [activeStep, setActiveStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [editDoctorData, setEditDoctorData] = useState({})
  const [isSuccessModal, setIsSuccessModal] = useState(false)
  // const [fileId, setFileId] = useState('')
  // const [fileUrl, setFileUrl] = useState('')

  useEffect(() => {
    if (doctorId) {
      ;(async () => {
        setLoading(true)
        const res = await getByIdDoctor(doctorId)
        if (res?.success) {
          setEditDoctorData({
            id: res?.doctor?.id,
            name: res?.doctor?.name,
            nameAr: res?.doctor?.nameAr,
            email: res?.doctor?.email,
            profileUrl: res?.doctor?.profileUrl,
            gender: res?.doctor?.gender,
            dob: res?.doctor?.dob,
            educations: res?.doctor?.educations,
            experiences: res?.doctor?.experiences,
            services: res?.doctor?.selectedServices,
            specialization: res?.doctor?.specialization,
            status: res?.doctor?.status,
            timeSlots: res?.doctor?.timeSlots,
            totalExperience: res?.doctor?.totalExperience
          })
        } else {
          setEditDoctorData([])
        }
        setLoading(false)
      })()
    }
  }, [doctorId])

  const handleClose = () => {
    setDoctorId(null)
    setEditDoctorData([])
    setActiveStep(0)
    setDoctorData({})
    toggle()
  }
  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }
  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }
  return (
    <div>
      <Dialog
        fullWidth
        open={open}
        maxWidth='md'
        scroll='body'
        TransitionComponent={Transition}
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            handleClose()
          }
        }}
        onBackdropClick={null}
      >
        <DialogTitle>
          <span className='text-[16px] font-semibold text-[#1A2825]'>{`${doctorId ? 'Edit' : 'Add'} Doctor`}</span>
          <Box sx={{ width: '100%', marginTop: '10px' }}>
            <CustomStepper
              bgColor={'#F2F4F7'}
              steps={steps}
              active={activeStep}
              doctorId={doctorId}
              setActiveStep={setActiveStep}
            />
          </Box>
        </DialogTitle>
        <IconButton size='small' onClick={handleClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
          <img src='/icons/Close.png' alt='Close' style={{ cursor: 'pointer' }} />
        </IconButton>
        <DialogContent
          sx={{
            position: 'relative',
            marginLeft: '5px',
            marginRight: '5px',
            maxHeight: '80vh',
            overflow: 'auto',
            paddingTop: '0px !important'
          }}
        >
          {loading && (
            <div
              style={{
                width: '96%',
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
          <React.Fragment>
            <Box sx={{ filter: loading ? 'blur(5px)' : 'none' }}>
              {activeStep === 0 ? (
                <AddBasicInfo
                  doctorId={doctorId}
                  handleClose={handleClose}
                  handleNext={handleNext}
                  setDoctorData={setDoctorData}
                  editDoctorData={editDoctorData}
                  setLoading={setLoading}
                  userFetchData={userFetchData}
                />
              ) : activeStep === 1 ? (
                <AddEducation
                  doctorId={doctorId}
                  handleClose={handleClose}
                  handleNext={handleNext}
                  setDoctorData={setDoctorData}
                  doctorData={doctorData}
                  userFetchData={userFetchData}
                  setLoading={setLoading}
                  editDoctorEducation={editDoctorData?.educations}
                />
              ) : activeStep === 2 ? (
                <AddExperience
                  doctorId={doctorId}
                  handleClose={handleClose}
                  handleNext={handleNext}
                  setDoctorData={setDoctorData}
                  doctorData={doctorData}
                  setLoading={setLoading}
                  userFetchData={userFetchData}
                  editDoctorExperience={editDoctorData?.experiences}
                />
              ) : activeStep === 3 ? (
                <TimeSlots
                  doctorId={doctorId}
                  handleClose={handleClose}
                  setDoctorData={setDoctorData}
                  doctorData={doctorData}
                  setLoading={setLoading}
                  userFetchData={userFetchData}
                  setIsSuccessModal={setIsSuccessModal}
                  editDoctorTimeSlots={editDoctorData}
                  setEditDoctorData={setEditDoctorData}
                />
              ) : (
                handleClose()
              )}
            </Box>
          </React.Fragment>
        </DialogContent>
      </Dialog>
      {isSuccessModal && (
        <SuccessFullyDoneModal
          open={isSuccessModal}
          animationData={DeleteGifIcon}
          handleClose={() => setIsSuccessModal(false)}
          heading={'Successfully'}
          subHeading={"You've Successfully added the Doctor."}
          animationWidth={'300px'}
          animationHeight={'25opx'}
        />
      )}
    </div>
  )
}

export default CreateDoctor
