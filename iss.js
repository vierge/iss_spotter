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
      // console.log('IPVIGILANTE PARSE: ', JSON.parse(body).data.latitude);  
      callback(null, [
          JSON.parse(body).data.latitude, 
          JSON.parse(body).data.longitude
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

const nextISSTimesByLocation = (callback) => {
  ipFetch((error, ip) => {
    if (error) {
      callback(error, null);
    } else {
      //WE HAVE IP STRING
      fetchCoordsByIP(ip, (error, coords) => {
        if (error) {
          callback(error, null);
        } else {
          //COORDINATES AND IP!!!!!!!!!
          // console.log('IP ADD: ', ip);
          fetchISSFlyOverTimes(coords, (error, passTimes) => {
            if (error) {
              // console.log('error is here:   ', coords);
              callback(error, null);
            } else {
              //PASS TIMES, COORDINATES, IP, !!!!!!
              callback(null, passTimes);
            }
          })
        }
      })
    }
  })
};


// fetchCoordsByIP('66.207.199.230', (error, data) => {
//   error ? console.log(error) : console.log(data);
// });


module.exports = { ipFetch, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesByLocation };