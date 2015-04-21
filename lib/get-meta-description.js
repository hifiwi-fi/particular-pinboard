'use strict'

const cleanString = require('./clean-string')

let descriptionTag = 'meta[name="description"]'
let metaDescriptionTag = 'meta[property="og:description"]'

module.exports = getMetaDescription

function getMetaDescription () {
  // NOTE: this seems odd but I can't come up with a better way to do it
  let element
  element = document.querySelector(descriptionTag)
  if (element) return cleanString(element.content)
  element = document.querySelector(metaDescriptionTag)
  if (element) return cleanString(element.content)
  return ''
}
