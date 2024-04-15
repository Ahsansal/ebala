//** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'


const AnalyticsCongratulations = ({ h, w }) => {

  return (
    <Card sx={{ position: 'relative', height: h, width: w }}>
      <CardContent sx={{ p: theme => `${theme.spacing(6.75, 7.5)} !important` }}>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6}>
            <Typography variant='h5' sx={{ mb: 4.5 }}>
              hello world
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default AnalyticsCongratulations
