const Info = ({ selectedData }) => {
  const detailData = [
    {
      Title: 'Staff ID',
      // info: selectedData?.id
    },
    {
      Title: 'Date of Joining',
      info: '2023-10-09'
    },
    {
      Title: 'Qualification',
      // info: selectedData?.qualification
    },
    {
      Title: 'School Name',
      // info: selectedData?.schoolData[0]?.school?.name
    },
    {
      Title: 'Campus Name',
      // info: selectedData?.schoolData[0]?.campus?.name
    },
    {
      Title: 'Educational Stages',
      // info: selectedData?.schoolData[0]?.stages?.map(obj => obj.name)?.join(' / ')
    },
    {
      Title: 'Nationality',
      // info: selectedData?.nationality
    },
    {
      Title: 'Gender',
      // info: selectedData?.gender
    },
    {
      Title: 'Date of Birth',
      // info: selectedData?.dob
    },
    {
      Title: 'Religion',
      // info: selectedData?.religion
    },
    {
      Title: 'City',
      // info: selectedData?.city
    },
    {
      Title: 'Address',
      // info: selectedData?.address
    },
    {
      Title: 'Blood Group',
      // info: selectedData?.bloodGroup
    }
  ]
  return (
    <div className='py-[19px] px-[23px]'>
      <div className='flex items-center gap-[20px] flex-wrap'>
        {detailData.map((elements, index) => (
          <div key={index} className='flex flex-col gap-1 justify-center w-[200px]'>
            <p className='p-0 m-0 text-[14px] font-medium text-[#666666]'>{elements.Title}</p>
            <p className='p-0 m-0 text-[16px] font-medium text-[#242424]'>{elements.info}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Info
