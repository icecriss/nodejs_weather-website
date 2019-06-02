const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiaWNlY3Jpc3MiLCJhIjoiY2p2eHB2ZzVtMDcxNzQzbXo5dm9uM2E1cCJ9.sJHPSthY5XiUQkFzHhm-Ng&limit=1`;

  request(
    {
      url,
      json: true
    },
    (error, response, body) => {
      if (error || body.message === "Not Authorized - Invalid Token.") {
        callback("Unable to connect to location services!", undefined);
      } else if (body.features.length === 0) {
        callback("Unable to find location. Try another search.", undefined);
      } else {
        callback(undefined, {
          longitude: body.features[0].center[0],
          latitude: body.features[0].center[1],
          location: body.features[0].place_name
        });
      }
    }
  );
};

module.exports = geocode;
