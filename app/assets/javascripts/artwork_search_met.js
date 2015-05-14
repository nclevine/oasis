function metCollectionSearch(searchTerm){
  $.ajax({
    method: 'get',
    dataType: 'json',
    url: '/metmuseum',
    data: {keyword: searchTerm},
    beforeSend: artworkSearchAjaxSend,
    complete: artworkSearchAjaxComplete
  }).done(function(response){
    getMetResults(response);
  });
};

function getMetResults(response){
  var items = response.collection.items;
  $resultsContainer.html('');
  for (var i = 0; i < items.length; i++) {
    var thumbURL = items[i].image_thumb;
    if(!thumbURL.includes("NoImageAvailable")){
      var $img = $("<img src='" + thumbURL + "' id='" + items[i].id + "' class='thumb'>");
      $img.on('click', function(){
        TweenMax.to($resultsContainer, 0.3, {opacity: 0.5});
        metItemLookup(this.id);
      });
      $resultsContainer.append($img);
    };
  };
  if($resultsContainer.html() == ''){
    $resultsContainer.html("<h2>No Results</h2>")
  };
  searchResults = $resultsContainer.html();
};

function metItemLookup(metId){
  $.ajax({
    method: 'get',
    dataType: 'json',
    url: '/metmuseum/lookup',
    data: {objectID: metId},
    beforeSend: artworkLookupAjaxSend,
    complete: artworkLookupAjaxComplete
  }).done(function(response){
    var imgURL = response.currentImage.imageUrl;
    if(response.primaryArtistNameOnly){
      var artist = response.primaryArtistNameOnly;
    } else{
      var artist = 'Unknown';
    };
    var title = response.title;
    var date = response.dateText;
    var $img = $("<img src='" + imgURL
      + "' class='lookup' id='" + metId
      + "' data-museum='met' data-artist='" + artist
      + "' data-title='" + title
      + "' data-date='" + date + "'>");
    loadImageInspector($img);
  });  
};
