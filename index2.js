const { getLocalISSTimes } = require('./iss_promised');


getLocalISSTimes()
  .then(data => console.log(data))
  .catch(error => {
    console.log('IT DIDNT WORK :\'< details:   ', error.message);
  });