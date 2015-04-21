module.exports = cleanString

function cleanString (string) {
  if (typeof string !== 'string') return ''
  return string.trim().replace(/\s+/g, ' ')
}
