//** MUI Imports
import { DataGrid } from '@mui/x-data-grid'
import NoRowsComponent from 'src/components/NoRowsComponent'
//** Internal Imports
import Columns from './column'

const Table = ({ loading, data, fetchServices, toggleEdit }) => {
  const Background_Color = process.env.NEXT_PUBLIC_THEME_COLOR || '#4F786A'
  const columns = Columns({ fetchServices, toggleEdit, Background_Color })

  return (
    <DataGrid
      autoHeight
      disableSelectionOnClick
      rowHeight={60}
      rows={data || []}
      columns={columns}
      loading={loading}
      hideFooterPagination
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
          fontWeight: '600'
        }
      }}
    />
  )
}

export default Table
