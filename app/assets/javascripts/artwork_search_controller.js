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
  if(image.data('museum') == 'tumblr'){
    $itemInfo.append("<h2>Title: <input class='tumblr-title-input-" + image.prop('id') + "' type='text' placeholder='Name This Tumblr Post'></h2>");
    $itemInfo.append("<h2>Blog: <span>" + image.data('artist') + "</span></h2>")
  } else{
    $itemInfo.append("<h2>Title: <span>" + image.data("title") + "</span></h2>");
    $itemInfo.append("<h2>Artist: <span>" + image.data("artist") + "</span></h2>");
  }
  $itemInfo.append("<h2>Dated: <span>"+ image.data("date") +"</span></h2>");
  var $enterEditorButton = $("<button class='enter-artwork-editor'>Add To Your Salon</button>");
  $enterEditorButton.on('click', function(){
    salonWall.addSearchImageToSalon(image);
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
