function vamCollectionSearch(searchTerm){
  var searchURL = 'http://www.vam.ac.uk/api/json/museumobject/search?images=1&q=' + searchTerm;
  $.ajax({
    method: 'get',
    dataType: 'jsonp',
    url: searchURL,
    beforeSend: artworkSearchAjaxSend,
    complete: artworkSearchAjaxComplete
  }).done(function(response){
    getVamResults(response);
  });
};

function getVamResults(response){
  var items = response.records;
  $resultsContainer.html('');
  for (var i = 0; i < items.length; i++) {
    var objID = items[i].fields.object_number;
    var imgID = items[i].fields.primary_image_id;
    var imgDir = imgID.slice(0, 6);
    var imgURL = "http://media.vam.ac.uk/media/thira/collection_images/" + imgDir + "/" + imgID + ".jpg";
      var $img = $("<img src='" + imgURL + "' id='" + objID + "' class='thumb'>");
    $img.on('click', function(){
      TweenMax.to($resultsContainer, 0.3, {opacity: 0.5});
      vamItemLookup(this.id);
    });
    $resultsContainer.append($img);
  };
  searchResults = $resultsContainer.html();
};

function vamItemLookup(vamId){
  var lookupURL = 'http://www.vam.ac.uk/api/json/museumobject/' + vamId;
  $.ajax({
    method: 'get',
    dataType: 'jsonp',
    url: lookupURL,
    beforeSend: artworkLookupAjaxSend,
    complete: artworkLookupAjaxComplete
  }).done(function(response){
    var info = response[0].fields;
    var imgURLEnding = info.image_set[0].fields.local;
    var imgURL = 'http://media.vam.ac.uk/media/thira/' + imgURLEnding;
    var artist = info.artist;
    var title = info.title;
    var date = info.date_text;
    var $img = $("<img src='" + imgURL
      + "' class='lookup' id='" + vamId
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
