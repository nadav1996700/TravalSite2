const fs = require("fs");
const chalk = require("chalk");

const addLocation = (location, body) => {
  const locations = loadLocations();
  console.log(locations);
  const duplicateLocation = locations.find((l) => l.location === location);

  if (!duplicateLocation) {
    locations.push(body);
    saveLocations(locations);
    console.log(chalk.green.inverse("New location added!"));
  } else {
    console.log(chalk.red.inverse("location exist!"));
  }
};

const removeLocation = (location) => {
  const locations = loadLocations();
  const locationsToKeep = locations.filter((l) => l.location !== location);

  if (locations.length > locationsToKeep.length) {
    console.log(chalk.green.inverse("Location removed!"));
    saveLocations(locationsToKeep);
  } else {
    console.log(chalk.red.inverse("Location not found!"));
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
