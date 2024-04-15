import adminRoutes from './admin.routes'

const getRoutes = (role = '') => {
  switch (role.toLowerCase()) {
    case 'admin':
      return adminRoutes
    default:
      return []
  }
}

export default getRoutes
