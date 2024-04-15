//** React Imports
import React, { useEffect, useState } from 'react'
//** MUI Imports
import { Box, Button, Card, Typography } from '@mui/material'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
//** Internal Imports
import { useAuth } from 'src/hooks/useAuth'
import Table from 'src/views/appointments/Table'
import AddAppointment from 'src/views/appointments/addAppointmentsModal'
//** API Imports
import { getAll } from 'src/services/appointments.service'

const AppointmentList = () => {
  const [appointment, setAddAppointment] = useState(false)
  const [loading, setLoading] = useState(false)
  const [appointmentes, setAppointments] = useState([])
  const [appointmentId, setAppointmentId] = useState(null)
  const auth = useAuth()

  const toggleAddAppointmentModal = () => {
    setAppointmentId(null)
    setAddAppointment(!appointment)
  }
  const toggleEditAppointment = id => {
    setAppointmentId(id)
    setAddAppointment(!appointment)
  }
  const fetchAppointment = async () => {
    setLoading(true)
    const res = await getAll()
    if (res?.success) {
      setLoading(false)
      setAppointments(res?.appointments)
    } else {
      setAppointments([])
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchAppointment()
  }, [])

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography sx={{ fontSize: '22px', color: '#333333', fontWeight: '600' }}>
          {`Welcome ${auth?.user?.name}`}
        </Typography>
        <Button variant='contained' color='primary' onClick={toggleAddAppointmentModal}>
          <ControlPointIcon sx={{ marginRight: 2 }} />
          <Typography
            sx={{ textTransform: 'capitalize', fontSize: '16px' }}
            color={'white'}
            variant='button'
            display='inline'
          >
            Add Appointment
          </Typography>
        </Button>
      </Box>
      <Box>
        <Card sx={{ boxShadow: 'none', p: '20px', minHeight: '75vh' }}>
          <Table
            loading={loading}
            data={appointmentes}
            fetchAppointment={fetchAppointment}
            toggleEdit={toggleEditAppointment}
          />
        </Card>
        {appointment && (
          <AddAppointment
            appointmentId={appointmentId}
            open={appointment}
            fetchAppointment={fetchAppointment}
            toggle={toggleAddAppointmentModal}
          />
        )}
      </Box>
    </Box>
  )
}

export default AppointmentList
