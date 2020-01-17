const { ipFetch, coordsFetch, flyOverFetch, ISSPassTimes } = require('./iss_promised');


ipFetch()
  .then(ip => coordsFetch(ip))
  .then(coords => flyOverFetch(coords))
  .then(flyOvers => ISSPassTimes(flyOvers))
