//** React Imports
import React, { useEffect, useState } from 'react'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
//** MUI Imports
import { getDashboard } from 'src/services/dashboard.service'
import { Box, Typography, Menu, Badge, Card, CardContent, MenuItem, Skeleton } from '@mui/material'

const ChartText = [{ title: 'Cancelled' }, { title: 'Completed' }, { title: 'Updated' }, { title: 'InProcess' }]

const options = {
  chart: {
    toolbar: {
      show: true,
      offsetX: 0,
      offsetY: 0,
      tools: {
        download: false,
        selection: false,
        zoom: false,
        zoomin: false,
        zoomout: false,
        pan: false,
        reset: false | '<img src="/static/icons/reset.png" width="20">',
        customIcons: []
      },
      export: {
        csv: {
          filename: undefined,
          columnDelimiter: ',',
          headerCategory: 'category',
          headerValue: 'value',
          dateFormatter(timestamp) {
            return new Date(timestamp).toDateString()
          }
        },
        svg: {
          filename: undefined
        },
        png: {
          filename: undefined
        }
      },
      autoSelected: 'zoom'
    }
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  },
  yaxis: {
    min: 0,
    max: 15,
    tickAmount: 3
  },

  colors: ['#12B76A', '#FDB022', '#A97CF2', '#F04438'],
  stroke: {
    show: true,
    curve: 'smooth',
    lineCap: 'butt',
    width: 3,
    dashArray: 0
  },
  legend: {
    show: false,
    showForSingleSeries: false,
    showForNullSeries: true,
    showForZeroSeries: true,
    position: 'top',
    horizontalAlign: 'right',
    floating: false,
    fontSize: '12px',
    color: '#666666',
    fontWeight: 400,
    formatter: undefined,
    inverseOrder: false,
    width: undefined,
    height: undefined,
    tooltipHoverFormatter: undefined,
    customLegendItems: ['Rejected', 'Accepted', 'Pendng'],
    offsetX: 0,
    offsetY: 0,
    labels: {
      colors: undefined,
      useSeriesColors: false
    },
    markers: {
      width: 12,
      height: 12,
      strokeWidth: 0,
      strokeColor: '#fff',
      fillColors: undefined,
      radius: 12,
      customHTML: undefined,
      onClick: undefined,
      offsetX: 0,
      offsetY: 0
    },
    itemMargin: {
      horizontal: 5,
      vertical: 0
    },
    onItemClick: {
      toggleDataSeries: true
    },
    onItemHover: {
      highlightDataSeries: true
    }
  }
}

const getRandomColor = index => {
  const colors = ['#F04438', '#12B76A', '#FDB022', '#A97CF2']
  return colors[index % colors.length]
}

const LineChart = () => {
  const [chartSeries, setChartSeries] = useState([])
  const [anchorEl, setAnchorEl] = useState(null)
  const [loading, setLoading] = useState(false)
  const [selectedOption, setSelectedOption] = useState('All')
  const [appointments, setAppointments] = useState({
    isCancel: 0,
    isComplete: 0,
    isUpdate: 0,
    isProgress: 0
  })

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = option => {
    setAnchorEl(null)
    setSelectedOption(option)
    handleDropDown(option)
  }
  const handleDropDown = option => {
    const seriesData = [
      { name: 'Cancelled', data: [0, appointments.isCancel, 0, 0, 0, 0], color: '#F04438' },
      { name: 'Completed', data: [0, 0, appointments.isComplete, 0, 0, 0], color: '#12B76A' },
      { name: 'Updated', data: [0, 0, 0, appointments.isUpdate, 0, 0], color: '#FDB022' },
      { name: 'InProcess', data: [0, 0, 0, 0, appointments.isProgress, 0], color: '#A97CF2' }
    ]
    if (option !== 'All') {
      let filteredSeriesData = seriesData.filter(series => series.name === option)
      setChartSeries(filteredSeriesData)
    } else {
      setChartSeries(seriesData)
    }
  }

  useEffect(() => {
    handleDropDown(selectedOption)
    // eslint-disable-next-line
  }, [selectedOption])

  const getDashboardData = async () => {
    setLoading(true)
    const resp = await getDashboard()
    if (resp.success) {
      setAppointments(resp.result.appointments)
      setChartSeries([
        { name: 'Cancelled', data: [0, resp.result.appointments.isCancel, 0, 0, 0, 0], color: '#F04438' },
        { name: 'Completed', data: [0, 0, resp.result.appointments.isComplete, 0, 0, 0], color: '#12B76A' },
        { name: 'Updated', data: [0, 0, 0, resp.result.appointments.isUpdate, 0, 0], color: '#FDB022' },
        { name: 'InProcess', data: [0, 0, 0, 0, resp.result.appointments.isProgress, 0], color: '#A97CF2' }
      ])
      setLoading(false)
    } else {
      setAppointments([])
      setLoading(false)
    }
  }

  useEffect(() => {
    getDashboardData()
  }, [])

  return (
    <>
      {loading ? (
        <Skeleton className={'bg-[#669666]/10 rounded-lg'} variant='rectangular' width={800} height={382} />
      ) : (
        <Card
          sx={{
            height: '382px',
            boxShadow: 'none',
            '@media screen and (max-width: 1435px)': {
              height: '100%'
            }
          }}
        >
          <CardContent className='!pt-[27px] !pb-[34px] !px-[24px] flex justify-center items-center relative flex-col '>
            <div className='flex-wrap sm:flex-wrap md:flex-wrap lg:flex-wrap xl:flex-nowrap flex justify-between w-full border-b-2 border-[#E5E5EF] pb-[18px] gap-[12px]'>
              <div className='flex gap-[7px] items-center justify-center'>
                <p className='!text-[14px] font-medium leading-[21px] text-[#242424] !p-0 !m-0 !mt-[3px]'>Filter</p>
                <div>
                  <Box
                    id='option-button'
                    onClick={handleClick}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      backgroundColor: '#F2F4F7',
                      borderRadius: '5px',
                      width: '129px',
                      '@media screen and (max-width: 1536px)': {
                        width: '100px'
                      },
                      py: '7px',
                      px: '14px',
                      '&:hover': {
                        backgroundColor: 'none'
                      },
                      cursor: 'pointer'
                    }}
                  >
                    <Typography
                      sx={{
                        color: '#666666',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: 500,
                        lineHeight: '21px',
                        width: '100%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {selectedOption}
                    </Typography>
                    <img src={'/icons/v_angle-down.png'} alt='angle down' />
                  </Box>
                  <Menu id='option-menu' anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => handleClose(null)}>
                    <MenuItem key='all' onClick={() => handleClose('All')}>
                      All
                    </MenuItem>
                    {ChartText.map((option, index) => (
                      <MenuItem key={index} onClick={() => handleClose(option.title)}>
                        {option.title}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              </div>
              <div className='flex items-center  flex-wrap gap-2'>
                {ChartText.map((elem, index) => {
                  const avatarColor = getRandomColor(index)
                  return (
                    <div key={index} className='flex gap-2 justify-start items-center'>
                      <Badge
                        className='w-[8px] h-[8px]  rounded-[100%]'
                        badgeContent=' '
                        style={{ backgroundColor: avatarColor }}
                      />
                      <p
                        style={{ color: '#333333' }}
                        className='!p-0 !m-0 text-[14px] font-normal leading-[16px] text-[#666666]'
                      >
                        {elem.title}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
            <div style={{ width: '100%', minHeight: '280px', maxHeight: '100vh' }}>
              <ReactApexcharts
                options={options}
                series={chartSeries}
                type='line'
                width='100%'
                height='100%'
                className='!mt-[10px]'
              />
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}

export default LineChart
