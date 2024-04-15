import { useRouter } from 'next/router'
import ConductCard from './ConductCard'
import { Card, Typography } from '@mui/material'

const RecentConduct = ({ data, head, loading }) => {
  const Text_color = 'black'
  const Background_Color = process.env.NEXT_PUBLIC_THEME_COLOR || '#525252'
  const router = useRouter()
  return (
    <>
      <div style={{ backgroundColor: Background_Color, padding: '10px' }} className='flex justify-between items-center'>
        <div>
          <p style={{ color: 'white' }} className={`!p-0 !m-0 font-semibold text-[18px] leading-[27px] text-[#333333]`}>
            {head?.title || ''}
          </p>
        </div>
        <div>
          {head && (head.title === 'Recent Appointments' || head.title === 'Recent Prescriptions') && (
            <p
              style={{ color: 'white' }}
              className='!p-0 !m-0 font-semibold text-[16px] leading-[17px] text-[#115740] underline cursor-pointer'
              onClick={() => {
                if (head.title === 'Recent Appointments') {
                  router.push('/appointments')
                } else {
                  router.push('/prescriptions')
                }
              }}
            >
              {head?.view || ''}
            </p>
          )}
        </div>
      </div>
      <div className='pt-4'>
        {data.length ? (
          data.map((elements, index) => {
            return (
              <ConductCard textColor={Text_color} bgColor={'#DAEEE7'} data={elements} key={index} loading={loading} />
            )
          })
        ) : (
          <Card
            sx={{
              display: 'flex',
              backgroundColor: '#DAEEE7',
              px: '10px',
              py: '15px',
              alignItems: 'center',
              borderRadius: '8px',
              marginBottom: '5px',
              boxShadow: 'none',
              mx: '10px'
            }}
          >
            <Typography sx={{ fontSize: '14px', lineHeight: '20px' }}>No data found</Typography>
          </Card>
        )}
      </div>
    </>
  )
}

export default RecentConduct
