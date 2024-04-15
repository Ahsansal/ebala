//** MUI Imports
import { Box } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'

//** Internal Imports
import TableHeader from './TableHeader'
import Columns from './column'

const data = [
  {
    id: 1,
    name: 'Haylie',
    grade: '6th (A)',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTblZyrJ4F1nmvqJkXd1wEwjnm8Z0X-wnUAeOujfw_mxA&s',
    checkoutby: 'Jhon Smith',
    category: 'Water pass',
    time: '12:34:25'
  },
  {
    id: 2,
    name: 'James',
    grade: '6th (A)',
    url: 'https://www.shutterstock.com/image-photo/portrait-confident-cool-entrepreneur-guy-260nw-1543797515.jpg',
    checkoutby: 'Jhon Smith',
    category: 'Water pass',
    time: '12:34:25'
  },
  {
    id: 3,
    name: 'Johns',
    grade: '6th (A)',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkKOhTC7uF8wsYRfNsZme5g22peKJuuoDbNsYMW2PakC1t4B4X_n3fWHHPka3sWG1XoFQ&usqp=CAU',
    checkoutby: 'Jhon Smith',
    category: 'Water pass',
    time: '12:34:25'
  },
  {
    id: 4,
    name: 'Doe',
    grade: '6th (A)',
    url: 'https://www.shutterstock.com/image-photo/happy-young-man-portrait-handsome-260nw-262734242.jpg',
    checkoutby: 'Jhon Smith',
    category: 'Water pass',
    time: '12:34:25'
  },
  {
    id: 5,
    name: 'Robert',
    grade: '6th (A)',
    url: 'https://thumbs.dreamstime.com/b/photographer-holding-camera-close-up-back-view-selective-focus-colored-vertical-stripes-background-71664253.jpg',
    checkoutby: 'Jhon Smith',
    category: 'Water pass',
    time: '12:34:25'
  }
]

const Table = () => {
  const Background_Color = process.env.NEXT_PUBLIC_THEME_COLOR || '#4F786A'
  const columns = Columns({ Background_Color })

  return (
    <Box sx={{ backgroundColor: 'white', borderRadius: '16px', maxHeight: '100%', px: '24px' }} spacing={6}>
      <TableHeader pageTitle={'Recent Payments'} />
      <DataGrid
        autoHeight
        rowHeight={60}
        rows={data || []}
        columns={columns}
        hideFooterPagination
        sx={{
          '& .MuiDataGrid-columnHeaders': {
            borderRadius: 0,
            backgroundColor: Background_Color,
            borderBottom: '1px solid #999',
            borderTopRightRadius: '10px',
            borderTopLeftRadius: '10px',
            color: '#ffff',
            fontSize: '14px',
            fontWeight: '600'
          }
        }}
      />
    </Box>
  )
}

export default Table
