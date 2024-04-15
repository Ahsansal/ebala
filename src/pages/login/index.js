// ** React Imports
import { useState } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Alert from '@mui/material/Alert'
import { Button, Grid } from '@mui/material'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import { FadeLoader } from 'react-spinners'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { toast } from 'react-hot-toast'
// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import useBgColor from 'src/@core/hooks/useBgColor'
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import RoleSelect from 'src/views/pages/auth/RoleSelect'

// ** Styled Components
const LoginIllustrationWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(20),
  paddingRight: '0 !important',
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(10)
  }
}))

const LoginIllustration = styled('img')(({ theme }) => ({
  maxWidth: '48rem',
  [theme.breakpoints.down('xl')]: {
    maxWidth: '38rem'
  },
  [theme.breakpoints.down('lg')]: {
    maxWidth: '30rem'
  }
}))

const RightWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 400
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 450
  }
}))

const BoxWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.down('md')]: {
    maxWidth: 400
  }
}))

const TypographyStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: '0.18px',
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down('md')]: { marginTop: theme.spacing(8) }
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required()
})

const defaultValues = {
  password: 'secret',
  email: 'abubakar@eblal.com'
}

const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState('admin')
  const [loading, setLoading] = useState(false)

  // ** Hooks
  const auth = useAuth()
  const theme = useTheme()
  const bgColors = useBgColor()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** Vars
  const { skin } = settings

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = data => {
    // if (role) {
    const { email, password } = data
    setLoading(true)
    auth.login({ email, password, role: role }, ({ success, message }) => {
      if (success) {
        setLoading(false)
        toast.success('Logged In')
      } else if (!success) {
        setLoading(false)
        toast.error(message)
        setError('email', {
          type: 'manual',
          message: 'Email or Password is invalid'
        })
      }
    })
    // } else {
    //   setLoading(false)
    //   toast.error('Please Select the Role!')
    // }
  }

  const imageSource = skin === 'bordered' ? 'auth-v2-login-illustration-bordered' : 'auth-v2-login-illustration'

  return (
    <Box className='content-right'>
      <Grid
        sx={{
          background: theme => theme.palette.background.paper,
          borderRadius: '16px',
          mx: { md: 30 },
          my: 'auto',
          height: '80vh'
        }}
        container
      >
        {!hidden && (
          <Grid item sm={12} md={6}>
            <img
              src='/images/login-bg.png'
              style={{
                height: '80vh',
                width: '100%',
                objectFit: 'fill'
              }}
            />
          </Grid>
        )}

        <Grid
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            px: { sm: 0, md: 20 },
            position: 'relative'
          }}
          item
          sm={12}
          md={6}
        >
          {loading && (
            <div
              style={{
                width: '96%',
                height: '90%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                zIndex: 10
              }}
            >
              <FadeLoader color='#36d7b7' />
            </div>
          )}
          <Box
            sx={{
              px: 10,
              filter: loading ? 'blur(5px)' : 'none'
            }}
          >
            <Box sx={{ mb: 6 }}>
              <TypographyStyled variant='h5'>{`Welcome to ${themeConfig.templateName}! 👋🏻`}</TypographyStyled>
              <Typography variant='body2'>{'Please sign-in to your account and start the adventure'}</Typography>
            </Box>

            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              {/* <RoleSelect role={role} setRole={setRole} /> */}
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='email'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      autoFocus
                      label='Email'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.email)}
                      placeholder='example@gmail.com'
                    />
                  )}
                />
                {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
                  {'Password'}
                </InputLabel>
                <Controller
                  name='password'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <OutlinedInput
                      value={value}
                      onBlur={onBlur}
                      label='Password'
                      onChange={onChange}
                      id='auth-login-v2-password'
                      error={Boolean(errors.password)}
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onMouseDown={e => e.preventDefault()}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} fontSize={20} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errors.password && (
                  <FormHelperText sx={{ color: 'error.main' }} id=''>
                    {errors.password.message}
                  </FormHelperText>
                )}
              </FormControl>
              <Box
                sx={{
                  mb: 4,
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between'
                }}
              >
                <FormControlLabel
                  label='Remember Me'
                  control={<Checkbox checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />}
                />
                <Typography
                  variant='body2'
                  component={Link}
                  href='/forgot-password'
                  sx={{ color: 'primary.main', textDecoration: 'none' }}
                >
                  {'Forgot Password?'}
                </Typography>
              </Box>
              <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 }}>
                {'Login'}
              </Button>
              <Link href={'/register'}>
                <Button fullWidth size='large' variant='contained' sx={{ mb: 7 }}>
                  {'sign up'}
                </Button>
              </Link>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>
LoginPage.guestGuard = true

export default LoginPage
