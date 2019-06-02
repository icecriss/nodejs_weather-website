const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// we set the use of handlebars
app.set("view engine", "hbs");
// we can set the path we want to get the views from...
// if we don't set it, the directory will have to be views
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Ice"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Ice"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    helpText: "This is some helpful text.",
    name: "Ice"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a location"
    });
  }

  geocode(
    req.query.address,
    (error, {
      longitude,
      latitude,
      location
    } = {}) => {
      if (error) {
        // return res.send({ error: error});
        return res.send({
          error
        });
      }
      forecast(latitude, longitude, (error, {
        forecast,
        highTemperature,
        highTemperatureTime,
      }) => {
        if (error) {
          // return res.send({ error: error});
          return res.send({
            error
          });
        } else {
          res.send({
            title: "Weather page",
            forecast: forecast,
            highTemperatureTime: highTemperatureTime,
            highTemperature: highTemperature,
            //  location: location,
            location,
            address: req.query.address
          });
          // res.render("weather", {
          //   title: "Weather page",
          //   forecast: forecastData,
          //   // location: location,
          //   location,
          //   address: req.query.address
          // });
        }
      });
    }
  );

  // res.render("weather", {
  //   title: "Weather page",
  //   forecast: "It is currently 25°C",
  //   location: req.query.address,
  //   name: "Ice"
  // });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    });
  }
  console.log(req.query);
  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help article not found.",
    name: "Ice"
  });
});

app.get("/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found.",
    name: "Ice"
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
  console.log(`http://localhost:${port}`);
});