const request = require('request');

const ipFetch = callback => {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    error ? callback(error, null) :
      response.statusCode !== 200 ? 
        callback(`${response.statusCode} recieved. details: ${body}`, null) :
          callback(null, JSON.parse(body).ip);
  });
}

const fetchCoordsByIP = (ip, callback) => {
  request(`https://ipvigilante.com/${ip}`, (error, response, body) => {
    error ? callback(error, null) :
      response.statusCode !== 200 ? callback(`${response.statusCode} error`, null) :
        callback(null, [
          JSON.parse(body).latitude, 
          JSON.parse(body).longitude
        ]);
  });
};
  
const fetchISSFlyOverTimes = (coords, callback) => {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords[0]}&lon=${coords[1]}`, (error, response, body) => {
    error ? callback(error, null) :
      response.statusCode !== 200 ? callback(`${response.statusCode} error`, null) :
        callback(null, JSON.parse(body).response);
  });
}



// fetchCoordsByIP('66.207.199.230', (error, data) => {
//   error ? console.log(error) : console.log(data);
// });


module.exports = { ipFetch, fetchCoordsByIP, fetchISSFlyOverTimes };