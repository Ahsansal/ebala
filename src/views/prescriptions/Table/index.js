//** MUI Imports
import { DataGrid } from '@mui/x-data-grid'
import NoRowsComponent from 'src/components/NoRowsComponent'
//** Internal Imports
import Columns from './column'

const Table = ({ loading, data, handleOpenMedicine, toggleEdit, setPrescriptions }) => {
  const columns = Columns({ toggleEdit, data, setPrescriptions })

  return (
    <DataGrid
      autoHeight
      disableSelectionOnClick
      rowHeight={60}
      rows={data || []}
      columns={columns}
      loading={loading}
      onCellClick={({ field, row }) => field !== 'actions' && handleOpenMedicine(row?.id)}
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
        },
        '& .MuiDataGrid-cell': {
          '&:hover': {
            cursor: 'pointer'
          }
        }
      }}
    />
  )
}

export default Table
