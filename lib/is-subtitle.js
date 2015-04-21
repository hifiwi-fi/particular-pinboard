const normalize = require('./normalize')

module.exports = isSubtitle

function isSubtitle (title, string) {
  if (!title || !string) return false
  return normalize(title).indexOf(normalize(string)) !== -1
}
