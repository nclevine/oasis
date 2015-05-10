function ArtworkSearch(source, searchTerm){
  this.source = source;
  this.searchTerm = searchTerm;
  this.searchResults = [];
}
ArtworkSearch.prototype = {
  collectionSearch: function(){
    if(this.source == 'met'){
      this.metCollectionSearch(this.searchTerm);
    } else if(this.source == 'vam'){
      this.vamCollectionSearch(this.searchTerm);
    } else if(this.source == 'rijks'){
      this.rijksCollectionSearch(this.searchTerm);
    };
  },
  getSearchResults: function(){
    return this.searchResults;
  },
  itemLookup: function(itemId){
    if(this.source == 'met'){
      this.selectedItem = metItemLookup(itemId);
    } else if(this.source == 'vam'){
      this.selectedItem = vamItemLookup(itemId);  
    } else if(this.source == 'rijks'){
      this.selectedItem = rijksItemLookup(itemId);
    };
  }, 
  metCollectionSearch: function(searchTerm){
    var searchURL = 'http://scrapi.org/search/' + searchTerm;
    $.ajax({
      method: 'get',
      dataType: 'json',
      url: searchURL
    }).done(function(response){
      this.searchResults = getMetResults(response);
    }.bind(this));
  },
  vamCollectionSearch(searchTerm){
    var searchURL = 'http://www.vam.ac.uk/api/json/museumobject/search?images=1&q=' + searchTerm;
    $.ajax({
      method: 'get',
      dataType: 'jsonp',
      url: searchURL
    }).done(function(response){
      this.searchResults = getVamResults(response);
    }.bind(this));
  },
  rijksCollectionSearch(searchTerm){
    var searchURL = 'https://www.rijksmuseum.nl/api/en/collection?key=buL32qSe&format=json&imgonly=true&ps=50&s=relevance&q=' + searchTerm;
    $.ajax({
      method: 'get',
      dataType: 'json',
      url: searchURL
    }).done(function(response){
      this.searchResults = getRijksResults(response);
    }.bind(this));
  }
}; 

//
// Metropolitan Museum of Art Search Methods
// 
function getMetResults(response){
  var results = [];
  var items = response.collection.items;
  for (var i = 0; i < items.length; i++) {
    var thumbURL = items[i].image_thumb;
    if(!thumbURL.includes("NoImageAvailable")){
      var $img = $("<img src='" + thumbURL + "' id='" + items[i].id + "' class='thumb'>");
    };
    results.push($img);
  };
  return results;
};
function metItemLookup(metId){
  var lookupURL = "http://scrapi.org/object/" + metId
  $.ajax({
    method: 'get',
    dataType: 'json',
    url: lookupURL
  }).done(function(response){
    var imgURL = response.currentImage.imageUrl;
    var artist = response.primaryArtistNameOnly;
    var title = response.title;
    var date = response.dateText;
    var $img = $("<img src='" + imgURL
      + "' class='lookup' id='" + metId
      + "' data-museum='rijks' data-artist='" + artist
      + "' data-title='" + title
      + "' data-date'" + date + "'>");
    return $img;
  });
};

//
// Victoria & Albert Museum Search Methods
// 
function getVamResults(response){
  var results = [];
  var items = response.records;
  for (var i = 0; i < items.length; i++) {
    var objID = items[i].fields.object_number;
    var imgID = items[i].fields.primary_image_id;
    var imgDir = imgID.slice(0, 6);
    var imgURL = "http://media.vam.ac.uk/media/thira/collection_images/" + imgDir + "/" + imgID + ".jpg";
    var $img = $("<img src='" + imgURL + "' id='" + objID + "' class='thumb'>");
    results.push($img);
  };
  return results;
};
function vamItemLookup(vamId){
  var lookupURL = 'http://www.vam.ac.uk/api/json/museumobject/' + vamId;
  $.ajax({
    method: 'get',
    dataType: 'jsonp',
    url: lookupURL
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
      + "' data-date'" + date + "'>");
    return $img;
  });
};  

//
// Rijksmuseum Search Methods
//
function getRijksResults(response){
  var results = [];
  var items = response.artObjects;
  for (var i = 0; i < items.length; i++) {
    var imgURL = items[i].webImage.url;
    var $img = $("<img src='" + imgURL + "' id='" + items[i].objectNumber + "' class='thumb'>");
    results.push($img);
  };
  return results;
};
function rijksItemLookup(rijksId){
  var lookupURL = "https://www.rijksmuseum.nl/api/en/collection/" + rijksId + "?key=buL32qSe&format=json";
  $.ajax({
    method: 'get',
    dataType: 'json',
    url: lookupURL
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
      + "' data-date'" + date + "'>");
    return $img;
  });  
};
