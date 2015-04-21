var normalize = require('./normalize')
var keywords = require('../config').tagKeywords

module.exports = getTags

function getTags (string) {
  var text = normalize(string)
  var tags = []
  for (var key in keywords) {
    var re = createRegExp(key)
    if (re.test(text)) tags.push(keywords[key])
  }
  return tags
}

function createRegExp (string) {
  if (string instanceof RegExp) return string
  return new RegExp('\\b' + string + '\\b', 'i')
}
