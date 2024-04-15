//** React Imports
import React, { useEffect, useState } from 'react'
//** MUI Imports
import { Box, Button, Card, Typography } from '@mui/material'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
//** Internal Imports
import { useAuth } from 'src/hooks/useAuth'
import Table from 'src/views/services/Table'
import AddServiceModal from 'src/views/services/addServiceModal'
//** API Imports
import { getAll } from 'src/services/services.service'

const ServicesList = () => {
  const [addService, setAddService] = useState(false)
  const [loading, setLoading] = useState(false)
  const [services, setServices] = useState([])
  const [serviceId, setServiceId] = useState(null)
  const auth = useAuth()

  const toggleAddServiceModal = () => {
    setServiceId(null)
    setAddService(!addService)
  }
  const toggleEditService = id => {
    setServiceId(id)
    setAddService(!addService)
  }
  const fetchServices = async () => {
    setLoading(true)
    const res = await getAll()
    if (res?.success) {
      setLoading(false)
      setServices(res?.services)
    } else {
      setServices([])
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchServices()
  }, [])

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography sx={{ fontSize: '22px', color: '#333333', fontWeight: '600' }}>
          {`Welcome ${auth?.user?.name}`}
        </Typography>
        {services?.length > 0 && (
          <Button variant='contained' color='primary' onClick={toggleAddServiceModal}>
            <ControlPointIcon sx={{ marginRight: 2 }} />
            <Typography
              sx={{ textTransform: 'capitalize', fontSize: '16px' }}
              color={'white'}
              variant='button'
              display='inline'
            >
              Add Service
            </Typography>
          </Button>
        )}
      </Box>
      <Box>
        <Card sx={{ boxShadow: 'none', p: '20px', minHeight: '75vh' }}>
          <Table loading={loading} data={services} fetchServices={fetchServices} toggleEdit={toggleEditService} />
        </Card>
        {addService && (
          <AddServiceModal
            serviceId={serviceId}
            open={addService}
            fetchServices={fetchServices}
            toggle={toggleAddServiceModal}
          />
        )}
      </Box>
    </Box>
  )
}

export default ServicesList
