// Import modules
var $http = require('./ajax');
var News = require('./News');
var Dom = require('./Dom');

// Get DOM elements
var newsListDOM = document.getElementById('news-list');
var domList = new Dom();

// Fetch the data using xhr and promise
$http('./data/data.json')
  .then(json => {
    var result = JSON.parse(json);
    result.results.forEach(renderList);
  }).catch(error => {
    newsListDOM.innerHTML = 'Something went wrong while loading news!';
  });

function renderList(news) {
  let item = new News(news, domList);
  domList.pushItem(item);
  newsListDOM.appendChild(item.render());
}

// Search functionality
var inputs = document.getElementById('filter');

inputs.addEventListener('keyup', function() {
  var input = this.value.toLowerCase();

  // Traverse the dom list
  domList.list.forEach(item => {
    var reg = RegExp(input);
    var title = item.data.titleNoFormatting.toLowerCase();
    var content = item.data.content.toLowerCase();

    if(title.match(reg) || content.match(reg)) {
      domList.getItem(item.domId).show();
    } else {
      domList.getItem(item.domId).hide();
    }
  })
});

// Date filter functionality
var dateFilter = document.getElementById('dateFilter');

dateFilter.addEventListener('change', function() {
  var selectedDate = new Date(this.value)
  
  // Traverse the dom list
  domList.list.forEach(item => {
    var itemDate = new Date(item.data.publishedDate);
    
    if (isNaN(selectedDate.getTime())) {
      domList.getItem(item.domId).show();
      return;
    }
    
    if(itemDate.getDate() === selectedDate.getDate()) {
      domList.getItem(item.domId).show();
    } else {
      domList.getItem(item.domId).hide();
    }
  })
})
