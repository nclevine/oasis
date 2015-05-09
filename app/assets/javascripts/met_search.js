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
  console.log(items);
  $resultsContainer.html('');
  for (var i = 0; i < items.length; i++) {
    var thumbURL = items[i].image_thumb;
    if(!thumbURL.includes("NoImageAvailable")){
      var img = document.createElement('img');
      img.src = thumbURL;
      img.id = items[i].id;
      img.className = "thumb";
      $resultsContainer.append(img);
      $('#' + img.id).on('click', function(){
        metItemLookup(this.id);
      });
    };
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
    var imgURL = response.currentImage.imageUrl;
    img.src = imgURL;
    $resultsContainer.html(img);
    Draggable.create(img);
    $resultsReturn.css("visibility", "visible");
  });  
};

$('#met-search-button').on('click', function(){
  var searchTerm = $('#art-search-input').val();
  artworkSource = 'met';
  $resultsReturn.css("visibility", "hidden");
  metCollectionSearch(searchTerm);
});
