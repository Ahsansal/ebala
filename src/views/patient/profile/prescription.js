import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import Tooltip from '@mui/material/Tooltip'
import { GiMedicines } from 'react-icons/gi'
import NoRowsComponent from 'src/components/NoRowsComponent'

const Prescription = ({ prescriptions }) => {
  const formatMedicines = medicines => {
    return medicines?.map((medicine, index) => ({
      id: index,
      name: medicine.name,
      dosage: medicine.dosage,
      frequency: medicine.frequency,
      duration: medicine.duration
    }))
  }

  const renderMedicineTooltip = medicines => {
    const totalMedicines = medicines?.length
    return (
      <div className='max-h-[200px] overflow-y-auto'>
        {totalMedicines > 0 ? (
          formatMedicines(medicines).map((medicine, index) => (
            <div key={medicine.id}>
              <p>
                <span className='font-bold'>{`${index + 1}) Name:`}</span> {medicine.name}
              </p>
              <p>
                <span className='font-bold'>Dosage:</span>
                {medicine.dosage}
              </p>
              <p>
                <span className='font-bold'>Frequency:</span> {medicine.frequency}
              </p>
              <p>
                <span className='font-bold'>Duration:</span> {medicine.duration}
              </p>
              {index !== totalMedicines - 1 && <hr />}
            </div>
          ))
        ) : (
          <p>no medicines found!</p>
        )}
      </div>
    )
  }

  const columns = [
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'diagnose', headerName: 'Diagnose', flex: 1 },
    { field: 'symptoms', headerName: 'Symptoms', flex: 1 },
    {
      field: 'medicines',
      headerName: 'Medicines',
      flex: 0.5,
      renderCell: params => (
        <Tooltip title={renderMedicineTooltip(params.value)} placement='right-start' className='cursor-pointer'>
          <span>
            <GiMedicines size={25} />
          </span>
        </Tooltip>
      )
    }
  ]

  const rows = prescriptions.map((prescription, index) => ({
    id: index,
    title: prescription.title,
    diagnose: prescription.diagnose,
    symptoms: prescription.symptoms,
    medicines: prescription.medicines
  }))

  return (
    <div className='w-full h-full overflow-x-auto'>
      <DataGrid
        rows={rows}
        pageSize={5}
        rowHeight={60}
        columns={columns}
        disableSelectionOnClick
        rowsPerPageOptions={[5, 10]}
        slots={{
          noRowsOverlay: NoRowsComponent
        }}
      />
    </div>
  )
}

export default Prescription
