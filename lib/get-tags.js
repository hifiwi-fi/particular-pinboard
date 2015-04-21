const normalize = require('./normalize')
const keywords = require('../config').tagKeywords

module.exports = getTags

function getTags (string) {
  let text = normalize(string)
  let tags = []
  for (let key in keywords) {
    let re = createRegExp(key)
    if (re.test(text)) tags.push(keywords[key])
  }
  return tags
}

function createRegExp (string) {
  if (string instanceof RegExp) return string
  return new RegExp('\\b' + string + '\\b', 'i')
}
