const { getLocalISSTimes } = require('./iss_promised');


getLocalISSTimes()
  .then(data => {
    for (let element of data) {
    console.log(element)
  }})
  .catch(error => {
    console.log('IT DIDNT WORK :\'< details:   ', error.message);
  });