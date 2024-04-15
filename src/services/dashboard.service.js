import axios from './index'

const getDashboard = async () => {
  try {
    const endpoint = '/admins/dashboard'

    const response = await axios.post(endpoint)
    return response.data
  } catch (e) {
    console.log(e)
    return e
  }
}
export { getDashboard }
