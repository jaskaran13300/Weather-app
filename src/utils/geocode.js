const request = require('request');

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoiamFza2FyYW4xMzMwMCIsImEiOiJjazNzb2I4NG4wOGdsM2VtbnFiNWw0M2N5In0.yadJfE8bHEBRSA0-qqmReQ&limit=1"
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable To reach the web servers!', undefined);
        }
        else if (response.body.features.length == 0) {
            callback('Location is Not correct! Try another!', undefined);
        }
        else {
            callback(undefined, {
                longitude: response.body.features[0].geometry.coordinates[0],
                latitude: response.body.features[0].geometry.coordinates[1],
                location: response.body.features[0].place_name
            });
        }
    })
}

const forecast=(altitudes,callback)=>{
    console.log(altitudes);
    const url = 'https://api.darksky.net/forecast/b9c3e5189c8cef8b771f8c458052c42a/' + altitudes.longitude + ',' + altitudes.latitude ;//?units=si,uk preceeding with & use other arguments line ?units=si&lang=es,others,check it from http://darksky.net/dev/docs#forecast-request
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Kindly check Your internet connection',undefined);
        }
        else if(response.body.error){
            callback('Longitudes are not well defined',undefined);
        }
        else{
            callback(undefined,{
                temperature: response.body.currently.temperature,
                rainProbab: response.body.currently.precipProbability,
                summary: response.body.daily.data[0].summary

            });
        }
    })
}

module.exports={
    geocode,
    forecast
};