// List of settings to use
let files = []
try {
  // Load default settings
  files.push(require('./../../settings/default.json'))

  // Load more settings if you need
  // files.push(require('./../../settings/' + process.env.project + '.json'))
} catch (e) {
  console.warn('Unable to load settings', e)
}

// Override function
function override (target, object) {
  for (var key of Object.keys(object)) {
    if (target[key] && typeof object[key] === 'object') {
      override(target[key], object[key])
    } else {
      target[key] = object[key]
    }
  }
}

// Load settings
let settings = {}
for (let f of files) {
  override(settings, f)
}

if (process.env['NODE_ENV'] === 'development') {
  console.log(settings)
}

module.exports = settings
