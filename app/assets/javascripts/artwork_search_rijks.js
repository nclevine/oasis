function rijksCollectionSearch(searchTerm){
  $.ajax({
    method: 'get',
    dataType: 'json',
    url: '/rijksmuseum',
    data: {keyword: searchTerm},
    beforeSend: artworkSearchAjaxSend,
    complete: artworkSearchAjaxComplete
  }).done(function(response){
    getRijksResults(response);
  });
};

function getRijksResults(response){
  var items = response.artObjects;
  $resultsContainer.html('');
  for (var i = 0; i < items.length; i++) {
    if(items[i].webImage){
      var imgURL = items[i].webImage.url;
      var $img = $("<img src='" + imgURL + "' id='" + items[i].objectNumber + "' class='thumb'>");
      $img.on('click', function(){
        TweenMax.to($resultsContainer, 0.3, {opacity: 0.5});
        rijksItemLookup(this.id);
      });
      $resultsContainer.append($img);
    };
  };
  if($resultsContainer.html() == ''){
    $resultsContainer.html("<h2>No Results</h2>")
  };
  searchResults = $resultsContainer.html();
};

function rijksItemLookup(rijksId){
  $.ajax({
    method: 'get',
    dataType: 'json',
    url: '/rijksmuseum/lookup',
    data: {objectID: rijksId},
    beforeSend: artworkLookupAjaxSend,
    complete: artworkLookupAjaxComplete
  }).done(function(response){
    var info = response.artObject;
    var imgURL = info.webImage.url;
    var artist = info.principalMaker;
    var title = info.title;
    var date = info.dating.year;
    var $img = $("<img src='" + imgURL
      + "' class='lookup' id='" + rijksId
      + "' data-museum='rijks' data-artist='" + artist
      + "' data-title='" + title
      + "' data-date='" + date + "'>");
    loadImageInspector($img);
  });  
};
