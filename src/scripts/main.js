// This is the main file that pulls in all other modules

// Import modules
var $http = require('./ajax');

// Get DOM elements
var newsList = document.getElementById('news-list');

// Fetch the data using xhr and promise
$http.ajaxGet('./data/data.json')
  .then(json => {
    var result = JSON.parse(json);

    result.results.forEach(renderList);
  }).catch(error => {
    // displayDiv.innerHTML = error;
    console.log(error);
  });

class News {
  constructor(data) {
    this.data = data;
  }

  getDate() {
    var date = new Date(this.data.publishedDate);
    var options = {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    };
    return date.toLocaleTimeString("en-us", options);
  }

  event() {
    console.log(this.data);
  }

  render() {
    var item = document.createElement('div');
    item.className = 'news-item';
    item.innerHTML = `<img src="${this.data.image.tbUrl}">
          <h2>${this.data.title}</h2>
          <p>${this.data.publisher}</p>
          <p>${this.getDate()}</p>`;
    item.addEventListener('click', () => {
      this.event.call(this);
    });
    return item;
  }
}

function renderList(news) {
  let item = new News(news);

  newsList.appendChild(item.render());
}
