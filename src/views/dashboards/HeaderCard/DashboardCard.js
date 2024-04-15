//** MUI Imports
import { Box, Card, Typography, Skeleton } from '@mui/material'

const DashboardCard = ({ item, index, loading }) => {
  const getRandomColorText = index => {
    const colors = ['#F04438', '#12B76A', '#FBBE4D', '#2AE8BB', '#B794F3']
    return colors[index % colors.length]
  }

  const Background_Color = process.env.NEXT_PUBLIC_THEME_COLOR || '#525252'
  const Text_color = process.env.NEXT_PUBLIC_TEXT_COLOR || '#FFFFFF'

  return (
    <>
      <Card
        sx={{
          backgroundColor: Background_Color,
          height: 'auto',
          borderRadius: '10px',
          padding: '24px',
          maxHeight: '161px',
          boxShadow: 'none',
          width: '100%'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className='gap-[8px]'>
            <Typography sx={{ fontWeight: '600', color: Text_color, fontSize: '16px' }}>{item?.name}</Typography>
          </div>
          <div>
            {/* <span>
              <img src='/icons/i icon.png' style={{ height: '20px', width: '20px' }} />
            </span> */}
          </div>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingTop: '5px' }}>
          {loading ? (
            <Skeleton className='bg-[#e4e3e3]' variant='circular' width={40} height={40} />
          ) : (
            <Typography
              sx={{
                fontSize: '20px',
                color: Text_color,
                fontWeight: '600',
                borderRadius: '100px',
                backgroundColor: getRandomColorText(index),
                px: '8px',
                py: '5px',
                width: '42px'
              }}
            >
              {item?.count}
            </Typography>
          )}
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: '700',
              paddingTop: '5px',
              color: Text_color
            }}
          >
            {item?.num1}
          </Typography>
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: '600',
              paddingTop: '5px',
              color: Text_color
            }}
          >
            {item?.num2}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: '12px', md: '12px', lg: '10px', xl: '12px' },
              fontWeight: '400',
              color: Text_color,
              ...(item.name === 'Total Paitents' ? { paddingTop: '20px' } : {})
            }}
          >
            {item.name === 'Total Paitents' ? item?.all : item?.serve}
          </Typography>
          <Typography
            sx={{ color: Text_color, fontSize: { xs: '12px', md: '12px', lg: '10px', xl: '12px' }, fontWeight: '400' }}
          >
            {item?.total}
          </Typography>
        </Box>
      </Card>
    </>
  )
}

export default DashboardCard
