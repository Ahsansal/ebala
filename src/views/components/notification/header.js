//** React Imports
import React from 'react';
//** MUI Imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Header() {
  return (
    <div>
      <Typography sx={{ fontSize: '22px', fontWeight: '700', color: '#333342', mb: '30px' }}>
        Notifications
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          maxWidth: 816,
          px: '18px',
          py: '12px',
          mb: '8px',
          background: '#CDDAD8',
          borderRadius: '8px',
          height: '64px',
        }}
      >
        <img
          src='/notificationIcons/bell.png'
          alt='Notification Bell'
          style={{ marginRight: '9px', height: '100%' }}
        />
        <div className='flex justify-between w-[100%] '>
          <div>
            <Typography sx={{ fontSize: '13px', fontWeight: '700', color: '#333333' }}>
              Turn on push notification
            </Typography>
            <Typography sx={{ fontSize: '13px', fontWeight: '400', color: '#999999' }}>
              Allow to know the recent update.
            </Typography>
          </div>
          <div className='flex gap-[16px]'>
            <Typography sx={{
              display: 'flex', alignItems: 'center', fontSize: '13px', fontWeight: '500', color: '#2A2A2A',
              border: '1px solid #2A2A2A40', borderRadius: '100px', px: '18px', py: '6px', height: '36px'
            }}>
              Allow push notifications
            </Typography>
            <Typography
              sx={{
                fontSize: '12px',
                fontWeight: '500',
                color: '#2A2A2A',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              Dismiss
            </Typography>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default Header;
