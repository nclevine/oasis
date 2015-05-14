function coopCollectionSearch(searchTerm){
  $.ajax({
    method: 'get',
    dataType: 'json',
    url: '/coop',
    data: {keyword: searchTerm},
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
  $.ajax({
    method: 'get',
    dataType: 'json',
    url: '/coop/lookup',
    data: {objectID: coopId},
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