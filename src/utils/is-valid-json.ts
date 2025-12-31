const isValidJSON = (str: unknown): boolean => {
  if (typeof str !== 'string') {
    return false
  } else if (str.trim() === '') {
    return true
  }

  try {
    JSON.parse(str)
    return true
  } catch {
    return false
  }
}

export default isValidJSON