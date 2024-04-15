//** React Imports
import React, { useState, useRef } from 'react'
//** MUI Imports
import { Box, Button, Chip, FormControl, FormHelperText, Grid, TextField, Typography } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
//** External Imports
import * as yup from 'yup'
//** Internal Imports
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import CustomInputLabel from 'src/views/components/inputLabel'
import CustomSwitch from './switchbutton'
import { useEffect } from 'react'

const Medicine = ({ setGridError, gridItems, setGridItems, editMode, editMedicines }) => {
  const [status, setStatus] = useState(false)
  const handleAddGridItem = () => {
    setGridItems(prevItems => [
      ...prevItems,
      { id: prevItems.length + 1, name: '', dosage: '', frequency: '', duration: '', instruction: '' }
    ])

    setGridError('')
  }

  const schema = yup.object().shape({
    name: yup.string().required('name is required'),
    dosage: yup.string().required('dosage is required'),
    frequency: yup.string().required('frequency is required'),
    duration: yup.string().required('duration is required'),
    instruction: yup.string().required('instruction is required')
  })
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  })
  // const handleInputChange = (id, fieldName, value) => {
  //   if (value) {
  //     setError('')
  //   }
  //   setGridItems(prevItems =>
  //     prevItems.map(item => {
  //       if (item.id === id) {
  //         return { ...item, [fieldName]: value }
  //       }
  //       return item
  //     })
  //   )
  // }
  useEffect(() => {
    if (editMode && editMedicines.length > 0) {
      setStatus(true)
      setGridItems(editMedicines)
    }
    // eslint-disable-next-line
  }, [editMedicines])
  const handleInputChange = (id, fieldName, value) => {
    setGridItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          return { ...item, [fieldName]: value }
        }
        return item
      })
    )
    setGridError('')
  }

  const handleRemoveGridItem = med => {
    const keyToRemove = editMode ? 'medicineId' : 'id'
    setGridItems(prevItems => {
      const updatedItems = prevItems?.filter(item => item[keyToRemove] !== med?.[keyToRemove])
      if (updatedItems.length === 0) {
        setStatus(false)
      }
      return updatedItems
    })
    setGridError('')
  }

  const handleStatusChange = e => {
    setStatus(e.target.checked)
    if (!e.target.checked) {
      setGridItems([])
    }
  }

  return (
    <>
      <Grid container sx={{ mt: '15px' }}>
        <Grid item xs={2} sx={{ ml: '13px' }}>
          <Typography sx={{ fontSize: '16px', fontWeight: '500', color: '#000000' }}>Add Medicines</Typography>
        </Grid>
        <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
          <CustomSwitch
            checked={status}
            onChange={e => {
              handleStatusChange(e)
              if (e.target.checked) {
                handleAddGridItem()
              }
            }}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </Grid>
      </Grid>
      {gridItems?.map((item, index) => (
        <Grid container spacing={1} key={index}>
          <Grid
            item
            xs={0.1}
            sx={{
              display: 'flex',
              alignItems: 'top',
              justifyContent: 'start',
              fontSize: '14px',
              fontWeight: '500',
              color: '#666666',
              mt: '24px'
            }}
          >
            {index + 1 + '#'}
          </Grid>
          <Grid
            item
            xs={11.53}
            sx={{
              backgroundColor: '#F2F4F7',
              mt: 5,
              borderRadius: '10px',
              marginBottom: '20px',
              border: '1px solid #B9BBBD',
              ml: '25px'
            }}
          >
            <Grid container spacing={2} sx={{ py: '20px', pr: '10px', pl: '7px' }}>
              <Grid item xs={6}>
                <CustomInputLabel label={'Name'} />
                <TextField
                  sx={{ background: '#FFFFFF', borderRadius: '8px' }}
                  fullWidth
                  placeholder='Medicine name'
                  value={item?.name}
                  onChange={e => handleInputChange(item.id, 'name', e.target.value)}
                  error={Boolean(errors.name)}
                />
                {errors.name && <FormHelperText sx={{ color: 'error.main' }}>{errors.name.message}</FormHelperText>}
              </Grid>
              <Grid item xs={6}>
                <CustomInputLabel label={'Dosage'} />
                <TextField
                  sx={{ background: '#FFFFFF', borderRadius: '8px' }}
                  fullWidth
                  placeholder='Dosage name'
                  value={item?.dosage}
                  onChange={e => handleInputChange(item.id, 'dosage', e.target.value)}
                  error={Boolean(errors.dosage)}
                />
                {errors.dosage && <FormHelperText sx={{ color: 'error.main' }}>{errors.dosage.message}</FormHelperText>}
              </Grid>
              <Grid item xs={6}>
                <CustomInputLabel label={'Frequency'} />
                <FormControl fullWidth sx={{ mb: 0 }}>
                  <Controller
                    name='frequency'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        sx={{ background: '#FFFFFF', borderRadius: '8px' }}
                        value={item?.frequency}
                        // label='Name'
                        onChange={e => handleInputChange(item.id, 'frequency', e.target.value)}
                        placeholder='frequency'
                        // error={Boolean(errors.frequency)}
                        error={Boolean(errors?.gridItems?.[index]?.frequency)}
                      />
                    )}
                  />
                  {errors.frequency && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.frequency.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <CustomInputLabel label={'Duration'} />
                <FormControl fullWidth sx={{ mb: 0 }}>
                  <Controller
                    name='duration'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        sx={{ background: '#FFFFFF', borderRadius: '8px' }}
                        value={item?.duration}
                        // label='Name'
                        onChange={e => handleInputChange(item.id, 'duration', e.target.value)}
                        placeholder='Duration'
                        error={Boolean(errors.duration)}
                      />
                    )}
                  />
                  {errors.duration && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.duration.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <CustomInputLabel label={'Instruction'} />
                <FormControl fullWidth sx={{ mb: 0 }}>
                  <Controller
                    name='instruction'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        sx={{ background: '#FFFFFF', borderRadius: '8px' }}
                        value={item?.instruction}
                        // label='Name'
                        onChange={e => handleInputChange(item.id, 'instruction', e.target.value)}
                        placeholder='Instruction'
                        error={Boolean(errors.instruction)}
                      />
                    )}
                  />
                  {errors.instruction && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.instruction.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              {gridItems?.length - 1 === index ? (
                <Button
                  variant='text'
                  onClick={() => handleAddGridItem()}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    border: '1px solid #666666',
                    width: 'auto',
                    borderRadius: '8px',
                    color: '#666666',
                    background: '#FFFFFF',
                    fontSize: '14px',
                    fontWeight: 500,
                    padding: '10px'
                  }}
                >
                  <img src='/icons/Add.png' alt='Add' style={{ cursor: 'pointer', marginRight: '5px' }} />
                  Add another
                </Button>
              ) : (
                <Box></Box>
              )}
            </Box>
            <Box>
              <Button
                variant='text'
                color='error'
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                onClick={() => handleRemoveGridItem(item)}
              >
                <DeleteForeverIcon />
                <p style={{ marginLeft: '5px', textDecoration: 'underline', textTransform: 'capitalize' }}>Remove</p>
              </Button>
            </Box>
          </Grid>
        </Grid>
      ))}
    </>
  )
}

export default Medicine
