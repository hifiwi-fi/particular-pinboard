const map = require('lodash.map')
const filter = require('lodash.filter')
const cleanString = require('./clean-string')
const elementText = require('./element-text')
const isSubtitle = require('./is-subtitle')
const tweaks = require('../config').titleTweaks

module.exports = getTitle

function getTitle () {
  let title = document.title
  let host = window.location.hostname
  let headerTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
  let element
  let anchorTags
  let headerElements

  if (host in tweaks) return findInTweaks(tweaks, host)

  element = document.querySelector('meta[property="og:title"]')
  if (element) return cleanString(element.content)

  element = document.querySelector('.hentry .entry-title')
  if (element) return elementText(element.textContent)

  anchorTags = findAnchorTags(title)
  if (anchorTags.length) return elementText(anchorTags[0])

  headerElements = map(headerTags, (tag) => document.querySelectorAll(headerTags[tag]))
  if (headerElements.length) return elementText(headerElements[0])

  return title
}

function findInTweaks (tweaks, host) {
  let element = document.querySelector(tweaks[host])
  if (element) return elementText(element)
}

function findAnchorTags (match) {
  return filter(document.querySelectorAll('a'), (element) => {
    let url = window.location.href
    if (element.href === url) {
      let anchorText = elementText(element)
      return isSubtitle(match, anchorText)
    }
  })
}
