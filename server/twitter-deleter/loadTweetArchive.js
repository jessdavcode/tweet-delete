const fs = require('fs')
const csv = require('fast-csv')
const localStorage = require('../localStorage')

const FORMAT_JS = 'js'
const FORMAT_CSV = 'csv'

const processorFunctions = {
  [FORMAT_CSV]: async () => {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream('./tweets.csv')

      stream.on('error', err => {
        reject('Could not load file `./tweets.csv`')
      })

      stream.on('ready', () => {
        const tweetsArray = []

        const parser = csv
          .fromStream(stream, { headers: true })
          .on('data', data => {
            tweetsArray.unshift(data)
          })
          .on('end', data => {
            resolve(tweetsArray)
          })
          .on('error', err => {
            reject(err)
          })
      })
    })
  },
  [FORMAT_JS]: async () => {
    return new Promise((resolve, reject) => {
      // Read in Twitter's text file
      const archiveText = fs.readFileSync('./tweet.js', 'utf8')
      // Remove their JS var to make it JSON
      const archiveJSON = archiveText.replace('window.YTD.tweet.part0 = ', '')

      let tweetsArray = []

      // Parse the JSON into an array
      try {
        tweetsArray = JSON.parse(archiveJSON)
      } catch (err) {
        reject('Error parsing Twitter data')
      }

      resolve(tweetsArray)
    })
  },
}

module.exports = async () => {
  // Return a promise for when the whole processing is finished
  return new Promise(async (funcResolve, funcReject) => {
    let archiveFormat = null

    // Look for JS first
    try {
      fs.accessSync('./tweet.js', fs.constants.R_OK)
      archiveFormat = FORMAT_JS
    } catch (err) {
      // If it's not found, look for CSV
      try {
        fs.accessSync('./tweets.csv', fs.constants.R_OK)
        archiveFormat = FORMAT_CSV
      } catch (err) {
        return funcReject(new Error('No archive file found'))
      }
    }

    // Get the appropriate function
    const processorFunc = processorFunctions[archiveFormat]

    processorFunc()
      .then(async tweetsArray => {
        console.log(`${tweetsArray.length} Tweets loaded`)
        await localStorage.setItem('tweetCount', tweetsArray.length)

        return funcResolve(tweetsArray)
      })
      .catch(err => {
        return funcReject(new Error(err))
      })
  })
}
