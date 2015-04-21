var cleanString = require('./clean-string')

module.exports = elementText

function elementText (element) {
  if (!element) return ''
  return cleanString(element.textContent)
}
