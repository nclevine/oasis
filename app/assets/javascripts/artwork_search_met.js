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
      + "' data-museum='rijks' data-artist='" + artist
      + "' data-title='" + title
      + "' data-date='" + date + "'>");
    $itemInspector.html($img);
    var $itemInfo = $("<div class='item-info'></div>")
    $itemInspector.append($itemInfo);
    $itemInfo.append("<h2>Title: <span>" + title + "</span></h2>");
    $itemInfo.append("<h2>Artist: <span>" + artist + "</span></h2>");
    $itemInfo.append("<h2>Dated: <span>"+ date +"</span></h2>");
    $backToResultsButton.css("visibility", "visible");
    TweenMax.to($itemInspector, 0.3, {autoAlpha: 1});
  });  
};
