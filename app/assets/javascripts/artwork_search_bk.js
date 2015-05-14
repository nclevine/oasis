function bkCollectionSearch(searchTerm){
  $.ajax({
    method: 'get',
    dataType: 'json',
    url: '/bkmuseum',
    data: {keyword: searchTerm},
    beforeSend: artworkSearchAjaxSend,
    complete: artworkSearchAjaxComplete,
  }).done(function(response){
    getBkResults(response);
  });
};

function getBkResults(response){
  var items = response.response.resultset.items;
  $resultsContainer.html('');
  for (var i = 0; i < items.length; i++) {
    var thumbURL = items[i].images['0'].thumb_uri
    var $img = $("<img src='" + thumbURL + "' id='" + items[i].id + "' class='thumb'>");
    $img.on('click', function(){
      TweenMax.to($resultsContainer, 0.3, {opacity: 0.5});
      bkItemLookup(this.id);
    });
    $resultsContainer.append($img);
  };
  if($resultsContainer.html() == ''){
    $resultsContainer.html("<h2>No Results</h2>")
  };
  searchResults = $resultsContainer.html();
};

function bkItemLookup(bkId){
  $.ajax({
    method: 'get',
    dataType: 'json',
    url: '/bkmuseum/lookup',
    data: {objectID: bkId},
    beforeSend: artworkLookupAjaxSend,
    complete: artworkLookupAjaxComplete
  }).done(function(response){
    var artwork = response.response.object;
    var imgURL = artwork.images['0'].uri;
    if(artwork.artists){
      var artist = artwork.artists[0].name;
    } else{
      var artist = 'Unknown';
    };
    var title = artwork.title;
    var date = artwork.object_date;
    var $img = $("<img src='" + imgURL
      + "' class='lookup' id='" + bkId
      + "' data-museum='bk' data-artist='" + artist
      + "' data-title='" + title
      + "' data-date='" + date + "'>");
    loadImageInspector($img);
  });
};