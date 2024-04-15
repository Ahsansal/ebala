import axios from './index'

const createDoctor = async data => {
  try {
    const endpoint = '/doctors/simpleCreate/'

    const response = await axios.put(endpoint, data)
    return response.data
  } catch (e) {
    return e
  }
}

const getAllDoctor = async () => {
  try {
    const endpoint = '/doctors/'
    const response = await axios.get(endpoint)
    return response.data
  } catch (e) {
    console.log(e)
  }
}

const updateDoctor = async data => {
  try {
    const endpoint = '/doctors/update/'

    const response = await axios.patch(endpoint, data)
    return response.data
  } catch (e) {
    console.log(e)
    return e
  }
}
const getByIdDoctor = async id => {
  try {
    const endpoint = '/doctors/' + id

    const response = await axios.get(endpoint)
    return response.data
  } catch (e) {
    console.log(e)
    return e
  }
}
const addDoctorEducationById = async (id, data) => {
  try {
    const endpoint = `/doctors/addEducation/${id}`

    const response = await axios.put(endpoint, data)
    return response.data
  } catch (e) {
    console.log(e)
    return e
  }
}
const removeDoctor = async id => {
  try {
    const endpoint = '/doctors/' + id

    const response = await axios.delete(endpoint)
    return response.data
  } catch (e) {
    console.log(e)
    return e
  }
}
const updateDoctorTimeSlot = async data => {
  try {
    const response = await axios.patch('/doctors/updateTimeSlot/', data)
    return response.data
  } catch (e) {
    console.log(e)
    return e
  }
}
const deleteDoctorEducation = async id => {
  try {
    const endpoint = 'doctors/education/' + id
    const response = await axios.delete(endpoint)
    return response.data
  } catch (e) {
    console.log(e)
    return e
  }
}
const updateDoctorEducation = async data => {
  try {
    const response = await axios.patch('doctors/updateEducation/', data)
    return response.data
  } catch (e) {
    console.log(e)
    return e
  }
}
const addDoctorExperienceById = async (id, data) => {
  try {
    const endpoint = `/doctors/addExperience/${id}`
    const response = await axios.put(endpoint, data)
    return response.data
  } catch (e) {
    console.log(e)
    return e
  }
}
const deleteDoctorExperience = async id => {
  try {
    const endpoint = 'doctors/experience/' + id
    const response = await axios.delete(endpoint)
    return response.data
  } catch (e) {
    console.log(e)
    return e
  }
}
const updateDoctorExperience = async data => {
  try {
    const response = await axios.patch('doctors/updateExperience', data)
    return response.data
  } catch (e) {
    console.log(e)
    return e
  }
}
const addDoctorTimeSlots = async (id, data) => {
  try {
    const endpoint = `/doctors/addTimeSlots/${id}`
    const response = await axios.put(endpoint, data)
    return response.data
  } catch (e) {
    console.log(e)
    return e
  }
}
const deleteDoctorTimeSlot = async id => {
  try {
    const endpoint = 'doctors/timeSlot/' + id
    const response = await axios.delete(endpoint)
    return response.data
  } catch (e) {
    console.log(e)
    return e
  }
}
export {
  getAllDoctor,
  createDoctor,
  updateDoctor,
  getByIdDoctor,
  removeDoctor,
  addDoctorTimeSlots,
  updateDoctorTimeSlot,
  deleteDoctorTimeSlot,
  deleteDoctorEducation,
  updateDoctorEducation,
  updateDoctorExperience,
  deleteDoctorExperience,
  addDoctorEducationById,
  addDoctorExperienceById
}
