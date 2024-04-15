import { useState, useEffect } from 'react'
// ** MUI Imports
import { DataGrid } from '@mui/x-data-grid'
import { Box, Button, Card, Typography } from '@mui/material'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
//** Internal Imports
import Profile from 'src/views/pages/doctor/profile'
import { getColumns } from 'src/views/doctor/doctorTable'
import { getAllDoctor } from 'src/services/doctor.service'
import NoRowsComponent from 'src/components/NoRowsComponent'
import CreateDoctor from 'src/views/pages/doctor/doctorCreation'

const Doctors = () => {
  const [addDoctor, setAddDoctor] = useState(false)
  const [doctorData, setDoctorData] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [pageSize, setPageSize] = useState(10)
  const [doctorId, setDoctorId] = useState(null)
  const [addDoctorOpen, setAddDoctorOpen] = useState(false)

  const userFetchData = async () => {
    setLoading(true)
    const response = await getAllDoctor()
    if (response?.success) {
      setDoctorData(response?.doctors)
    }
    setLoading(false)
  }

  useEffect(() => {
    userFetchData()
  }, [])

  const handleOpenProfile = data => {
    setDoctorId(data?.id)
    setAddDoctorOpen(true)
  }
  const handleCloseProfile = () => {
    setDoctorId(null)
    setAddDoctorOpen(false)
  }

  const toggleAddDoctorModal = () => {
    setAddDoctor(!addDoctor)
  }

  const columns = getColumns({ userFetchData, toggleAddDoctorModal, setDoctorId })

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography sx={{ fontSize: '22px', color: 'black', fontWeight: '600' }}>Doctors</Typography>
        <Button variant='contained' color='primary' onClick={toggleAddDoctorModal}>
          <ControlPointIcon sx={{ marginRight: 2 }} />
          <Typography color={'white'} variant='button' display='inline' sx={{ textTransform: 'capitalize' }}>
            Add Doctor
          </Typography>
        </Button>
      </Box>
      <Card sx={{ boxShadow: 'none', p: '20px', minHeight: '75vh' }}>
        <DataGrid
          onCellClick={params => params.field !== 'actions' && handleOpenProfile(params.row)}
          autoHeight
          rowHeight={60}
          rows={doctorData || []}
          columns={columns}
          disableSelectionOnClick
          loading={isLoading}
          pageSize={pageSize}
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
            },
            '& .MuiDataGrid-cell': {
              '&:hover': {
                cursor: 'pointer'
              }
            }
          }}
        />
      </Card>
      {addDoctorOpen && (
        <Profile open={addDoctorOpen} onClose={handleCloseProfile} doctorId={doctorId} setDoctorId={setDoctorId} />
      )}
      {addDoctor && (
        <CreateDoctor
          open={addDoctor}
          toggle={toggleAddDoctorModal}
          userFetchData={userFetchData}
          doctorId={doctorId}
          setDoctorId={setDoctorId}
        />
      )}
    </Box>
  )
}

export default Doctors
