const Info = ({ selectedRowIndex }) => {
  const detailData = [
    {
      Title: 'Patient ID',
      info: selectedRowIndex?.id
    },
    {
      Title: 'Name',
      info: selectedRowIndex?.name
    },
    {
      Title: 'Gender',
      info: selectedRowIndex?.gender
    },
    {
      Title: 'Status',
      info: selectedRowIndex?.status === '0' ? 'Blocked' : 'Active'
    },
    {
      Title: 'Email',
      info: selectedRowIndex?.email
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
