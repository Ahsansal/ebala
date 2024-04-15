import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import NoRowsComponent from 'src/components/NoRowsComponent'
const Experience = ({ experiences }) => {
  const columns = [
    { field: 'experienceId', headerName: 'ID', flex: 0.2 },
    { field: 'companyName', headerName: 'Company Name', flex: 1 },
    { field: 'jobTitle', headerName: 'Job Title', flex: 1 },
    { field: 'jobType', headerName: 'Job Type', flex: 0.7 },
    { field: 'location', headerName: 'Location', flex: 1 },
    { field: 'position', headerName: 'Position', flex: 1 },
    { field: 'specialization', headerName: 'Specialization', flex: 1 },
    { field: 'yearStart', headerName: 'Start Year', flex: 0.5 },
    { field: 'yearEnd', headerName: 'End Year', flex: 0.5 }
  ]

  const rows = experiences.map(item => ({
    id: item.experienceId,
    experienceId: item.experienceId,
    companyName: item.companyName,
    jobTitle: item.jobTitle,
    jobType: item.jobType,
    location: item.location,
    position: item.position,
    specialization: item.specialization,
    yearStart: item.yearStart,
    yearEnd: item.yearEnd
  }))

  return (
    <div className='w-full h-full overflow-x-auto'>
      <DataGrid
        slots={{
          noRowsOverlay: NoRowsComponent
        }}
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10]}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  )
}

export default Experience
