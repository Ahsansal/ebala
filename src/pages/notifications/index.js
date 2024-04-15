//** React Imports
import React, { useEffect, useState } from 'react'
//** MUI Imports
import { Box, Button, Card, Typography } from '@mui/material'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
//** Internal Imports
import Table from 'src/views/notifications/Table'
import AddNotificationModal from 'src/views/notifications/addNotificationModal'
//** API Imports
import { getAll } from 'src/services/notifications.service'

const Notifications = () => {
  const [addNotification, setAddNotification] = useState(false)
  const [loading, setLoading] = useState(false)
  const [notifications, setNotifications] = useState([])

  const toggleAddNotificationModal = () => {
    setAddNotification(!addNotification)
  }
  const fetchNotifications = async () => {
    setLoading(true)
    const res = await getAll()
    if (res?.success) {
      setLoading(false)
      setNotifications(res?.notifications)
    } else {
      setNotifications([])
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchNotifications()
  }, [])

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography sx={{ fontSize: '22px', color: '#333333', fontWeight: '600' }}>Notifications Records</Typography>
        <Button variant='contained' color='primary' onClick={toggleAddNotificationModal}>
          <ControlPointIcon sx={{ marginRight: 2 }} />
          <Typography
            sx={{ textTransform: 'capitalize', fontSize: '16px' }}
            color={'white'}
            variant='button'
            display='inline'
          >
            Add Notication
          </Typography>
        </Button>
      </Box>
      <Box>
        <Card sx={{ boxShadow: 'none', p: '20px', minHeight: '75vh' }}>
          <Table loading={loading} data={notifications} updateNotifications={fetchNotifications} />
        </Card>
        {addNotification && (
          <AddNotificationModal
            open={addNotification}
            toggle={toggleAddNotificationModal}
            updateNotifications={fetchNotifications}
          />
        )}
      </Box>
    </Box>
  )
}

export default Notifications
