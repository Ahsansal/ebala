export function objectToFormData(obj) {
  const formData = new FormData()

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key]
      if (typeof value === 'object' && value !== null) {
        formData.append(key, JSON.stringify(value))
      } else {
        formData.append(key, value)
      }
    }
  }

  return formData
}

export function isEmptyObject(obj) {
  return Object.keys(obj).length === 0
}
