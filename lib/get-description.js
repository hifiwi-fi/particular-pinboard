const elementText = require('./element-text')
const quote = require('../config').quoteSelection
const tweaks = require('../config').descriptionTweaks

module.exports = getDescription

function getDescription (metaDescription) {
  let host = window.location.hostname
  let text

  if (quote) {
    let string = String(document.getSelection())
    if (string) {
      text = string
        .trim()
        .split('\n')
        .map((line) => '<blockquote>' + line + '</blockquote>')
        .join('\n')
    }
  }

  if (host in tweaks) {
    let element = document.querySelector(tweaks[host])
    // NOTE: does this work?
    if (text && element) return elementText(element) + '\n\n' + text
    if (element) return elementText(element)
  }

  if (!text) text = metaDescription
  return text
}
