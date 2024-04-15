//** React Imports
import { useEffect, useState } from 'react'
//** MUI Imports
import Grid from '@mui/material/Grid'
//** Internal Imports
import DashboardCard from './DashboardCard'
import { getDashboard } from 'src/services/dashboard.service'

const HeaderCard = () => {
  const [result, setResult] = useState([])
  const [loading, setLoading] = useState(false)
  const dahsboardData = async () => {
    setLoading(true)
    const res = await getDashboard()
    if (res.success) {
      setResult(res.result)
      setLoading(false)
    } else {
      console.log('Error')
      setLoading(false)
    }
  }
  const conduct = [
    {
      id: 1,
      name: 'Total Doctors',
      // total: 'Booked',
      count: result?.doctorCount < 10 ? `0${result?.doctorCount} ` : result?.doctorCount,
      num1: '',
      num2: ''

      // serve: 'Served'
    },
    {
      id: 2,
      name: 'Total Paitents',
      count: result?.userCount < 10 ? `0${result?.userCount}` : result?.userCount,
      num1: '',
      num2: ''
      // all: 'All the Paitents'
    },
    {
      id: 3,
      name: 'Total Services',
      // total: 'Services',
      count: result?.serviceCount < 10 ? `0${result?.serviceCount}` : result?.serviceCount,
      num1: '',
      num2: ''

      // serve: 'Served'
    },
    {
      id: 4,
      name: 'Appointments',
      // total: 'Total Appointments',
      count: result?.appointments?.total < 10 ? `0${result?.appointments?.total}` : result?.appointments?.total,
      num1: '',
      num2: ''
      // serve: 'Served'
    },
    {
      id: 5,
      name: 'Prescriptions',
      // total: 'Total Prescriptions',
      count: result?.prescriptionCount < 10 ? `0${result?.prescriptionCount}` : result?.prescriptionCount,
      num1: '',
      num2: ''
      // serve: 'Served'
    }
  ]

  useEffect(() => {
    dahsboardData()
  }, [])

  return (
    <Grid container spacing={3}>
      {conduct?.map((item, index) => {
        return (
          <Grid item key={index} xs={12} sm={6} md={4} lg={2.4} xxl={2.4} sx={{ display: 'flex' }}>
            <DashboardCard item={item} index={index} loading={loading} />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default HeaderCard
