var $artworkSearchPanel = $('.artwork-search-panel');
var $searchTerm = $('.art-search-input');
var $artworkSource = $('.artwork-source');
var $searchButton = $('.artwork-search-button');
var $resultsContainer = $('.results-container');
var $imageInspector = $('.image-inspector');
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
  var imgLoad = imagesLoaded($imageInspector);
  imgLoad.on('always', function(){
    $loading.css("visibility", "hidden");
  });
};

function loadImageInspector(image){
  $imageInspector.html(image);
  var $itemInfo = $("<div class='item-info'></div>")
  $imageInspector.append($itemInfo);
  $itemInfo.append("<h2>Title: <span>" + image.data("title") + "</span></h2>");
  $itemInfo.append("<h2>Artist: <span>" + image.data("artist") + "</span></h2>");
  $itemInfo.append("<h2>Dated: <span>"+ image.data("date") +"</span></h2>");
  var $enterEditorButton = $("<button class='enter-artwork-editor'>Add To Your Salon</button>");
  $enterEditorButton.on('click', function(){
    addImageToSalon(image);
  });
  $itemInfo.append($enterEditorButton);
  var $closeInspector = $("<button class='close-inspector'>Close</button>")
  $closeInspector.on('click', function(){
    TweenMax.to($imageInspector, 0.3, {autoAlpha: 0});
    TweenMax.to($resultsContainer, 0.3, {opacity: 1});
  })
  $itemInfo.append($closeInspector);
  TweenMax.to($imageInspector, 0.3, {autoAlpha: 1});
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