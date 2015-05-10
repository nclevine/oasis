function ArtworkSearchView(){
  this.searchTerm = $('.art-search-input');
  this.artworkSource = $('.artwork-source');
  this.searchButton = $('.artwork-search-button');
  this.resultsContainer = $('.results-container');
  this.itemInspector = $('.item-inspector');
  this.backToResultsButton = $('.go-back-results');
  this.searchResults = [];

  $(document).ajaxSend(function(){
    $('.loading').css("visibility", "visible");
    TweenMax.to(artworkSearchView.resultsContainer, 0.3, {opacity: 0.5});
  });

  $(document).ajaxComplete(function(){
    var imgLoad = imagesLoaded(artworkSearchView.resultsContainer);
    imgLoad.on('always', function() {
      $('.loading').css("visibility", "hidden");
      TweenMax.to(artworkSearchView.resultsContainer, 0.3, {opacity: 1});
    });
  });

  this.searchButton.on('click', function(){
    artworkSearchView.createSearch();
    $(document).ajaxComplete(function(){
      artworkSearchView.renderResults();
    });
  });

  this.backToResultsButton.on('click', function(){
    $backToResultsButton.css("visibility", "hidden");
    artworkSearchView.itemInspector.css("visibility", "hidden");
    artworkSearchView.renderResults();
  });

}
ArtworkSearchView.prototype = {
  createSearch: function(){
    var keyword = this.searchTerm.val();
    var source = this.artworkSource.val();
    this.model = new ArtworkSearch(source, keyword);
    this.model.collectionSearch();
  },
  renderResults: function(){
    var results = this.model.getSearchResults();
    console.log(results);
    this.resultsContainer.html('');
    for (var i = 0; i < results.length; i++) {
      this.resultsContainer.append(results[i]);
      results[i].on('click', function(){
        this.renderItem(results[i]);
      }).bind(this);
    };
  },
  renderItem: function(item){
    this.backToResultsButton.css("visibility", "visible");
    var artwork = this.model.itemLookup(item.id),
      title = artwork.data("title"),
      artist = artwork.data("artist"),
      date = artwork.data("date");
    this.itemInspector.html('');
    this.itemInspector.append(artwork);
    var $itemInfo = $("<div class='item-info'></div>")
    this.itemInspector.append($itemInfo);
    $itemInfo.append("<h2>Title: <span>" + title + "</span></h2>");
    $itemInfo.append("<h2>Artist: <span>" + artist + "</span></h2>");
    $itemInfo.append("<h2>Dated: <span>"+ date +"</span></h2>");
    TweenMax.to(this.itemInspector, 0.3, {opacity: 1});
  }
};