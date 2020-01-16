const request = require('request');

const ipFetch = callback => {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    return error ? callback(error, null) :
      response.statusCode !== 200 ? 
        callback(`${response.statusCode} recieved. details: ${body}`, null) :
          callback(null, JSON.parse(body).ip);
  });
}

const fetchCoordsByIP = (ip, callback) => {
  request(`https://ipvigilante.com/${ip}`, (error, response, body) => {
    error ? callback(error, null) :
      response.statusCode !== 200 ? callback(`${response.statusCode} error`, null) :
        callback(null, JSON.parse(body));
  });
};
  



module.exports = { ipFetch, fetchCoordsByIP }