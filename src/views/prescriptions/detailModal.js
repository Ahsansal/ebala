//** React/Next Imports
import Image from 'next/image'
//** Internal Imports
import Loader from 'src/components/Loader'
//** MUI Imports
import { Dialog, DialogContent, IconButton, Button } from '@mui/material'
const DetailModal = ({ open, onClose, loader, data }) => {
  return (
    <Dialog fullWidth open={open} maxWidth='lg' scroll='body' onClose={onClose}>
      <IconButton
        edge='end'
        color='inherit'
        onClick={onClose}
        aria-label='close'
        sx={{
          position: 'absolute',
          top: '10px',
          right: '25px',
          color: '#ffffff'
        }}
      >
        <Image src='/icons/Close.png' alt='Close-Icon' width={20} height={20} />
      </IconButton>

      <DialogContent>
        {loader ? (
          <div class='flex items-center justify-center h-[400px]'>
            <Loader color={'success'} />
          </div>
        ) : (
          <div class='mx-auto p-6 bg-white'>
            <h2 class='text-2xl font-semibold mb-4'>Medical Prescription</h2>
            <div class='mb-4'>
              <p class='text-gray-600'>Prescription title: {data?.title}</p>
              <p class='text-gray-600'>Patient Name: {data?.user?.name}</p>
              <p class='text-gray-600'>Diagnose: {data?.diagnose}</p>
              <p class='text-gray-600'>Symptoms: {data?.symptoms}</p>
            </div>
            <div class='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <h3 class='text-xl font-semibold mb-2 col-span-full'>Medicines:</h3>
              {data?.medicines?.length === 0 ? (
                <p>No Medicines Added</p>
              ) : (
                data?.medicines?.map((item, index) => {
                  return (
                    <div key={index} class='bg-gray-100 p-4 rounded-md '>
                      <p class='text-lg font-semibold mb-2'>{item?.name}</p>
                      <p class='text-gray-600'>Dosage: {item?.dosage}</p>
                      <p class='text-gray-600'>Frequency: {item?.frequency}</p>
                      <p class='text-gray-600'>Duration: {item?.duration}</p>
                      <p class='text-gray-600'>Instruction: {item?.instruction}</p>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        )}
        <div className='flex justify-end'>
          <Button
            variant='outlined'
            onClick={onClose}
            sx={{
              borderRadius: '8px',
              width: '89px',
              background: '#CCCFCF',
              fontSize: '14px',
              fontWeight: '600',
              color: '#1A2825',
              border: '0px',
              '&:hover': {
                background: '#A0A3A3',
                color: '#242424',
                border: '0px'
              }
            }}
          >
            close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DetailModal
