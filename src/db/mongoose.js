const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/locations", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully to MongoDB");
});

// connection string mongoDB 

// mongodb+srv://nadav1996700:<password>@cluster0.64ph3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const Location = mongoose.model("Location", {
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  src: {
    type: String,
    required: true,
  },
  removable: {
    type: Boolean,
    required: true,
  },
});

module.exports = Location;
