function coopCollectionSearch(searchTerm){
  var searchURL = 'https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.search.objects&access_token=05e2418430e18c1a48e37bf5b0d972b8&has_images=1&page=1&per_page=100&query=' + searchTerm;
  $.ajax({
    method: 'get',
    dataType: 'json',
    url: searchURL,
    beforeSend: artworkSearchAjaxSend,
    complete: artworkSearchAjaxComplete
  }).done(function(response){
    getCoopResults(response);
  });
};

function getCoopResults(response){
  var items = response.objects;
  $resultsContainer.html('');
  for (var i = 0; i < items.length; i++) {
    if(items[i].images[0].n){
      var thumbURL = items[i].images[0].n.url;
    } else{
      var thumbURL = items[i].images[0].b.url;
    };
    if(thumbURL != 'https://images.collection.cooperhewitt.org/0__n.jpg'){
      var $img = $("<img src='" + thumbURL + "' id='" + items[i].id + "' class='thumb'>");
      $img.on('click', function(){
        TweenMax.to($resultsContainer, 0.3, {opacity: 0.5});
        coopItemLookup(this.id);
      });
      $resultsContainer.append($img);
    }
  };
  if($resultsContainer.html() == ''){
    $resultsContainer.html("<h2>No Results</h2>")
  };
  searchResults = $resultsContainer.html();
};

function coopItemLookup(coopId){
  var lookupURL = "https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.objects.getInfo&access_token=05e2418430e18c1a48e37bf5b0d972b8&object_id=" + coopId;
  $.ajax({
    method: 'get',
    dataType: 'json',
    url: lookupURL,
    beforeSend: artworkLookupAjaxSend,
    complete: artworkLookupAjaxComplete
  }).done(function(response){
    var imgURL = response.object.images[0].z.url;
    if(response.object.participants.length > 0){
      var artist = response.object.participants[0].person_name;
    } else{
      var artist = 'Unknown';
    };
    var title = response.object.title;
    var date = response.object.date;
    var $img = $("<img src='" + imgURL
      + "' class='lookup' id='" + coopId
      + "' data-museum='coop' data-artist='" + artist
      + "' data-title='" + title
      + "' data-date='" + date + "'>");
    loadImageInspector($img);
  });  
};