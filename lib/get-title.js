const map = require('lodash.map')
const filter = require('lodash.filter')
const cleanString = require('./clean-string')
const elementText = require('./element-text')
const isSubtitle = require('./is-subtitle')
const tweaks = require('../config').titleTweaks

module.exports = getTitle

function getTitle () {
  let title = document.title
  let host = location.hostname
  let element

  if (host in tweaks) return findInTweaks(tweaks, host)
  element = document.querySelector('meta[property="og:title"]')
  if (element) return cleanString(element.content)
  element = document.querySelector('.hentry .entry-title')
  if (element) return elementText(element.textContent)
  //findInAnchorTag()
  //findInHeaderTags()
  return title
}

function findInTweaks (tweaks, host) {
  let element = document.querySelector(tweaks[host])
  if (element) return elementText(element)
}

function findInAnchorTag (title) {
  let url = location.href
  let elements = filter(document.querySelectorAll('a'), (element) => {
    if (element.href === url) {
      let anchorText = elementText(element)
      return isSubtitle(title, anchorText)
    }
  })
  if (elements.length) return elementText(elements[0])
}

function findInHeaderTags () {
  var headerTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
  var headerElements = map(headerTags, (tag) => document.querySelectorAll(headerTags[tag]))
  var elements = filter(headerElements, (element) => isSubtitle(elementText(element)))
  if (elements) return elementText(elements[0])
}
