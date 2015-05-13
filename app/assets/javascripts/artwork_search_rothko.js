function rothkoGenerator(color){
  searchURL = 'https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.play.robotRothko&access_token=05e2418430e18c1a48e37bf5b0d972b8&color=' + color;
  $.ajax({
    method: 'get',
    dataType: 'json',
    url: searchURL,
    beforeSend: artworkSearchAjaxSend,
    complete: artworkSearchAjaxComplete
  }).done(function(response){
    getRothkoResults(response);
  });
};

function getRothkoResults(response){

};