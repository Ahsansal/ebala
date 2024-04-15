import axios from './index'

const getAll = async () => {
  try {
    const endpoint = '/prescriptions/'

    const response = await axios.get(endpoint)
    return response.data
  } catch (e) {
    console.log(e)
  }
}

const create = async data => {
  try {
    const endpoint = '/prescriptions/create'

    const response = await axios.put(endpoint, data)
    return response.data
  } catch (e) {
    return e
  }
}
const update = async data => {
  try {
    const endpoint = '/prescriptions/update/'

    const response = await axios.patch(endpoint, data)
    await getAll()
    return response.data
  } catch (e) {
    console.log(e)
    return e
  }
}
const getByID = async id => {
  try {
    const endpoint = '/prescriptions/' + id

    const response = await axios.get(endpoint)
    return response.data
  } catch (e) {
    console.log(e)
    return e
  }
}
const remove = async id => {
  try {
    const endpoint = '/prescriptions/' + id

    const response = await axios.delete(endpoint)
    return response.data
  } catch (e) {
    console.log(e)
    return e
  }
}
const getPrescriptionById = async id => {
  try {
    const endpoint = `/prescriptions/${id}`
    const response = await axios.get(endpoint)
    return response.data
  } catch (e) {
    console.log(e)
  }
}
export { getAll, create, update, getByID, remove, getPrescriptionById }
