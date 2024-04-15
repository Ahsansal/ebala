//** React Imports
import { useEffect, useState } from 'react'
//** MUI Imports
import { Box, Button, Card, Typography } from '@mui/material'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
//** Internal Imports
import { useAuth } from 'src/hooks/useAuth'
import Table from 'src/views/prescriptions/Table'
import DetailModal from 'src/views/prescriptions/detailModal'
import AddPrescription from 'src/views/prescriptions/addPrescriptionModal'
//** API Imports
import { getAll, getPrescriptionById } from 'src/services/prescriptions.service'

const Prescriptions = () => {
  const [loading, setLoading] = useState(false)
  const [addFormloader, setAddFormloader] = useState(false)
  const [medicines, setMedicines] = useState([])
  const [Prescriptions, setPrescriptions] = useState([])
  const [openMedicine, setOpenMedicine] = useState(false)
  const [PrescriptionsId, setPrescriptionsId] = useState(null)
  const [addPrescriptions, setAddPrescriptions] = useState(false)
  const [editPrescription, setEditPrescription] = useState(false)
  const [prescriptionLoader, setPrescriptionLoader] = useState(false)

  const auth = useAuth()
  const toggleAddPrescriptionsModal = () => {
    setPrescriptionsId(null)
    setAddPrescriptions(!addPrescriptions)
  }
  const toggleEditPrescription = async id => {
    setEditPrescription(true)
    setAddFormloader(true)
    const res = await getPrescriptionById(id)
    setAddPrescriptions(!addPrescriptions)
    if (res?.success) {
      setMedicines(res?.prescription)
      setAddFormloader(false)
    } else {
      setMedicines([])
      setAddFormloader(false)
    }
  }

  const fetchUserPrescriptions = async id => {
    setPrescriptionLoader(true)
    const res = await getPrescriptionById(id)
    if (res?.success) {
      setMedicines(res?.prescription)
      setPrescriptionLoader(false)
    } else {
      setMedicines([])
      setPrescriptionLoader(false)
    }
  }

  const handleOpenMedicine = prescriptionId => {
    setOpenMedicine(true)
    fetchUserPrescriptions(prescriptionId)
  }
  const handleCloseMedicine = () => {
    setOpenMedicine(false)
    setMedicines([])
  }
  const fetchPrescriptions = async () => {
    setLoading(true)
    const res = await getAll()
    if (res?.success) {
      setPrescriptions(res?.prescriptions)
      setLoading(false)
    } else {
      setPrescriptions([])
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchPrescriptions()
  }, [])

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography sx={{ fontSize: '22px', color: '#333333', fontWeight: '600' }}>
          {`Welcome ${auth?.user?.name}`}
        </Typography>
        <Button variant='contained' color='primary' onClick={toggleAddPrescriptionsModal}>
          <ControlPointIcon sx={{ marginRight: 2 }} />
          <Typography
            sx={{ textTransform: 'capitalize', fontSize: '16px' }}
            color={'white'}
            variant='button'
            display='inline'
          >
            Add Prescription
          </Typography>
        </Button>
      </Box>
      <Box>
        <Card sx={{ boxShadow: 'none', p: '20px', minHeight: '75vh' }}>
          <Table
            loading={loading}
            data={Prescriptions}
            handleOpenMedicine={handleOpenMedicine}
            toggleEdit={toggleEditPrescription}
            setPrescriptions={setPrescriptions}
          />
        </Card>
        {openMedicine && (
          <DetailModal open={openMedicine} onClose={handleCloseMedicine} loader={prescriptionLoader} data={medicines} />
        )}
        {addPrescriptions && (
          <AddPrescription
            PrescriptionsId={PrescriptionsId}
            fetchAll={fetchPrescriptions}
            open={addPrescriptions}
            toggle={toggleAddPrescriptionsModal}
            prescriptions={Prescriptions}
            setPrescriptions={setPrescriptions}
            loading={addFormloader}
            setLoading={setAddFormloader}
            editMode={editPrescription}
            setEditMode={setEditPrescription}
            editData={medicines}
            setEditData={setMedicines}
          />
        )}
      </Box>
    </Box>
  )
}

export default Prescriptions
