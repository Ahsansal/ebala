import axios from './index'

// Admin data api endpoints following

const getAll = async () => {
  try {
    const endpoint = '/users/'

    const response = await axios.get(endpoint)
    return response.data
  } catch (e) {
    console.log(e)
  }
}

const createUser = async data => {
  try {
    const endpoint = '/users/simpleCreate'

    const response = await axios.put(endpoint, data)
    return response.data

  } catch (e) {
    return e
  }
}
const update = async (data) => {
  try {
    const endpoint = '/users/update'

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
    const endpoint = '/users/' + id

    const response = await axios.get(endpoint)
    return response.data
  } catch (e) {
    console.log(e)
    return e
  }
}
const remove = async id => {
  try {
    const endpoint = '/users/' + id

    const response = await axios.delete(endpoint)
    return response.data
  } catch (e) {
    console.log(e)
    return e
  }
}
const getAllSer = async () => {
  try {
    const endpoint = '/services'

    const response = await axios.get(endpoint)
    return response.data
  } catch (e) {
    console.log(e)
  }
}
export { getAll, update, getByID, remove, getAllSer,createUser }
