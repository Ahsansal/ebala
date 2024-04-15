//** MUI Imports
import { Rating, Box, Chip, Card, Badge, CardMedia, Typography, CardContent, Skeleton } from '@mui/material'
//Utils Imports
import { isEmptyObject } from 'src/utils'

const ConductCard = ({ textColor, bgColor, data, index, loading }) => {
  const checkObj = isEmptyObject(data)
  return (
    <>
      {!checkObj ? (
        <Card
          sx={{
            display: 'flex',
            backgroundColor: bgColor,
            px: '10px',
            py: '15px',
            alignItems: 'center',
            borderRadius: '8px',
            marginBottom: '5px',
            boxShadow: 'none',
            mx: '10px'
          }}
          key={index}
        >
          {loading ? (
            <Skeleton className='bg-[#669666]/10' variant='circular' width={10} height={10} />
          ) : (
            <Badge className='w-[8.85px] h-[8.85px] bg-[#F04438] rounded-[100%] mr-1' badgeContent=' ' />
          )}
          {loading ? (
            <Skeleton className='bg-[#669666]/10' variant='circular' width={40} height={40} />
          ) : (
            <CardMedia
              component='img'
              sx={{ width: 44, borderRadius: '100%', height: 44, mr: '10px' }}
              image={data?.image}
              alt='Live from space album cover'
            />
          )}
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <CardContent className='flex justify-between w-full !p-0 flex-col'>
              <div className='flex w-full justify-between !p-0 !m-0 items-center'>
                {loading ? (
                  <Skeleton variant='text' sx={{ fontSize: '1rem' }} className='bg-[#669666]/10 w-full' />
                ) : (
                  <Typography sx={{ fontSize: '14px', fontWeight: 600, lineHeight: '20px', color: textColor }}>
                    {data?.name}
                  </Typography>
                )}

                {/* <Typography
              sx={{ fontSize: '12px', fontWeight: 400, lineHeight: '20px', color: textColor, textAlign: 'right' }}
            >
              {data?.time}
            </Typography> */}
              </div>
              <div>
                <div>
                  {loading ? (
                    <Skeleton variant='text' sx={{ fontSize: '1rem' }} className='bg-[#669666]/10 w-full' />
                  ) : (
                    <Typography sx={{ fontSize: '12px', fontWeight: 400, lineHeight: '20px', color: textColor }}>
                      {data?.descrypt}
                    </Typography>
                  )}
                </div>
                <div>
                  {loading ? (
                    <Skeleton variant='text' sx={{ fontSize: '1rem' }} className='bg-[#669666]/10 w-full' />
                  ) : (
                    <>
                      {data?.userName && (
                        <Typography sx={{ fontSize: '12px', fontWeight: 400, lineHeight: '20px', color: textColor }}>
                          {data?.userName}
                        </Typography>
                      )}
                    </>
                  )}
                </div>

                {data?.rating && <Rating name='read-only' value={data?.rating} readOnly />}
                {data?.review && (
                  <Typography sx={{ fontSize: '12px', fontWeight: 400, lineHeight: '20px', color: textColor }}>
                    {data?.review}
                  </Typography>
                )}
                <div className='flex gap-2 items-start xl:items-start 2xl:items-center  flex-col md:flex-col lg:flex-col xl:flex-col 2xl:flex-row '>
                  {loading ? (
                    <Skeleton variant='text' sx={{ fontSize: '1rem' }} className='bg-[#669666]/10 w-full' />
                  ) : (
                    <Chip
                      label={data?.status}
                      className={`!text-[#666666] ${
                        data.status === 'InActive' || data.status === 'Canceled'
                          ? '!bg-[#FECDCA]'
                          : data.status === 'Active' || data.status === 'Completed'
                          ? '!bg-[#D1FADF]'
                          : '!bg-[#F0F8FF]'
                      } text-[12px] font-normal leading-5 !h-[20px]`}
                    />
                  )}
                  {loading ? (
                    <Skeleton variant='text' sx={{ fontSize: '1rem' }} className='bg-[#669666]/10 w-full' />
                  ) : (
                    <Typography
                      sx={{ fontSize: '12px', fontWeight: 400, lineHeight: '20px', color: textColor }}
                      className='!ml-1 2xl:!ml-0'
                    >
                      {data?.date}
                    </Typography>
                  )}
                </div>
              </div>
            </CardContent>
          </Box>
        </Card>
      ) : (
        <Card
          sx={{
            display: 'flex',
            backgroundColor: bgColor,
            px: '10px',
            py: '15px',
            alignItems: 'center',
            borderRadius: '8px',
            marginBottom: '5px',
            boxShadow: 'none',
            mx: '10px'
          }}
          key={index}
        >
          <Typography sx={{ fontSize: '14px', lineHeight: '20px' }}>No data found</Typography>
        </Card>
      )}
    </>
  )
}

export default ConductCard
