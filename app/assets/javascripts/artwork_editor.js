var $artworkEditor = $('.artwork-edit-panel');
var $draggables = [];
var artworkObjects = [];

function addImageToSalon(image){
  var $resizeContainer = $("<div class='resize-container'></div>")
  var $editableImage = image.clone();
  $editableImage.toggleClass('lookup salon');
  $resizeContainer.append($editableImage);
  $artworkEditor.append($resizeContainer);
  $resizeContainer.attr('data-saved', 'new');
  $resizeContainer.resizable({
    handles: "se",
    aspectRatio: true
  });
  $('.ui-resizable-handle').attr('data-clickable', true);
  $draggables.push(Draggable.create($resizeContainer, {
    onDragStartScope: $resizeContainer,
    onDragStart: function(){
      if(this.attr('data-saved') == 'saved'){
        this.attr('data-saved', 'update');
      };
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
    // if(artworkObjects[i].saved == 'new'){
      $draggables[i][0].target.setAttribute('data-saved', 'saved');
      artworkObjects[i].save();
    // } else if(artworkObjects[i].saved == 'update'){
    //   $draggables[i][0].target.setAttribute('data-saved', 'saved');
    //   artworkObjects[i].update();
    // } else{
    //   console.log('babys already saved');
    //   console.log(artworkObjects[i]);
    // };
  };
};

function SalonWall(){
  
}

function makeArtworkObjects(){
  for (var i = $draggables.length - 1; i >= 0; i--) {
    var source = $draggables[i][0].target.firstElementChild.dataset.museum,
      title = $draggables[i][0].target.firstElementChild.dataset.title,
      artist = $draggables[i][0].target.firstElementChild.dataset.artist,
      date = $draggables[i][0].target.firstElementChild.dataset.date,
      imageURL = $draggables[i][0].target.firstElementChild.src,
      xpos = $draggables[i][0].x,
      ypos = $draggables[i][0].y,
      width = $draggables[i][0].target.firstElementChild.width,
      height = $draggables[i][0].target.firstElementChild.height,
      zIndex = $draggables[i][0].target.style.zIndex,
      saved = $draggables[i][0].target.dataset.saved,
      artwork = new Artwork(source, title, artist, date, imageURL, xpos, ypos, width, height, zIndex, saved);
    artworkObjects.push(artwork);
  };
}

function Artwork(source, title, artist, date, imageURL, xpos, ypos, width, height, zIndex, saved){
  this.source = source;
  this.title = title;
  this.artist = artist;
  this.date = date;
  this.imageURL = imageURL;
  this.xpos = xpos;
  this.ypos = ypos;
  this.width = width;
  this.height = height;
  this.zIndex = zIndex;
  this.saved = saved;
};
Artwork.prototype = {
  save: function(){
    $.ajax({
      method: 'post',
      async: false,
      data: {artwork: {
        source: this.source,
        title: this.title,
        artist: this.artist,
        date: this.date,
        imageURL: this.imageURL,
        xpos: this.xpos,
        ypos: this.ypos,
        width: this.width,
        height: this.height,
        zIndex: this.zIndex
      }},
      dataType: 'json',
      url: "/artworks"
    }).done(function(response){
      arID = response.id;
    }).fail(function(response){
      console.dir(response);
    });
  },
  update: function(){
    $.ajax({
      method: 'put',
      data: {artwork: {
        source: this.source,
        title: this.title,
        artist: this.artist,
        date: this.date,
        imageURL: this.imageURL,
        xpos: this.xpos,
        ypos: this.ypos,
        width: this.width,
        height: this.height,
        zIndex: this.zIndex
      }},
      dataType: 'json',
      url: "/artworks/"
    }).done(function(response){
      console.log('artwork saved');
    }).fail(function(response){
      console.dir(response);
    });
  }
};