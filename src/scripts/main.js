// This is the main file that pulls in all other modules

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
    // displayDiv.innerHTML = error;
    console.log(error);
  });

function renderList(news) {
  let item = new News(news, domList);
  domList.pushItem(item);
  newsListDOM.appendChild(item.render());
}

var inputs = document.getElementById('filter');

inputs.addEventListener('keyup', function() {
  var input = this.value.toLowerCase();
  var empty = false;
  
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
})
