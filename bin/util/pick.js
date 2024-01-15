export const isObject = (obj) => {
  return obj && typeof obj === 'object' && !Array.isArray(obj)
}

export const pick = (obj, key) => {
  if (!isObject(obj)) {
    throw new TypeError('Value is not a Object')
  }
  const keys = Object.keys(obj)
  for (let tkey in keys) {
    if (tkey === key) {
      return obj[key]
    }
  }
}