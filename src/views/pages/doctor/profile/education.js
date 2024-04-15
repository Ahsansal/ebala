import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import NoRowsComponent from 'src/components/NoRowsComponent'

const Education = ({ education }) => {
  const columns = [
    { field: 'educationId', headerName: 'ID', flex: 0.2 },
    { field: 'degreeName', headerName: 'Degree Name', flex: 1 },
    { field: 'degreeType', headerName: 'Degree Type', flex: 1 },
    { field: 'Subjects', headerName: 'Subjects', flex: 1 },
    { field: 'instituteName', headerName: 'Institute Name', flex: 1 },
    { field: 'specialization', headerName: 'Specialization', flex: 1 },
    { field: 'yearStart', headerName: 'Start Year', flex: 0.5 },
    { field: 'yearEnd', headerName: 'End Year', flex: 0.5 }
  ]

  const rows = education.map(item => ({
    id: item.educationId,
    educationId: item.educationId,
    degreeName: item.degreeName,
    degreeType: item.degreeType,
    Subjects: item.Subjects,
    instituteName: item.instituteName,
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

export default Education
