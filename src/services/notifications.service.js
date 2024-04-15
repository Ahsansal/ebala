import axios from './index'

const getAll = async () => {
  try {
    const endpoint = '/notifications'

    const response = await axios.get(endpoint)
    return response.data
  } catch (e) {
    console.log(e)
  }
}
const create = async data => {
  try {
    const endpoint = '/notifications/create'

    const response = await axios.put(endpoint, data)
    return response.data
  } catch (e) {
    return e
  }
}
const remove = async id => {
  try {
    const endpoint = '/notifications/' + id

    const response = await axios.delete(endpoint)
    return response.data
  } catch (e) {
    console.log(e)
    return e
  }
}
export { getAll, create, remove }
