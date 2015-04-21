'use strict'

const utm = require('strip-utm')
const getTitle = require('./lib/get-title')
const getDescription = require('./lib/get-description')
const getMetaDescription = require('./lib/get-meta-description')
const getTags = require('./lib/get-tags')
const textLengthLimit = require('./config').textLengthLimit
const readLater = require('./config').readLater

let url = utm(location.href)
let title = getTitle()
let metaDescription = getMetaDescription()
let description = getDescription(metaDescription)
let tags = getTags(document.title + ' ' + description + ' ' + metaDescription)

let args, pin
let urlBase = 'http://pinboard.in/add?'
let opts = 'toolbar=no,width=610,height=350'

// TODO: rewrite; remove if title is trailing or leading
let ix = description.indexOf(title)

if (ix === 0) {
  description = description.substring(title.length).trim()
} else if (ix === description.length - title.length) {
  description = description.substring(0, ix).trim()
}

if (textLengthLimit > 0) {
  title = title.substring(0, textLengthLimit)
  description = description.substring(0, textLengthLimit)
}

args = [
  'url=', encodeURIComponent(url),
  '&title=', encodeURIComponent(title),
  '&description=', encodeURIComponent(description),
  '&tags=', encodeURIComponent(tags.join(' '))
]

if (readLater) {
  args = args.concat([
    '&later=', 'yes',
    '&jump=', 'close'
  ])
}

pin = open(urlBase + args.join(''), 'Pinboard', opts)

if (readLater) pin.blur()
