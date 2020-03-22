const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/43eaf3c6cd56f73d1bfaec26a54e99df/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?lang=en'

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services', undefined)
        } else if (body.error) {
            callback('Unable to find weather for that location.  Try another location.', undefined)
        } else {
            const currently = body.currently
            const high = body.daily.data[0].temperatureHigh
            const low = body.daily.data[0].temperatureLow
            const temp = currently.temperature
            const rain = currently.precipProbability
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + temp + ' degrees out, with a high of ' + high + ' and a low of '+ low + '. There is a ' + rain + '% chance of rain.')
        }
    })
}

module.exports = forecast