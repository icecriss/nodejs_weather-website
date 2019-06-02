const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const secretKey = "b6acee7b148c3020c57e1712019f5380";
  const urlBase = "https://api.darksky.net/forecast/";
  const url = `${urlBase}${secretKey}/${latitude},${longitude}?units=si`;




  request({
      url,
      json: true
    },
    (error, response, body) => {
      if (error || body === "Forbidden\n") {
        callback("Unable to connect to weather service!", undefined);
      } else if (body.error) {
        console.log(url);
        callback("Unable to find location.", undefined);
      } else {
        callback(
          undefined, {
            forecast: `${body.daily.data[0].summary}
It is currently ${body.currently.temperature} degrees out and there is a ${body.currently.precipProbability}% chance of rain.`,
            highTemperature: body.daily.data[0].temperatureHigh,
            highTemperatureTime: body.daily.data[0].temperatureHighTime
          }
        );
      }
    }
  );
};

module.exports = forecast;