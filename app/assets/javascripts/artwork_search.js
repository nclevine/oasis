var artworkSource = '';
var searchResults = [];
var $resultsContainer = $('.results-container');
$resultsContainer.css("height", window.innerHeight * 3 / 4);
var $resultsReturn = $('#results-return');

$(document).ajaxStart(function(){
  $('#loading').css("visibility", "visible");
  TweenMax.to($resultsContainer, 0.3, {opacity: 0.5});
})

$(document).ajaxStop(function(){
  $('#loading').css("visibility", "hidden");
  TweenMax.to($resultsContainer, 0.3, {opacity: 1});
})

$resultsReturn.on('click', function(){
  $resultsReturn.css("visibility", "hidden")
  $resultsContainer.html(searchResults);
  var $resultsImages = $('.results-container img');
  for (var i = 0; i < $resultsImages.length; i++) {
    $resultsImages[i].addEventListener('click', function(){
      if(artworkSource == 'met'){
        metItemLookup(this.id);
      } else if(artworkSource == 'vam'){
        vamEnlarge(this.src);  
      };
    });
  };
});