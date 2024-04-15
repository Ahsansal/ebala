import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import NoRowsComponent from 'src/components/NoRowsComponent'

const Appointments = ({ appointments, changedColumn: { fieldName, header } }) => {
  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    { field: fieldName, headerName: header, flex: 1, valueGetter: params => params?.row[fieldName] },
    { field: 'isCancel', headerName: 'Canceled', flex: 0.7, valueGetter: params => (params.value ? 'Yes' : 'No') },
    { field: 'isComplete', headerName: 'Completed', flex: 0.7, valueGetter: params => (params.value ? 'Yes' : 'No') },
    {
      field: 'timeSlot',
      headerName: 'Time Slot',
      flex: 1,
      valueGetter: params => `${params.row.timeSlot.startTime} - ${params.row.timeSlot.endTime}`
    }
  ]

  const rows = appointments.map(appointment => {
    return {
      id: appointment.id,
      [fieldName]: appointment[fieldName]?.name,
      isCancel: appointment.isCancel,
      isComplete: appointment.isComplete,
      timeSlot: appointment.timeSlot
    }
  })

  return (
    <div className='w-full h-full overflow-x-auto'>
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        pageSize={5}
        disableSelectionOnClick
        rowsPerPageOptions={[5, 10]}
        slots={{
          noRowsOverlay: NoRowsComponent
        }}
      />
    </div>
  )
}

export default Appointments
