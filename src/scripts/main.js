// This is the main file that pulls in all other modules

// Import modules
var $http = require('./ajax');

// Get DOM elements
var newsList = document.getElementById('news-list');

// Fetch the data using xhr and promise
$http.ajaxGet('./data/data.json')
  .then(json => {
    var result = JSON.parse(json);

    result.results.forEach(news => {
      var date = new Date(news.publishedDate);
      var options = {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      };
      var formatedDate = date.toLocaleTimeString("en-us", options);

      var content = `<div class="news-item">
          <img src="${news.image.tbUrl}">
          <h2>${news.title}</h2>
          <p>${news.publisher}</p>
          <p>${formatedDate}</p>
        </div>`;
      newsList.innerHTML = newsList.innerHTML + content;
    });
  }).catch(error => {
    // displayDiv.innerHTML = error;
    console.log(error);
  });
