const fs = require("fs");

const addLocation = (location, body) => {
  const locations = loadLocations();
  console.log(locations);
  const duplicateLocation = locations.find((l) => l.location === location);

  if (!duplicateLocation) {
    locations.push(body);
    saveLocations(locations);
    console.log("New location added!");
  } else {
    console.log("location already exist!");
  }
};

const removeLocation = (location) => {
  const locations = loadLocations();
  const locationsToKeep = locations.filter((l) => l.location !== location);

  if (locations.length > locationsToKeep.length) {
    console.log("Location removed!");
    saveLocations(locationsToKeep);
  } else {
    console.log("Location not found!");
  }
};

const saveLocations = (locations) => {
  const dataJSON = JSON.stringify(locations);
  fs.writeFileSync("public/static/dataFromMongo.json", dataJSON);
};

const loadLocations = () => {
  try {
    const dataBuffer = fs.readFileSync("public/static/dataFromMongo.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  addLocation: addLocation,
  removeLocation: removeLocation,
};
