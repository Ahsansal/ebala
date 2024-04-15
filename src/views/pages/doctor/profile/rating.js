import React from 'react'
import Rating from '@mui/material/Rating'
import { DataGrid } from '@mui/x-data-grid'
import NoRowsComponent from 'src/components/NoRowsComponent'
const Ratings = ({ ratings, stars }) => {
  const columns = [
    { field: 'doctorRatingID', headerName: 'ID', flex: 0.2 },
    { field: 'user', headerName: 'Patient Name', flex: 1 },
    {
      field: 'rating',
      headerName: 'Rating',
      flex: 0.7,
      renderCell: params => <Rating name='custom-rating' value={params.value} readOnly size='small' />
    },
    { field: 'recommended', headerName: 'Recommended', flex: 0.5 },
    { field: 'review', headerName: 'Review', flex: 1.5 }
  ]

  const rows = ratings.map(item => ({
    id: item.doctorRatingID,
    doctorRatingID: item.doctorRatingID,
    user: item.user?.name,
    rating: item.rating,
    recommended: item.recommended,
    review: item.review
  }))

  return (
    <div className='w-full h-full overflow-x-auto'>
      {stars && (
        <div className='py-[19px] px-[23px]'>
          <div className='flex items-center gap-[20px] flex-wrap'>
            <div className='contents w-[200px]'>
              <p className='p-0 m-0 text-[15px] font-medium text-[#171515]'>Overall Rating</p>
              <Rating name='overall-rating' value={stars} readOnly />
            </div>
          </div>
        </div>
      )}
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

export default Ratings
