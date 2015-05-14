function rothkoGeneratorSearch(){
  var $rothkoButton = $("<button class='rothko-render-button'>Make Rothko</button>");
}
function rothkoGenerator(){
  searchURL = 'https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.play.robotRothko&access_token=05e2418430e18c1a48e37bf5b0d972b8';
  $.ajax({
    method: 'get',
    dataType: 'json',
    url: searchURL
    // beforeSend: artworkSearchAjaxSend,
    // complete: artworkSearchAjaxComplete
  }).done(function(response){
    renderRothko(response);
  });
};
function renderRothko(response){
  var info = response.rothko;
  $('.rothko .top').css({
    height: info.canvas[0] + '%',
    background: info.palette[0].colour
  });
  $('.rothko .middle').css({
    height: info.canvas[1] + '%',
    background: info.palette[1].colour
  });
  $('.rothko .bottom').css({
    height: info.canvas[2] + '%',
    background: info.palette[2].colour
  });
  $('.rothko').css('background', info.background.colour);
  $('.rothko div').css('-webkit-box-shadow', 'inset 0 0 5px 5px' + info.background.colour);
  $('.ui-resizable-handle').css('-webkit-box-shadow', '');
};