const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZXNjaWRtb3JlIiwiYSI6ImNrODI5NHV2eTBia3Aza210bXo4ZWFnMnYifQ.QH7MgJEc5Qq9JP7KZ7Fj3A&limit=1'

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services')
        } else if (!body.features[0]) {
            callback('Unable to get address from address service. Try another search.')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode