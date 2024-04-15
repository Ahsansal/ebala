import enTranslations from 'public/locales/en.json'
import arTranslations from 'public/locales/ar.json'

export const getTranslations = language => {
  switch (language) {
    case 'en':
      return enTranslations
    case 'ar':
      return arTranslations
    // You can add more cases for additional languages as needed
    default:
      // Return a default language (e.g., English) if the specified language is not found
      return enTranslations
  }
}
