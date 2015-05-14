function tumblrCollectionSearch(searchTerm){
  var searchURL = 'http://api.tumblr.com/v2/tagged?api_key=AVethARkByHX2bh8S4IfzOFblcEL5qhd5xqaHZjGQhW5xLRXS9&type=photo&tag=' + searchTerm;
  $.ajax({
    method: 'get',
    dataType: 'jsonp',
    url: searchURL,
    beforeSend: artworkSearchAjaxSend,
    complete: artworkSearchAjaxComplete
  }).done(function(response){
    getTumblrResults(response);
  });
};

function getTumblrResults(response){
  var items = response.response;
  $resultsContainer.html('');
  for (var i = 0; i < items.length; i++) {
    if(items[i].photos){
      var thumbURL = items[i].photos[0].original_size.url;
      var blogName = items[i].blog_name;
      var $img = $("<img src='" + thumbURL + "' id='" + items[i].id + "' data-blogname='" + blogName + "' class='thumb'>");
      $img.on('click', function(){
        TweenMax.to($resultsContainer, 0.3, {opacity: 0.5});
        tumblrItemLookup(this.getAttribute('data-blogname'), this.id);
      });
      $resultsContainer.append($img);
    };
  };
  if($resultsContainer.html() == ''){
    $resultsContainer.html("<h2>No Results</h2>")
  };
  searchResults = $resultsContainer.html();
};

function tumblrItemLookup(blogName, itemID){
  var lookupURL = "http://api.tumblr.com/v2/blog/" + blogName + ".tumblr.com/posts?api_key=AVethARkByHX2bh8S4IfzOFblcEL5qhd5xqaHZjGQhW5xLRXS9&id=" + itemID;
  $.ajax({
    method: 'get',
    dataType: 'jsonp',
    url: lookupURL,
    beforeSend: artworkLookupAjaxSend,
    complete: artworkLookupAjaxComplete
  }).done(function(response){
    var item = response.response.posts[0];
    if(item.photos[0].original_size.width > 500 || item.photos[0].original_size.height > 500){
      var imgURL = item.photos[0].alt_sizes[1].url;
    } else{
      var imgURL = item.photos[0].original_size.url;
    };
    var artist = item.blog_name;
    var title = '';
    var date = item.date;
    var $img = $("<img src='" + imgURL
      + "' class='lookup' id='" + itemID
      + "' data-museum='tumblr' data-artist='" + artist
      + "' data-title='" + title
      + "' data-date='" + date + "'>");
    loadImageInspector($img);
  });  
};
