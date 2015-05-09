var searchResults;
var $resultsContainer = $('.results-container');
$resultsContainer.css("height", window.innerHeight * 3 / 4);
var $resultsReturn = $('#results-return');

$(document).ajaxStart(function(){
  $('#loading').css("visibility", "visible");
})

$(document).ajaxStop(function(){
  $('#loading').css("visibility", "hidden");
})

$resultsReturn.on('click', function(){
  $resultsReturn.css("visibility", "hidden")
  $resultsContainer.html(searchResults);
  var $resultsImages = $('.results-container img');
  for (var i = 0; i < $resultsImages.length; i++) {
    $resultsImages[i].addEventListener('click', function(){
      metItemLookup(this.id);
    });
  };
})

function metCollectionSearch(searchTerm){
  var searchURL = 'http://scrapi.org/search/' + searchTerm;
  $.ajax({
    method: 'get',
    dataType: 'json',
    url: searchURL
  }).done(function(response){
    getMetResults(response);
  });
};

function getMetResults(response){
  var items = response.collection.items;
  $resultsContainer.html('');
  for (var i = 0; i < items.length; i++) {
    var thumbURL = items[i]["image_thumb"];
    var img = document.createElement('img');
    img.src = thumbURL;
    img.id = items[i]["id"];
    $resultsContainer.append(img);
    $('#' + img.id).on('click', function(){
      metItemLookup(this.id);
    });
  };
  searchResults = $resultsContainer.html();
};

function metItemLookup(metId){
  var lookupURL = "http://scrapi.org/object/" + metId
  $.ajax({
    method: 'get',
    dataType: 'json',
    url: lookupURL
  }).done(function(response){
    var img = document.createElement('img');
    var imgURL = response["currentImage"]["imageUrl"];
    img.src = imgURL;
    $resultsContainer.html(img);
    Draggable.create(img);
    $resultsReturn.css("visibility", "visible");
  });  
};

$('#art-search-button').on('click', function(){
  var searchTerm = $('#art-search-input').val();
  $resultsReturn.css("visibility", "hidden");
  metCollectionSearch(searchTerm);
});
