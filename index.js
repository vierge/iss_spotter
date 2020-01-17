const { nextISSTimesByLocation } = require('./iss');

nextISSTimesByLocation((error, passTimes) => {
  if (error) return console.log(error)
  else {
    for (let element of passTimes) {
      let utc = new Date(element.risetime*1000);
      console.log(`Next pass at ${utc.toLocaleString()} for ${element.duration} seconds!`);
    }
  } 
});


