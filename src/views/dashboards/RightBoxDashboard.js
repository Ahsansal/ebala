//** React Imports
import { useEffect, useState } from 'react'
//** MUI Imports

import RecentConduct from './RecentConduct'
import { Box, Divider, Grid, Card, Skeleton, Stack } from '@mui/material'
//** Service Imports
import { getDashboard } from 'src/services/dashboard.service'

const Background_Color_Secondary = process.env.NEXT_PUBLIC_THEME_COLOR_SECONDARY

const RightBoxDashboard = () => {
  const [result, setResult] = useState([])
  const [loading, setLoading] = useState(false)

  const dashboardData = async () => {
    setLoading(true)
    const response = await getDashboard()
    if (response.success) {
      setResult(response.result)
      setLoading(false)
    } else {
      console.log('Error')
    }
  }

  useEffect(() => {
    dashboardData()
  }, [])

  const conduct = [
    {
      title: 'Recent Appointments',
      view: 'View all',
      data: (result?.recentEntries?.recentAppointments || []).slice(0, 2).map(appointment => ({
        image: 'https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg?auto=compress&cs=tinysrgb&w=600',
        name: appointment.user?.name,
        descrypt: 'Booked the appointment with ' + appointment.doctor?.name,
        status: appointment.isCancel ? 'Canceled' : appointment.isComplete ? 'Completed' : 'InProcess',
        date: appointment.timeSlot?.date
      }))
    },
    {
      title: 'Recent Prescriptions',
      view: 'View all',
      data: (result?.recentEntries?.recentPrescriptions || []).slice(0, 2).map(prescription => ({
        image: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=600',
        name: prescription.doctor?.name,
        descrypt: prescription.title,
        status: prescription.isActive ? 'Active' : 'Inactive'
      }))
    },
    {
      title: 'Recent Review',
      view: 'View all',
      data: (result?.recentEntries?.recentRating || []).slice(0, 2).map(review => ({
        image: 'https://images.pexels.com/photos/1007066/pexels-photo-1007066.jpeg?auto=compress&cs=tinysrgb&w=600',
        name: review.doctor?.name,
        userName: review.user?.name,
        status: review.user?.status === '1' ? 'Active' : 'Inactive',
        review: review.review,
        rating: review.rating
      }))
    }
  ]

  return (
    <Card
      sx={{ backgroundColor: 'white', position: 'relative', height: '100%', borderRadius: '16px', boxShadow: 'none' }}
    >
      {conduct?.map((item, index) => {
        return (
          <Box key={index}>
            <Grid item xs={12} className=''>
              <RecentConduct data={item?.data} head={item} loading={loading} />
            </Grid>
            {conduct.length - 1 !== index && <Divider className='!mt-[20px] !mb-[20px]' />}
          </Box>
        )
      })}
    </Card>
  )
}

export default RightBoxDashboard
