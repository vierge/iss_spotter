const request = require('request-promise-native');

const ipFetch = () => {
  return request('https://api.ipify.org?format=json');      
}

const coordsFetch = (body) => {
  const ip = JSON.parse(body).ip  
  return request(`https://ipvigilante.com/${ip}`);
} 

const flyOverFetch = (coords) => {
  const location = JSON.parse(coords).data;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${location.latitude}&lon=${location.longitude}`)
}

const ISSPassTimes = (flyOvers) => {
  const list = [];
  flyOvers = JSON.parse(flyOvers).response;
  for(let element of flyOvers) {
  let passTime = new Date(element.risetime*1000);
  list.push(`Next pass at ${passTime.toLocaleString()} for ${element.duration} seconds!`);
  }
  return list;
}

const getLocalISSTimes = () => {
  return ipFetch()
  .then(coordsFetch)
  .then(flyOverFetch)
  .then(ISSPassTimes)
  .then((data) => {
    const response = data;
    return response;
  });
}



module.exports = { getLocalISSTimes };