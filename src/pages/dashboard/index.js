//** React Imports
import * as React from 'react'
//** MUI Imports
import { Grid } from '@mui/material'
//** Internal Imports
import { useAuth } from 'src/hooks/useAuth'
import Table from 'src/views/dashboards/Table'
import HeaderCard from 'src/views/dashboards/HeaderCard'
import { useLanguage } from 'src/context/LanguageContext'
import LineChart from 'src/views/dashboards/Charts/LineChart'
import { getTranslations } from 'src/context/getTranslations'
import DonutChart from 'src/views/dashboards/Charts/donutChart'
import RightBoxDashboard from 'src/views/dashboards/RightBoxDashboard'

const Dashboard = () => {
  const { language } = useLanguage()
  const {
    pages: { dashboard }
  } = getTranslations(language)
  const auth = useAuth()

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <HeaderCard />
      </Grid>
      <Grid item xs={12} md={12} lg={8.6}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8.5} lg={8.4} xl={8.5}>
            <LineChart />
          </Grid>
          <Grid item xs={12} md={3.5} lg={3.6} xl={3.5}>
            <DonutChart />
          </Grid>
          <Grid item xs={12} md={12}>
            <Table />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12} lg={3.4}>
        <RightBoxDashboard user={auth?.user} />
      </Grid>
    </Grid>
  )
}

export default Dashboard
