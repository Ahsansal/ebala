//** MUI Imports
import Box from '@mui/material/Box'
import { TextField, Typography } from '@mui/material'
//** Internal Imports
import Icon from 'src/@core/components/icon'

const TableHeader = props => {
  // ** Props
  const { pageTitle } = props

  return (
    <Box    >
      <Typography sx={{ fontSize: '18px', fontWeight: '600', color: '#333' }}>{pageTitle}</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          // value={value}
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: '100px',
              height: '30px',
              width: '400px',
              backgroundColor: '#F5F5F5',
              color: 'black',
              fontSize: '15px',
              paddingLeft: '5px',
              border: 'none'
            }
          }}
          autoComplete='off'
          placeholder='Search...'
          onChange={e => (e.target.value)}
        />
        <div className='relative'>
          <Icon icon='arcticons:pixel-search' className='absolute right-10 -top-[15px]' />
        </div>
      </Box>
    </Box>
  )
}

export default TableHeader
