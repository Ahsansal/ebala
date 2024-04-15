// // components/DonutChart.js
import React, { useEffect, useState } from 'react'
import Skeleton from '@mui/material/Skeleton'
import dynamic from 'next/dynamic'
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

const DonutChart = ({ apiResponse, loading }) => {
  const [data, setData] = useState([])

  useEffect(() => {
    if (apiResponse) {
      const colors = ['#4F786A', '#123456', '#F04438', '#FEB019']
      const transformedData = Object.keys(apiResponse).map((key, index) => ({
        label: key,
        value: apiResponse[key],
        color: colors[index % colors.length]
      }))
      setData(transformedData)
    }
  }, [apiResponse])

  const options = {
    chart: {
      type: 'donut',
      width: '100%',
      height: 600
    },
    labels: data.map(item => item.label),
    colors: data.map(item => item.color),
    legend: {
      show: false
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          }
        }
      },
      {
        breakpoint: 1024,
        options: {
          chart: {
            width: 200
          }
        }
      }
    ],
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          labels: {
            show: true,
            value: {
              fontSize: '15px',
              fontWeight: 800
            },
            total: {
              show: true,
              showAlways: true,
              fontSize: '15px',
              label: 'Appointments',
              fontWeight: 800,
              formatter: function (w) {
                return w.globals.series.reduce((acc, curr) => acc + curr, 0)
              }
            }
          }
        }
      }
    }
  }

  return (
    <div>
      <div className='pt-[10px] pl-[0px]'>
        <ReactApexChart options={options} series={data.map(item => item.value)} type='donut' height={300} />
      </div>

      <div className='text-center mt-2 text-xl'></div>
    </div>
  )
}

export default DonutChart
