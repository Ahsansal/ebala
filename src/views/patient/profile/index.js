//** React/Next Imports
import { useState, forwardRef, useEffect } from 'react'
import Image from 'next/image'
//** MUI Imports
import CloseIcon from '@mui/icons-material/Close'
import { Dialog, Typography, DialogContent, Fade, Tabs, Tab, Box, IconButton } from '@mui/material'
//** Internal Imports
import Info from './Info'
import Prescription from './prescription'
import Appointments from './appointments'
//** External Imports
import { Icon } from '@iconify/react'
import { FadeLoader } from 'react-spinners'
//API imports
import { getByID } from 'src/services/patient.service'

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
  const { open, onClose, patientId } = props
  const [value, setValue] = useState(0)
  const [selectedRowIndex, setSelectedRowIndex] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchPatientById = async id => {
    setLoading(true)
    const res = await getByID(id)
    if (res?.success) {
      setLoading(false)
      const obj = {
        ...res?.user,
        id: res?.user?.id,
        name: res?.user?.name,
        gender: res?.user?.gender,
        email: res?.user?.email,
        password: res?.user?.password
      }
      setSelectedRowIndex(obj)
    } else {
      setLoading(false)
      setSelectedRowIndex(null)
    }
  }

  useEffect(() => {
    if (patientId) {
      fetchPatientById(patientId)
    } else {
      setSelectedRowIndex(null)
    }
  }, [patientId])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const tabStyle = {
    height: '99px',
    borderRadius: '8px',
    background: '#E7EEEC',
    minWidth: '113px'
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
      <DialogContent sx={{ minHeight: 400, p: 0 }}>
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
        <Box sx={{ position: 'relative', filter: loading ? 'blur(5px)' : 'none' }}>
          <div className="bg-[url('/images/cover.png')] h-[140px] w-full object-cover flex   items-center rounded-t-[5px]">
            <div className='flex  mt-[115px] gap-[28px] pl-[102px] z-10 w-full'>
              <div className='w-[15%]'>
                <Image
                  src={selectedRowIndex?.profileUrl ? selectedRowIndex.profileUrl : '/images/avatars/1.png'}
                  width={143}
                  height={143}
                  alt='profile'
                />
              </div>
              <div className='w-[85%]'>
                <p className='p-0 m-0 text-[42px] font-bold text-white'>{selectedRowIndex?.name}</p>
                <p className='p-0 m-0 text-[14px] font-normal text-[#FCFCFD]'>Patient’s Full Name</p>
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
                  {/* <div className=''>
                  <Button
                    className='rounded-[8px] px-[6px] py-[18px] w-[106px] h-[36px]
                     !text-[#666666] text-[16px] font-medium  !bg-white shadow-lg'
                    variant='contained'
                  >
                    Print
                  </Button>
                </div> */}
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
                sx={{ mb: '20px' }}
                style={tabStyle}
                icon={<Icon icon='fluent:patient-20-filled' className='w-[30px] h-[30px]' />}
                label={<span className='text-[16px] font-medium text-[#115740]'>Patient Info</span>}
                {...a11yProps(0)}
              />
              <Tab
                sx={{ mb: '20px' }}
                style={tabStyle}
                icon={<Icon icon='material-symbols:prescriptions' className='w-[30px] h-[30px]' />}
                label={<span className='text-[16px] font-medium text-[#115740] px-[10px]'>Prescriptions</span>}
                {...a11yProps(0)}
              />
              <Tab
                style={tabStyle}
                icon={<Icon icon='healthicons:health-worker-form' className='w-[30px] h-[30px]' />}
                label={<span className='text-[16px] font-medium text-[#115740]'>Appointments</span>}
                {...a11yProps(0)}
              />
            </Tabs>

            <TabPanel value={value} index={0} className='w-full   mt-[77px] mr-[30px]'>
              <div>
                <p className='p-0 m-0 text-[16px] font-semibold text-[#000000]'>Patient Details</p>
              </div>
              <div className=' rounded-lg bg-white h-[315px] mb-[30px] mt-1'>
                <Info selectedRowIndex={selectedRowIndex} />
              </div>
            </TabPanel>
            <TabPanel value={value} index={1} className='w-full   mt-[77px] mr-[30px]'>
              <div>
                <p className='p-0 m-0 text-[16px] font-semibold text-[#000000]'>Prescriptions Details</p>
              </div>
              <div className=' rounded-lg bg-white h-[315px] mb-[30px] mt-1 overflow-y-auto'>
                <Prescription prescriptions={selectedRowIndex?.prescriptions} />
              </div>
            </TabPanel>
            <TabPanel value={value} index={2} className='w-full mt-[77px] mr-[30px]'>
              <div>
                <p className='p-0 m-0 text-[16px] font-semibold text-[#000000]'>Appointments Details</p>
              </div>
              <div className=' rounded-lg bg-white h-[315px] mb-[30px] mt-1'>
                <Appointments
                  appointments={selectedRowIndex?.appointments}
                  changedColumn={{ fieldName: 'doctor', header: 'Doctor' }}
                />
              </div>
            </TabPanel>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default Profile
