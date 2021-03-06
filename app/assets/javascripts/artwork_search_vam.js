function vamCollectionSearch(searchTerm){
  $.ajax({
    method: 'get',
    dataType: 'json',
    url: '/victoriaalbert',
    data: {keyword: searchTerm},
    beforeSend: artworkSearchAjaxSend,
    complete: artworkSearchAjaxComplete
  }).done(function(response){
    console.log(response);
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
  if($resultsContainer.html() == ''){
    $resultsContainer.html("<h2>No Results</h2>")
  };
  searchResults = $resultsContainer.html();
};

function vamItemLookup(vamId){
  $.ajax({
    method: 'get',
    dataType: 'json',
    url: '/victoriaalbert/lookup',
    data: {objectID: vamId},
    beforeSend: artworkLookupAjaxSend,
    complete: artworkLookupAjaxComplete
  }).done(function(response){
    var info = response[0].fields;
    var imgURLEnding = info.image_set[0].fields.local;
    var imgURL = 'http://media.vam.ac.uk/media/thira/' + imgURLEnding;
    var artist = info.artist;
    if(info.title){
      var title = info.title;
    } else{
      var title = 'Untitled';
    };
    var date = info.date_text;
    var $img = $("<img src='" + imgURL
      + "' class='lookup' id='" + vamId
      + "' data-museum='vam' data-artist='" + artist
      + "' data-title='" + title
      + "' data-date='" + date + "'>");
    loadImageInspector($img);
  });
};  
