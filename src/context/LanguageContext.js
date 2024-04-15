import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en') // Default language is English

  const changeLanguage = newLanguage => {
    setLanguage(newLanguage)
    localStorage.setItem('lang', newLanguage)
  }

  useEffect(() => {
    const storedLanguage = localStorage.getItem('lang')
    if (storedLanguage) {
      setLanguage(storedLanguage)
    }
  }, [])

  return <LanguageContext.Provider value={{ language, changeLanguage }}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => {
  return useContext(LanguageContext)
}
