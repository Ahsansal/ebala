//** React Imports
import { useState, forwardRef } from 'react'
//** MUI Imports
import { Dialog, Typography, DialogContent, Fade, Tabs, Tab, Box, IconButton, Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
//** Internal Imports
import Info from './Info'
//** External Imports
import { Icon } from '@iconify/react'

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

  const { open, onClose, selectedData } = props
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const dummyImage = '/images/avatars/1.png'
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
      <div className="bg-[url('/images/cover.png')] h-[140px] w-full object-cover flex   items-center rounded-t-[5px]">
          <div className='flex  mt-[115px] gap-[28px] pl-[102px] z-10 w-full'>
            <div className='w-[15%]'>
              {!selectedData?.profile?.url.includes('https://') ? (
                <>
                  <img
                    src='/images/teacherProfile.png'
                    className='w-[143px] h-[143px] object-cover rounded-full shadow-xl'
                  />
                </>
              ) : (
                <img
                  src={selectedData?.profile?.url}
                  className='w-[143px] h-[143px] object-cover rounded-full shadow-xl'
                />
              )}
            </div>
            <div className='w-[85%]'>
              <p className='p-0 m-0 text-[42px] font-bold text-white'>{selectedData?.userName}</p>
              <p className='p-0 m-0 text-[14px] font-normal text-[#FCFCFD]'>Teacher’s Full Name</p>
              <div className='mt-[32px] flex items-center justify-between w-[95%]'>
                <div className='flex items-center gap-[55px]  '>
                  <div className='flex items-center gap-3'>
                    <Icon sx={{ marginRight: '10px' }} icon='tdesign:location' />
                    <p className='p-0 m-0 text-[14px] font-normal text-[#666666]'>{selectedData?.address}</p>
                  </div>
                  <div className='flex items-center gap-3'>
                    <Icon sx={{ marginRight: '10px' }} icon='material-symbols:call' />{' '}
                    <p className='p-0 m-0 text-[14px] font-normal text-[#666666]'>{selectedData?.phoneNo}</p>
                  </div>
                  <div className='flex items-center gap-3'>
                    <Icon icon='material-symbols:mail-outline' />{' '}
                    <p className='p-0 m-0 text-[14px] font-normal text-[#666666]'>{selectedData?.email}</p>
                  </div>
                </div>
                <div className=''>
                  <Button
                    className='rounded-[8px] px-[6px] py-[18px] w-[106px] h-[36px]
                     !text-[#666666] text-[16px] font-medium  !bg-white shadow-lg'
                    variant='contained'
                  >
                    Print
                  </Button>
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
              icon={<Icon icon='iconamoon:profile-thin' className='w-[30px] h-[30px]' />}
              label={<span className='text-[16px] font-medium text-[#115740]'>Profile Info</span>}
              {...a11yProps(0)}
            />
          </Tabs>

          <TabPanel value={value} index={0} className='w-full   mt-[77px] mr-[30px]'>
            <div>
              <p className='p-0 m-0 text-[16px] font-semibold text-[#000000]'>Profile Details</p>
            </div>
            <div className=' rounded-lg bg-white h-[315px] mb-[30px] mt-1'>
              <Info selectedData={selectedData} />
            </div>
          </TabPanel>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default Profile
