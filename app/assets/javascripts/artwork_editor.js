var $artworkEditor = $('.artwork-edit-panel');
var $draggables = [];
var artworkObjects = [];

function addImageToSalon(image){
  var $resizeContainer = $("<div class='resize-container'></div>")
  var $editableImage = image.clone();
  $editableImage.toggleClass('lookup salon');
  $resizeContainer.append($editableImage);
  $artworkEditor.append($resizeContainer);
  $resizeContainer.resizable({
    handles: "se",
    aspectRatio: true
  });
  $('.ui-resizable-handle').attr('data-clickable', true);
  $draggables.push(Draggable.create($resizeContainer, {
    onClick: function(){
      console.log(this);
    }
  }));
  loadEditorTools();
  $artworkSearchPanel.css("display", "none");
  TweenMax.to($artworkEditor, 0.1, {autoAlpha: 1});
};

function loadEditorTools(){
  var $returnToSearch = $('.artwork-edit-panel .return-to-search');
  var $enterEditMode = $('.artwork-edit-panel .enter-edit-mode');
  var $exitEditMode = $('.artwork-edit-panel .exit-edit-mode');
  var $saveSalonWall = $('.artwork-edit-panel .save-salon-wall')
  $returnToSearch.on('click', function(){
    $artworkSearchPanel.css("display", "block");
    $resultsContainer.css("opacity", 1);
    $imageInspector.css("visibility", "hidden");
    TweenMax.to($artworkEditor, 0.1, {autoAlpha: 0});
  });
  $enterEditMode.on('click', enterEditMode);
  $exitEditMode.on('click', exitEditMode);
  $saveSalonWall.on('click', saveSalonWall);
};

function enterEditMode(){
  $('.ui-resizable-handle').css('display', 'block');
  for (var i = $draggables.length - 1; i >= 0; i--) {
    $draggables[i][0].enable();
  };
};

function exitEditMode(){
  $('.ui-resizable-handle').css('display', 'none');
  for (var i = $draggables.length - 1; i >= 0; i--) {
    $draggables[i][0].disable();
  };
};

function saveSalonWall(){
  artworkObjects = [];
  makeArtworkObjects();
  for (var i = artworkObjects.length - 1; i >= 0; i--) {
    artworkObjects[i].save();
  };
}

function makeArtworkObjects(){
  for (var i = $draggables.length - 1; i >= 0; i--) {
    var type = $draggables[i][0].target.firstElementChild.dataset.museum,
      title = $draggables[i][0].target.firstElementChild.dataset.title,
      artist = $draggables[i][0].target.firstElementChild.dataset.artist,
      date = $draggables[i][0].target.firstElementChild.dataset.date,
      imageURL = $draggables[i][0].target.firstElementChild.src,
      xpos = $draggables[i][0].x,
      ypos = $draggables[i][0].y,
      width = $draggables[i][0].target.firstElementChild.width,
      height = $draggables[i][0].target.firstElementChild.height,
      artwork = new Artwork(type, title, artist, date, imageURL, xpos, ypos, width, height);
    artworkObjects.push(artwork);
  };
}

function Artwork(type, title, artist, date, imageURL, xpos, ypos, width, height){
  this.type = type;
  this.title = title;
  this.artist = artist;
  this.date = date;
  this.imageURL = imageURL;
  this.xpos = xpos;
  this.ypos = ypos;
  this.width = width;
  this.height = height;
};
Artwork.prototype = {
  save: function(){
    $.ajax({
      method: 'post',
      data: {artwork: {
        type: this.type,
        title: this.title,
        artist: this.artist,
        date: this.date,
        imageURL: this.imageURL,
        xpos: this.xpos,
        ypos: this.ypos,
        width: this.width,
        height: this.height
      }},
      dataType: 'json',
      url: "/artworks"
    }).done(function(response){
      console.log(response);
      console.log('artwork saved');
    }).fail(function(response){
      console.dir(response);
    });
  }
};