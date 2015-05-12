function SalonWall(artworkCollection){
  this.artworkCollection = artworkCollection;
  this.$draggables = [];
  this.hangLoadedArtwork();
}
SalonWall.prototype = {
  hangLoadedArtwork: function(){
    this.$draggables = [];
    for (var i = 0; i < this.artworkCollection.artworks.length; i++){
      var artworkView = new ArtworkView(this.artworkCollection.artworks[i]);
      $artworkEditor.append(artworkView.resizeContainer);
      this.$draggables.push(Draggable.create(artworkView.resizeContainer, {
        onDragStartScope: artworkView.resizeContainer,
        onDragStart: function(){
          if(this.attr('data-saved') == 'saved'){
            this.attr('data-saved', 'update');
          };
        }
      }));
    };
  },
  addSearchImageToSalon: function(image){
    var $editableImage = image.clone(),
      apiID = $editableImage.prop('id'),
      source = $editableImage.data('museum'),
      title = $editableImage.data('title'),
      artist = $editableImage.data('artist'),
      date = $editableImage.data('date'),
      imageURL = $editableImage.prop('src'),
      width = $editableImage.prop('width'),
      height = $editableImage.prop('height'),
      artwork = new Artwork(apiID, source, title, artist, date, imageURL, 0, 0, width, height, 1000, 'new'),
      artworkView = new ArtworkView(artwork);
    $artworkEditor.append(artworkView.resizeContainer);
    this.$draggables.push(Draggable.create(artworkView.resizeContainer, {
      onDragStartScope: artworkView.resizeContainer,
      onDragStart: function(){
        if(this.attr('data-saved') == 'saved'){
          this.attr('data-saved', 'update');
        };
      }
    }));
    $('.ui-resizable-handle').attr('data-clickable', true);
    $artworkSearchPanel.css("display", "none");
    this.enterEditMode();
    TweenMax.to($artworkEditor, 0.1, {autoAlpha: 1});
  },
  makeArtworkObjects: function(){
    var artworks = []
    for (var i = this.$draggables.length - 1; i >= 0; i--) {
      var apiID = this.$draggables[i][0].target.firstElementChild.id,
        source = this.$draggables[i][0].target.firstElementChild.dataset.museum,
        title = this.$draggables[i][0].target.firstElementChild.dataset.title,
        artist = this.$draggables[i][0].target.firstElementChild.dataset.artist,
        date = this.$draggables[i][0].target.firstElementChild.dataset.date,
        imageURL = this.$draggables[i][0].target.firstElementChild.src,
        width = this.$draggables[i][0].target.firstElementChild.width,
        height = this.$draggables[i][0].target.firstElementChild.height,
        zIndex = this.$draggables[i][0].target.style.zIndex,
        saved = this.$draggables[i][0].target.dataset.saved;
      if(saved == "update"){
        var xpos = this.artworkCollection.artworks[i].xpos + this.$draggables[i][0].x,
          ypos = this.artworkCollection.artworks[i].ypos + this.$draggables[i][0].y;
      } else{
        var xpos = this.$draggables[i][0].x,
          ypos = this.$draggables[i][0].y;
      };
      var artwork = new Artwork(apiID, source, title, artist, date, imageURL, xpos, ypos, width, height, zIndex, saved);
      artworks.push(artwork);
    };
    return artworks;
  },
  saveWall: function(){
    var artworks = salonWall.makeArtworkObjects();
    for (var i = artworks.length - 1; i >= 0; i--) {
      if(artworks[i].saved == 'new'){
        artworks[i].save();
        salonWall.$draggables[i][0].target.setAttribute('data-saved', 'saved');
      } else if(artworks[i].saved == 'update'){
        artworks[i].update();
        salonWall.$draggables[i][0].target.setAttribute('data-saved', 'saved');
      } else if(artworks[i].saved == 'saved'){
        console.log('babys already saved');
      };
    };
    salonWall.exitEditMode();
  },
  enterEditMode: function(){
    $('.ui-resizable-handle').css('display', 'block');
    $('.delete-button').css('display', 'block');
    $('.enter-edit-mode').css('display', 'none');
    $('.exit-edit-mode').css('display', 'inline-block');
    for (var i = salonWall.$draggables.length - 1; i >= 0; i--) {
      salonWall.$draggables[i][0].enable();
    };
  },
  exitEditMode: function(){
    $('.ui-resizable-handle').css('display', 'none');
    $('.delete-button').css('display', 'none');
    $('.exit-edit-mode').css('display', 'none');
    $('.enter-edit-mode').css('display', 'inline-block');
    for (var i = salonWall.$draggables.length - 1; i >= 0; i--) {
      salonWall.$draggables[i][0].disable();
    };
  },
  loadEditorTools: function(){
    var $returnToSearch = $('.artwork-edit-panel .return-to-search');
    if(searchResults){
      $returnToSearch.text('Return To Search');
    };
    var $enterEditMode = $('.artwork-edit-panel .enter-edit-mode');
    var $exitEditMode = $('.artwork-edit-panel .exit-edit-mode');
    var $saveSalonWall = $('.artwork-edit-panel .save-salon-wall')
    $returnToSearch.on('click', function(){
      $artworkSearchPanel.css("display", "block");
      $resultsContainer.css("opacity", 1);
      $imageInspector.css("visibility", "hidden");
      TweenMax.to($artworkEditor, 0.1, {autoAlpha: 0});
    });
    $enterEditMode.on('click', this.enterEditMode);
    $exitEditMode.on('click', this.exitEditMode);
    $saveSalonWall.on('click', this.saveWall);
  }
};
