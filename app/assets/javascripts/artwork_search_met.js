function metCollectionSearch(searchTerm){
  var searchURL = 'http://scrapi.org/search/' + searchTerm;
  $.ajax({
    method: 'get',
    dataType: 'json',
    url: searchURL,
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
  searchResults = $resultsContainer.html();
};

function metItemLookup(metId){
  var lookupURL = "http://scrapi.org/object/" + metId
  $.ajax({
    method: 'get',
    dataType: 'json',
    url: lookupURL,
    beforeSend: artworkLookupAjaxSend,
    complete: artworkLookupAjaxComplete
  }).done(function(response){
    var imgURL = response.currentImage.imageUrl;
    var artist = response.primaryArtistNameOnly;
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
