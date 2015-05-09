function vamCollectionSearch(searchTerm){
  var searchURL = 'http://www.vam.ac.uk/api/json/museumobject/search?q=' + searchTerm;
  $.ajax({
    method: 'get',
    dataType: 'jsonp',
    url: searchURL
  }).done(function(response){
    getVamResults(response);
  });
};

function getVamResults(response){
  var items = response.records;
  console.log(items);
  $resultsContainer.html('');
  for (var i = 0; i < items.length; i++) {
    var imgID = items[i].fields.primary_image_id;
    if(imgID){
      var imgDir = imgID.slice(0, 6);
      var imgURL = "http://media.vam.ac.uk/media/thira/collection_images/" + imgDir + "/" + imgID + ".jpg";
      var img = document.createElement('img');
      img.src = imgURL;
      img.id = imgID;
      img.className = "thumb";
      $resultsContainer.append(img);
      $('#' + img.id).on('click', function(){
        vamEnlarge(this.src);
      });
    };
  };
  searchResults = $resultsContainer.html();
};

function vamEnlarge(vamImageURL){
  var img = document.createElement('img');
  var imgURL = vamImageURL;
  img.src = imgURL;
  $resultsContainer.html(img);
  Draggable.create(img);
  $resultsReturn.css("visibility", "visible");
};  

$('#vam-search-button').on('click', function(){
  var searchTerm = $('#art-search-input').val();
  artworkSource = 'vam';
  $resultsReturn.css("visibility", "hidden");
  vamCollectionSearch(searchTerm);
});
