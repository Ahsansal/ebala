import OptionsMenu from 'src/@core/components/option-menu'
import { useLanguage } from 'src/context/LanguageContext'
import { Box } from '@mui/system'

const LanguageDropdown = ({ settings, saveSettings }) => {
  const { language, changeLanguage } = useLanguage()
  const { layout } = settings

  const handleLangItemClick = lang => {
    changeLanguage(lang)
  }

  const marginStyle = {
    marginRight: language === 'ar' ? '5px' : '0',
    marginLeft: language === 'ar' ? '0' : '5px',
    fontSize: '16px'
  }

  return (
    <OptionsMenu
      icon={
        <>
          <img src={`/icons/${language}.png`} alt={language} width={'20px'} />
          <Box style={marginStyle} className='uppercase'>
            {language}
          </Box>
        </>
      }
      menuProps={{ sx: { '& .MuiMenu-paper': { mt: 4, minWidth: 90 } } }}
      iconButtonProps={{
        color: 'inherit',
        sx: { ...(layout === 'vertical' ? { mr: 0.75 } : { mx: 0.75 }) }
      }}
      options={[
        {
          text: (
            <>
              <img src={`/icons/en.png`} alt={'en'} width={'20px'} />
              <span style={{ textTransform: 'capitalize', ...marginStyle }}>{'en'}</span>
            </>
          ),
          menuItemProps: {
            sx: { py: 2 },
            selected: language === 'en',
            onClick: () => {
              handleLangItemClick('en')
              saveSettings({ ...settings, direction: 'ltr' })
            }
          }
        },
        {
          text: (
            <>
              <img src={`/icons/ar.png`} alt={'Ar'} width={'20px'} />
              <span style={{ textTransform: 'capitalize', ...marginStyle }}>{'AR'}</span>
            </>
          ),
          menuItemProps: {
            sx: { py: 2 },
            selected: language === 'ar',
            onClick: () => {
              handleLangItemClick('ar')
              saveSettings({ ...settings, direction: 'rtl' })
            }
          }
        }
      ]}
    />
  )
}

export default LanguageDropdown
