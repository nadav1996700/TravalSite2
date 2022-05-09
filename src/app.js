const path = require("path");
const express = require("express");
const hbs = require("hbs");
const bodyParser = require("body-parser");
const Location = require("./db/mongoose");
const multer = require("multer");
const upload = multer({ dest: "public/img" });
const locations = require("./utils/locations");
const { unlink } = require("fs");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicPath = path.join(__dirname, "../public");

const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicPath));

// Setup body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("", (req, res) => {
  res.render("index", { title: "Index", active: "index" });
});

app.get("/addLocation", (req, res) => {
  res.render("addLocation", { title: "Add Location", active: "addLocation" });
});

app.get("/remove", (req, res) => {
  const loc = req.query.loc;
  const src = req.query.src;
  locations.removeLocation(loc);
  unlink("public/" + src, (err) => {
    if (err) throw err;
  });
  setTimeout(() => {
    res.redirect("/");
  }, 1000);
});

app.post("/location", upload.single("fileName"), (req, res, next) => {
  const { location, description } = req.body;
  const { path } = req.file;
  const src = path.replace("public", "");
  const obj = {
    location,
    description,
    src,
  };
  locations.addLocation(location, obj);
  const data = new Location(obj);
  data.save().catch((err) => {
    if (err) throw err;
  });
  setTimeout(() => {
    res.redirect("/");
  }, 1000);
});

hbs.registerHelper("isEqual", function (s1, s2) {
  return s1 === s2;
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
