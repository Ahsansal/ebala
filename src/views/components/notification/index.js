// import React from 'react'
// import NotificationList from './notification'
// import Header from './header'
// import { Box, Grid } from '@mui/material'

// const data = [
//   {
//     subTitle1: 'Job Alert!',
//     subTitle2: 'You have 3 new job suggestions.',
//     text: 'Today',
//     icon: '/notificationIcons/alert.png'
//   },
//   {
//     subTitle1: 'Successfully Applied',
//     subTitle2: 'Congrats you applied this job. please wait for the company response.',
//     text: 'Yesterday',
//     icon: '/notificationIcons/box.png'
//   },
//   {
//     subTitle1: 'Job Alert!',
//     subTitle2: 'You have 3 new job suggestions.',
//     text: '2 days ago',
//     icon: '/notificationIcons/alert.png'
//   },
//   {
//     subTitle1: 'Successfully Applied',
//     subTitle2: 'Congrats you applied this job. please wait for the company response.',
//     text: '4 days ago',
//     icon: '/notificationIcons/box.png'
//   },
//   {
//     subTitle1: 'Job Alert!',
//     subTitle2: 'You have 3 new job suggestions.',
//     text: '5 days ago',
//     icon: '/notificationIcons/alert.png'
//   },
//   {
//     subTitle1: 'Successfully Applied',
//     subTitle2: 'Congrats you applied this job. please wait for the company response.',
//     text: '1 week ago',
//     icon: '/notificationIcons/box.png'
//   },
//   {
//     subTitle1: 'Job Alert!',
//     subTitle2: 'You have 3 new job suggestions.',
//     text: '1 month ago',
//     icon: '/notificationIcons/alert.png'
//   },
//   {
//     subTitle1: 'Successfully Applied',
//     subTitle2: 'Congrats you applied this job. please wait for the company response.',
//     text: '2 month ago',
//     icon: '/notificationIcons/box.png'
//   },
//   {
//     subTitle1: 'Job Alert!',
//     subTitle2: 'You have 3 new job suggestions.',
//     text: '3 month ago',
//     icon: '/notificationIcons/alert.png'
//   },
// ]
// const notification = () => {
//   return (
//     <Grid container >
//       <Grid item xs={3}>
//       </Grid>
//       <Grid item xs={6}>
//         <Header />
//         {data?.map((item, index) => {
//           return (
//             <Box item key={index} >
//               <NotificationList data={item} index={index} last={data.length} />
//             </Box>
//           )
//         })}
//       </Grid>
//       <Grid item xs={3}>
//       </Grid>
//     </Grid>
//   )
// }

// export default notification
