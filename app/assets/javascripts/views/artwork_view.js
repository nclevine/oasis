function ArtworkView(artwork){
  this.artwork = artwork;
  var apiID = artwork.apiID, 
    source = artwork.source,
    title = artwork.title,
    artist = artwork.artist,
    date = artwork.date,
    imageURL = artwork.imageURL,
    xpos = artwork.xpos,
    ypos = artwork.ypos,
    width = artwork.width,
    height = artwork.height,
    zIndex = artwork.zIndex,
    saved = artwork.saved,
    $resizeContainer = $("<div class='resize-container' data-saved='" + saved
      + "' style='left: " + xpos
      + "px; top: " + ypos
      + "px; width: " + width
      + "px; height: "+ height
      + "px; z-index: " + zIndex
      + ";'></div>"),
    $image = $("<img id ='" + apiID
      + "' data-museum='" + source
      + "' data-title='" + title
      + "' data-artist='" + artist
      + "' data-date='" + date
      + "' src='" + imageURL
      + "' class='salon'>"),
    $deleteButton = $("<div class='delete-button' data-clickable='true'></div>");
  $resizeContainer.append($image, $deleteButton);
  $resizeContainer.resizable({
    handles: "se",
    aspectRatio: true,
    resize: function(event, ui){
      if(ui.element.attr('data-saved') == 'saved'){
        ui.element.attr('data-saved', 'update');
      };
    }
  });

  this.resizeContainer = $resizeContainer;
  $deleteButton.on('click', this.delete.bind(this));
}
ArtworkView.prototype = {
  delete: function(){
    if(this.resizeContainer.data('saved') != 'new'){
      this.artwork.delete();
    };
    this.resizeContainer.data('saved', 'deleted');
    this.resizeContainer.remove();
  }
}