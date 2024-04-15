//** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
//** Internal Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

const Columns = ({Background_Color}) => {
  const renderClient = row => {
    if (row?.url) {
      return <CustomAvatar src={row.url} sx={{ mr: 3, width: 34, height: 34 }} />
    } else {
      return (
        <CustomAvatar
          skin='light'
          color={row.avatarColor || 'primary'}
          sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem' }}
        >
        </CustomAvatar>
      )
    }
  }
  const column = [
    {
      flex: 0.05,
      minWidth: 100,
      field: 'id',
      headerName: 'ID',
      align: 'center',
      headerAlign: 'center',
      renderCell: ({ row }) => {
        const { id } = row
        return (
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', height: 'fit-content' }}>
            <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#333333' }}>{id}</Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.05,
      minWidth: 100,
      field: 'url',
      headerName: 'Profile',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', height: 'fit-content' }}>
            {renderClient(row)}
          </Box>
        )
      }
    },
    {
      flex: 0.05,
      minWidth: 100,
      field: 'name',
      headerName: 'Name',
      align: 'center',
      headerAlign: 'center',
      renderCell: ({ row }) => {
        const { name } = row
        return (
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', height: 'fit-content' }}>
            <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#333333' }}>{name}</Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.05,
      minWidth: 100,
      field: 'grade',
      headerName: 'Grade ',
      align: 'center',
      headerAlign: 'center',
      renderCell: ({ row }) => {
        const { grade } = row
        return (
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', height: 'fit-content' }}>
            <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#333333' }}>{grade}</Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.05,
      minWidth: 100,
      field: 'checkoutby',
      headerName: 'Check out by ',
      align: 'center',
      headerAlign: 'center',
      renderCell: ({ row }) => {
        const { checkoutby } = row
        return (
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', height: 'fit-content' }}>
            <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#333333' }}>{checkoutby}</Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.05,
      minWidth: 100,
      field: 'category',
      headerName: 'Category',
      align: 'center',
      headerAlign: 'center',
      renderCell: ({ row }) => {
        const { category } = row
        return (
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', height: 'fit-content' }}>
            <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#333333' }}>{category}</Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.05,
      minWidth: 100,
      field: 'time',
      headerName: 'Timer',
      align: 'center',
      headerAlign: 'center',
      renderCell: ({ row }) => {
        const { time } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }} >
            <Typography
              sx={{
                padding: '10px',
                backgroundColor: Background_Color,
                height: 'auto',
                width: 'auto',
                borderRadius: '6px',
                fontSize: '14px',
                color: '#ffff',
                fontWeight: '500'
              }}
            >
              {time}
            </Typography>
          </Box>
        )
      }
    }
  ]

  return column
}

export default Columns
