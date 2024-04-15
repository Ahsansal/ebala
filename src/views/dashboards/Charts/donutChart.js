//** React Imports
import React, { useEffect, useState } from 'react'

//** MUI Imports
import { Box } from '@mui/system'
import Skeleton from '@mui/material/Skeleton'

import Donut from './donut'
//** internal service Imports
import { getDashboard } from 'src/services/dashboard.service'

const DonutChart = () => {
  const [showData, setShowData] = useState({
    complete: 0,
    inProcess: 0,
    cancelled: 0,
    updated: 0
  })
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const dashboardData = await getDashboard()
      setLoading(false)
      const { appointments } = dashboardData.result
      const { total, isCancel, isComplete, isProgress, isUpdate } = appointments
      setShowData({
        complete: isComplete,
        inProcess: isProgress,
        cancelled: isCancel,
        updated: isUpdate
      })

      // Calculation for donut chart percentages
      const totalTasks = total
      const completedPercentage = (isComplete / totalTasks) * 100
      const inProcessPercentage = (isProgress / totalTasks) * 100
      const cancelledPercentage = (isCancel / totalTasks) * 100
      const updatedPercentage = (isUpdate / totalTasks) * 100

      // Setting data for donut chart
      setDonutData({
        percentage1: parseFloat(completedPercentage.toFixed(2)),
        percentage2: parseFloat(inProcessPercentage.toFixed(2)),
        percentage3: parseFloat(cancelledPercentage.toFixed(2)),
        percentage4: parseFloat(updatedPercentage.toFixed(2)), // Added percentage for updated
        totalTasks: total
      })
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      {loading ? (
        <Skeleton className={'bg-[#669666]/10 rounded-lg'} variant='rectangular' width={320} height={382} />
      ) : (
        <Box
          xs={12}
          md={12}
          sx={{
            padding: '14px',
            backgroundColor: 'white',
            borderRadius: '16px',
            height: '382px',
            '@media screen and (max-width: 1435px)': {
              height: '100%'
            }
          }}
        >
          <div id='chart' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Donut loading={loading} apiResponse={showData} />
          </div>
          {loading ? (
            ''
          ) : (
            <div className=' donutBtn grid grid-cols-2 gap-[10px]  justify-center font-semibold text-[#FFFFFF] text-[10px] px-2 mt-1'>
              <div className='w-full uppercase bg-[#4F786A]  rounded-[5px] h-auto p-[5px] flex justify-between'>
                Completed <span>{showData.complete}</span>
              </div>
              <div className='w-full uppercase bg-[#123456]  p-[5px] rounded-[5px] h-auto flex justify-between'>
                In Process <span>{showData.inProcess}</span>
              </div>
              <div className='w-full uppercase bg-[#F04438]  p-[5px] rounded-[5px] h-auto flex justify-between'>
                Cancelled <span>{showData.cancelled}</span>
              </div>
              <div className='w-full uppercase bg-[#FEB030]  p-[5px] rounded-[5px] h-auto flex justify-between'>
                Updated <span>{showData.updated}</span>
              </div>
            </div>
          )}
        </Box>
      )}
    </>
  )
}

export default DonutChart
