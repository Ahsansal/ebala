//** React/Next Imports
import { useState, forwardRef, useEffect } from 'react'
import Image from 'next/image'
//** MUI Imports
import { Dialog, Typography, DialogContent, Fade, Tabs, Tab, Box, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms'
//** Internal Imports
import Info from './Info'
import Education from './education'
import Experience from './experience'
import Rating from './rating'
import Prescription from 'src/views/patient/profile/prescription'
import Appointments from 'src/views/patient/profile/appointments'
// import Slots from './slots'
//** External Imports
import { Icon } from '@iconify/react'
import { FadeLoader } from 'react-spinners'
//** API imports
import { getByIdDoctor } from 'src/services/doctor.service'
import TimeSlots from './timeSlots'

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,

    'aria-controls': `vertical-tabpanel-${index}`
  }
}

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const Profile = props => {
  // ** Props

  const { open, onClose, doctorId, setDoctorId } = props
  const [value, setValue] = useState(0)
  const [selectedRowIndex, setSelectedRowIndex] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchDoctorById = async id => {
    setLoading(true)
    const res = await getByIdDoctor(id)
    if (res?.success) {
      setLoading(false)
      setSelectedRowIndex(res?.doctor)
    } else {
      setLoading(false)
      setSelectedRowIndex(null)
    }
  }

  useEffect(() => {
    if (doctorId) {
      fetchDoctorById(doctorId)
    } else {
      setSelectedRowIndex(null)
    }
  }, [doctorId])

  useEffect(() => {
    return () => {
      setDoctorId(null)
    }
    // eslint-disable-next-line
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const tabStyle = {
    height: '99px',
    borderRadius: '8px',
    background: '#E7EEEC',
    marginBottom: '20px',
    width: '150px'
  }
  return (
    <Dialog fullWidth open={open} maxWidth='lg' scroll='body' onClose={onClose} TransitionComponent={Transition}>
      <IconButton
        edge='end'
        color='inherit'
        onClick={onClose}
        aria-label='close'
        sx={{
          position: 'absolute',
          top: '10px',
          right: '25px',
          backgroundColor: '#286753',
          color: '#ffffff'
        }}
      >
        <CloseIcon className='border border-[white] rounded-full' />
      </IconButton>

      <DialogContent sx={{ maxHeight: 700, p: 0 }} style={{ overflow: 'hidden' }}>
        <Box sx={{ position: 'relative', filter: loading ? 'blur(5px)' : 'none' }}>
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
              <FadeLoader color='#36d7b7' />
            </div>
          )}
          <div className="bg-[url('/images/cover.png')] h-[140px] w-full object-cover flex items-center rounded-t-[5px]">
            <div className='flex  mt-[115px] gap-[28px] pl-[102px] z-10 w-full'>
              <div className='w-[15%]'>
                <Image
                  // src={selectedRowIndex?.profileUrl ? selectedRowIndex.profileUrl : '/images/avatars/1.png'}
                  src='/images/avatars/1.png'
                  width={143}
                  height={143}
                  alt='profile'
                />
              </div>
              <div className='w-[85%]'>
                <p className='p-0 m-0 text-[42px] font-bold text-white'>{selectedRowIndex?.name}</p>
                <p className='p-0 m-0 text-[14px] font-normal text-[#FCFCFD]'>Doctor’s Full Name</p>
                <div className='mt-[32px] flex items-center justify-between w-[95%]'>
                  <div className='flex items-center gap-[55px]  '>
                    {/* <div className='flex items-center gap-3'>
                    <Icon sx={{ marginRight: '10px' }} icon='tdesign:location' />
                    <p className='p-0 m-0 text-[14px] font-normal text-[#666666]'>{selectedData?.address}</p>
                  </div>
                  <div className='flex items-center gap-3'>
                    <Icon sx={{ marginRight: '10px' }} icon='material-symbols:call' />{' '}
                    <p className='p-0 m-0 text-[14px] font-normal text-[#666666]'>{selectedData?.phoneNo}</p>
                  </div> */}
                    <div className='flex items-center gap-3'>
                      <Icon icon='material-symbols:mail-outline' />{' '}
                      <p className='p-0 m-0 text-[14px] font-normal text-[#666666]'>{selectedRowIndex?.email}</p>
                    </div>
                  </div>
                  <div className=''>
                    {/* <Button
                    className='rounded-[8px] px-[6px] py-[18px] w-[106px] h-[36px]
                     !text-[#666666] text-[16px] font-medium  !bg-white shadow-lg'
                    variant='contained'
                  >
                    Print
                  </Button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Box sx={{ flexGrow: 1, bgcolor: '#F1F0F4', display: 'flex', gap: '5px' }}>
            <Tabs
              orientation='vertical'
              variant='scrollable'
              value={value}
              onChange={handleChange}
              aria-label='Vertical tabs example'
              sx={{
                background: 'white',
                maxHeight: '450px',
                width: '200px',
                paddingTop: '75px',
                paddingX: '10px',
                '& .MuiTabs-indicator': {
                  position: 'absolute',
                  marginY: '30px !important',
                  height: '50px !important',
                  width: '6px',
                  left: '0px',
                  borderRadius: '8px'
                }
              }}
            >
              <Tab
                style={tabStyle}
                icon={<Icon icon='ic:outline-person' className='w-[30px] h-[30px]' />}
                label={<span className='text-[16px] font-medium text-[#115740]'>Profile</span>}
                {...a11yProps(0)}
              />
              <Tab
                style={tabStyle}
                icon={<Icon icon='mdi:education-outline' className='w-[30px] h-[30px]' />}
                label={<span className='text-[16px] font-medium text-[#115740]'>Education </span>}
                {...a11yProps(1)}
              />
              <Tab
                style={tabStyle}
                icon={<Icon icon='material-symbols:work-outline' className='w-[30px] h-[30px]' />}
                label={<span className='text-[16px] font-medium text-[#115740]'>Experience</span>}
                {...a11yProps(2)}
              />
              <Tab
                style={tabStyle}
                icon={<Icon icon='material-symbols:prescriptions' className='w-[30px] h-[30px]' />}
                label={<span className='text-[16px] font-medium text-[#115740]'>Prescriptions</span>}
                {...a11yProps(3)}
              />
              <Tab
                style={tabStyle}
                icon={<Icon icon='healthicons:health-worker-form' className='w-[30px] h-[30px]' />}
                label={<span className='text-[16px] font-medium text-[#115740]'>Appointments</span>}
                {...a11yProps(4)}
              />
              <Tab
                style={tabStyle}
                icon={<AccessAlarmsIcon />}
                label={<span className='text-[16px] font-medium text-[#115740]'>TimeSlots</span>}
                {...a11yProps(5)}
              />
              <Tab
                style={tabStyle}
                icon={<Icon icon='ic:sharp-star-rate' className='w-[30px] h-[30px]' />}
                label={<span className='text-[16px] font-medium text-[#115740]'>Ratings</span>}
                {...a11yProps(6)}
              />
            </Tabs>

            <TabPanel value={value} index={0} className='w-full   mt-[77px] '>
              <div>
                <p className='p-0 m-0 text-[16px] font-semibold text-[#000000]'>Profile Details</p>
              </div>
              <div className=' rounded-lg bg-white h-[315px] mb-[30px] mt-1'>
                <Info selectedRowIndex={selectedRowIndex} />
              </div>
            </TabPanel>

            <TabPanel value={value} index={1} className='w-full mt-[77px] '>
              <div>
                <p className='p-0 m-0 text-[16px] font-semibold text-[#000000]'>Education</p>
              </div>
              <div className=' rounded-lg bg-white h-[315px] mb-[30px] mt-1'>
                <Education education={selectedRowIndex?.educations} />
              </div>
            </TabPanel>
            <TabPanel value={value} index={2} className='w-full mt-[77px] '>
              <div>
                <p className='p-0 m-0 text-[16px] font-semibold text-[#000000]'>Experience</p>
              </div>
              <div className=' rounded-lg bg-white h-[315px] mb-[30px] mt-1'>
                <Experience experiences={selectedRowIndex?.experiences} />
              </div>
            </TabPanel>
            <TabPanel value={value} index={3} className='w-full mt-[77px] mr-[30px]'>
              <div>
                <p className='p-0 m-0 text-[16px] font-semibold text-[#000000]'>Prescriptions Details</p>
              </div>
              <div className=' rounded-lg bg-white h-[315px] mb-[30px] mt-1 overflow-y-auto'>
                <Prescription prescriptions={selectedRowIndex?.prescriptions} />
              </div>
            </TabPanel>
            <TabPanel value={value} index={4} className='w-full mt-[77px] mr-[30px]'>
              <div>
                <p className='p-0 m-0 text-[16px] font-semibold text-[#000000]'>Appointments Details</p>
              </div>
              <div className=' rounded-lg bg-white h-[315px] mb-[30px] mt-1'>
                <Appointments
                  appointments={selectedRowIndex?.appointments}
                  changedColumn={{ fieldName: 'user', header: 'Patient' }}
                />
              </div>
            </TabPanel>
            <TabPanel value={value} index={5} className='w-full mt-[77px] mr-[30px]'>
              <div>
                <p className='p-0 m-0 text-[16px] font-semibold text-[#000000]'>TimeSlots Details</p>
              </div>
              <div className=' rounded-lg bg-white h-[315px] mb-[30px] mt-1 overflow-y-auto'>
                <TimeSlots doctorDetails={selectedRowIndex} />
              </div>
            </TabPanel>
            <TabPanel value={value} index={6} className='w-full mt-[77px] '>
              <div className=' rounded-lg bg-white h-[315px] mb-[30px] mt-1'>
                <Rating ratings={selectedRowIndex?.doctorRatings} stars={selectedRowIndex?.totalRating} />
              </div>
            </TabPanel>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default Profile
