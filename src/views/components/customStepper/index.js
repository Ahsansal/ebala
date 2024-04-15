import React from 'react'
const stepContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '5px 11px',
  borderRadius: '8px'
}

const stepStyle = {
  display: 'flex',
  textAlign: 'center',
  gap: '8px',
  width: '100%',
  marginRight: '10px'
}
const BG_COLOR = process.env.NEXT_PUBLIC_THEME_COLOR || '#115740'
const stepTextStyle = (isActive, isComplete) => {
  return {
    borderBottom: isActive || isComplete ? `2px solid ${'#115740'}` : '1px solid #666666',
    paddingBottom: '2px',
    width: '100%',
    fontSize: '13px',
    fontWeight: 600,
    color: isActive || isComplete ? BG_COLOR : '#666666'
  }
}

const CustomStepper = ({ steps, active, bgColor, doctorId, setActiveStep }) => {
  const handleOnClick = index => {
    if (doctorId) setActiveStep(index)
  }

  return (
    <div style={{ ...stepContainerStyle, backgroundColor: bgColor }}>
      {steps.map((step, index) => (
        <div
          key={index}
          style={stepStyle}
          onClick={() => handleOnClick(index)}
          className={doctorId && 'cursor-pointer'}
        >
          <div>
            <SvgImage isActive={index === active} isComplete={index < active} index={index + 1} />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
              width: '100%',
              flexDirection: 'column'
            }}
          >
            <p style={stepTextStyle(index === active, index < active)}>{step}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

const SvgImage = ({ isActive, index, isComplete }) => {
  if (isActive) {
    return (
      <svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <circle cx='20' cy='20' r='15' fill={BG_COLOR || '#115740'} stroke={BG_COLOR || '#115740'} />
        <circle cx='20' cy='20' r='19' stroke={BG_COLOR || '#115740'} />
        <text
          x='50%'
          y='50%'
          dominant-baseline='middle'
          text-anchor='middle'
          fill={'#fff'}
          font-size='14'
          font-family='Arial'
        >
          {index}
        </text>
      </svg>
    )
  } else if (isComplete) {
    return (
      <svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <circle cx='20' cy='20' r='15' fill={BG_COLOR || '#115740'} />
        <text
          x='50%'
          y='50%'
          dominant-baseline='middle'
          text-anchor='middle'
          fill={'#fff'}
          font-size='14'
          font-family='Arial'
        >
          {index}
        </text>
      </svg>
    )
  } else {
    return (
      <svg width='40' height='40' xmlns='http://www.w3.org/2000/svg'>
        <circle cx='20' cy='20' r='15' fill={'#999999'} />
        <text
          x='50%'
          y='50%'
          dominant-baseline='middle'
          text-anchor='middle'
          fill={'#fff'}
          font-size='14'
          font-family='Arial'
        >
          {index}
        </text>
      </svg>
    )
  }
}

export default CustomStepper
