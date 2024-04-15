import axios from './index'

const getAllDoctors = async () => {
  try {
    const endpoint = '/doctors/'

    const response = await axios.get(endpoint)
    return response.data
  } catch (e) {
    console.log(e)
  }
}
const getAllUsers = async () => {
  try {
    const endpoint = '/users/'

    const response = await axios.get(endpoint)
    return response.data
  } catch (e) {
    console.log(e)
  }
}

const getAll = async () => {
  try {
    const endpoint = '/appointments/'

    const response = await axios.get(endpoint)
    return response.data
  } catch (e) {
    console.log(e)
  }
}

const create = async data => {
  try {
    const endpoint = '/appointments/create'

    const response = await axios.put(endpoint, data)
    return response.data
  } catch (e) {
    return e
  }
}
const update = async data => {
  try {
    const endpoint = '/appointments/update'

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
    const endpoint = '/appointments/' + id

    const response = await axios.get(endpoint)
    return response.data
  } catch (e) {
    console.log(e)
    return e
  }
}
const remove = async id => {
  try {
    const endpoint = '/appointments/' + id

    const response = await axios.delete(endpoint)
    return response.data
  } catch (e) {
    console.log(e)
    return e
  }
}
export { getAllDoctors, getAllUsers, getAll, create, update, getByID, remove }
