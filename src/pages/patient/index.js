//** React Imports
import { useState, useEffect } from 'react'
//** MUI Imports
import { DataGrid } from '@mui/x-data-grid'
import { Box, Card, Button, Typography } from '@mui/material'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
//** Internal Imports
import DeleteGifIcon from 'src/gifs/done.json'
import Profile from 'src/views/patient/profile'
import { getAll } from 'src/services/patient.service'
import { getColumns } from 'src/views/patient/columns'
import NoRowsComponent from 'src/components/NoRowsComponent'
import AddPatient from 'src/views/patient/createPatientModal'
import SuccessFullyDoneModal from 'src/views/pages/common/successfullyDoneModal'
const Patient = () => {
  // ** State
  // const [value, setValue] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [addPatientOpen, setAddPatientOpen] = useState(false)
  const [patientData, setPatientdata] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [isSuccessModal, setIsSuccessModal] = useState(false)
  const [patientId, setPatientId] = useState(null)

  const fetchPatients = async () => {
    setLoading(true)
    const response = await getAll()
    if (response?.success) {
      setLoading(false)
      setPatientdata(response?.users)
    } else {
      setLoading(false)
      setPatientdata([])
    }
  }
  useEffect(() => {
    fetchPatients()
  }, [])

  // const handleFilter = val => {
  //   setValue(val)
  //   if (val !== '') {
  //     const filteredData = teacherData?.filter(item => {
  //       if (val === '') {
  //         return item
  //       } else if (
  //         item?.teachers[0]?.name?.toLowerCase()?.includes(val?.toLowerCase()) ||
  //         item?.teachers[0]?.nameAr?.toLowerCase()?.includes(val?.toLowerCase()) ||
  //         item?.teachers[0]?.city?.toLowerCase()?.includes(val?.toLowerCase()) ||
  //         item?.teachers[0]?.gender?.toLowerCase()?.includes(val?.toLowerCase()) ||
  //         item?.teachers[0]?.phoneNo?.toLowerCase()?.includes(val?.toLowerCase()) ||
  //         item?.email?.toLowerCase()?.includes(val?.toLowerCase()) ||
  //         JSON?.stringify(item?.teachers[0]?.teacherId)?.includes(val)
  //       ) {
  //         return item
  //       }
  //     })

  //     setTeacherdata(filteredData)
  //   } else {
  //     fetchTeachers()
  //   }
  // }

  const toggleAddPatientModal = () => {
    setPatientId(null)
    setAddPatientOpen(!addPatientOpen)
  }
  const toggleEditPatientModal = id => {
    setPatientId(id)
    setAddPatientOpen(!addPatientOpen)
  }
  const handleOpenProfile = data => {
    setPatientId(data?.id)
    setOpenProfile(true)
  }
  const handleCloseProfile = () => {
    setOpenProfile(false)
  }
  const [openProfile, setOpenProfile] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [selectedRowIndex, setSelectedRowIndex] = useState(null)

  const columns = getColumns({
    fetchPatients,
    toggleEditPatientModal,
    showPass,
    setShowPass,
    selectedRowIndex,
    setSelectedRowIndex,
    handleOpenProfile
  })

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography sx={{ fontSize: '22px', fontWeight: '600' }}>{'Patient Records'}</Typography>
        <Button variant='contained' color='primary' onClick={toggleAddPatientModal}>
          <ControlPointIcon sx={{ marginRight: 2 }} />
          <Typography
            sx={{ textTransform: 'capitalize', fontSize: '16px' }}
            color={'white'}
            variant='button'
            display='inline'
          >
            Add Patient
          </Typography>
        </Button>
      </Box>
      <Box>
        <Card sx={{ boxShadow: 'none', p: '20px', minHeight: '75vh' }}>
          {/* <TableHeader /> */}
          <DataGrid
            onCellClick={params => {
              if (params.field === 'actions' || params.field === 'id/password') {
              } else {
                handleOpenProfile(params.row)
              }
            }}
            autoHeight
            rowHeight={70}
            rows={patientData || []}
            columns={columns}
            pageSize={pageSize}
            loading={isLoading}
            disableSelectionOnClick
            rowsPerPageOptions={[10, 20, 50, 100]}
            slots={{
              noRowsOverlay: NoRowsComponent
            }}
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                borderRadius: 0,
                backgroundColor: '#EAECF0',
                borderBottom: '1px solid #999',
                borderTopRightRadius: '8px',
                borderTopLeftRadius: '8px',
                color: '#242424',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }
            }}
            onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          />
        </Card>
        {openProfile && <Profile open={openProfile} onClose={handleCloseProfile} patientId={patientId} />}
        {addPatientOpen && (
          <AddPatient
            // teacherId={teacherId}
            open={addPatientOpen}
            fetchPatients={fetchPatients}
            toggle={toggleAddPatientModal}
            setPatientId={setPatientId}
            patientId={patientId}
          />
        )}
        {isSuccessModal && (
          <SuccessFullyDoneModal
            open={isSuccessModal}
            animationData={DeleteGifIcon}
            handleClose={() => setIsSuccessModal(false)}
            heading={'Successfully'}
            subHeading={"You've Successfully added the Patient."}
            animationWidth={'300px'}
            animationHeight={'25opx'}
          />
        )}
      </Box>
    </Box>
  )
}

export default Patient
