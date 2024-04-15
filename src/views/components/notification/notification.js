//** React Imports
import * as React from 'react';
//** MUI Imports
import { Box, Typography } from '@mui/material';

const notificationList = ({ data, index, last }) => {
  return (
    <Box sx={{
      display: 'flex', width: '100%', maxWidth: 816, bgcolor: 'background.paper', px: '16px', py: '24px', borderBottom: '1px solid #D5DCD7', height: '88px',
      borderBottom: index !== last - 1 ? '1px solid #D5DCD7' : 'none',
      borderTopLeftRadius: index === 0 ? '8px' : '0px',
      borderTopRightRadius: index === 0 ? '8px' : '0px',
      borderBottomLeftRadius: index === last - 1 ? '8px' : '0px',
      borderBottomRightRadius: index === last - 1 ? '8px' : '0px',
    }}>
      <img
        src={data?.icon}
        alt='Icon'
        style={{ marginRight: '9px', height: '100%' }}
      />

      <div className='flex justify-between w-[100%]'>
        <div>
          <Typography sx={{ fontSize: '16px', fontWeight: '500', color: '#333333', borderRadius: '8px' }}>{data?.subTitle1}</Typography>
          <Typography sx={{ fontSize: '12px', fontWeight: '400', color: '#999999' }}>{data?.subTitle2}</Typography>
        </div>
        <div className='flex align-middle'>
          <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#666666', display: 'flex', alignItems: 'center' }}>
            {data?.text}
          </Typography>
        </div>
      </div>
    </Box>
  );
}
export default notificationList
