export default {
  meEndpoint: '/auth/me',
  loginEndpoint: '/users/loginByEmail',
  // registerEndpoint: '/admins/create',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken', // logout | refreshToken
  admin: {
    meEndpoint: '/auth/me',
    loginEndpoint: '/admins/login',
    homeRoute: '/dashboard',
    registerEndpoint: '/admins/create/',
    storageTokenKeyName: 'accessToken',
    onTokenExpiration: 'refreshToken' // logout | refreshToken
  },
  agent: {
    meEndpoint: '/auth/me',
    loginEndpoint: '/users/loginByEmail',
    homeRoute: '/agent-dashboard',
    registerEndpoint: '/jwt/register',
    storageTokenKeyName: 'accessToken',
    onTokenExpiration: 'refreshToken' // logout | refreshToken
  },
  roles: [
    { role: 'admin', displayName: 'Admin' },
    {
      role: 'agent',
      displayName: 'Agent'
    }
  ]
}
