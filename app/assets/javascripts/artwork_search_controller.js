var $searchTerm = $('.art-search-input');
var $artworkSource = $('.artwork-source');
var $searchButton = $('.artwork-search-button');
var $resultsContainer = $('.results-container');
var $itemInspector = $('.item-inspector');
var $backToResultsButton = $('.go-back-results');
var $loading = $('.loading')
var searchResults = '';

function artworkSearchAjaxSend(){
  $loading.css("visibility", "visible");
  TweenMax.to($resultsContainer, 0.3, {opacity: 0.5});
};

function artworkSearchAjaxComplete(){
  var imgLoad = imagesLoaded($resultsContainer);
  imgLoad.on('always', function(){
    $loading.css("visibility", "hidden");
    TweenMax.to($resultsContainer, 0.3, {opacity: 1});
  });
};

function artworkLookupAjaxSend(){
  $loading.css("visibility", "visible");
};

function artworkLookupAjaxComplete(){
  var imgLoad = imagesLoaded($itemInspector);
  imgLoad.on('always', function(){
    $loading.css("visibility", "hidden");
  });
};

$searchButton.on('click', function(){
  var source = $artworkSource.val();
  var searchTerm = $searchTerm.val();
  if(source == 'met'){
    metCollectionSearch(searchTerm);
  } else if(source == 'vam'){
    vamCollectionSearch(searchTerm);
  } else if(source == 'rijks'){
    rijksCollectionSearch(searchTerm);
  };
});

$backToResultsButton.on('click', function(){
  this.style.visibility = "hidden";
  TweenMax.to($itemInspector, 0.3, {autoAlpha: 0});
  TweenMax.to($resultsContainer, 0.3, {opacity: 1});
});