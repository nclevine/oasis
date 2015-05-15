function SalonWall(artworkCollection){
  this.artworkCollection = artworkCollection;
  this.$draggables = [];
  this.bottomMost = 0;
  this.rightMost = 0;
  this.topMost = 1000;
  this.hangLoadedArtwork();
}
SalonWall.prototype = {
  hangLoadedArtwork: function(){
    this.$draggables = [];
    for (var i = 0; i < this.artworkCollection.artworks.length; i++){
      var artworkView = new ArtworkView(this.artworkCollection.artworks[i]);
      this.compareEdges(artworkView, true);
      this.compareZIndex(artworkView);
      $artworkEditor.append(artworkView.resizeContainer);
      this.$draggables.push(Draggable.create(artworkView.resizeContainer, {
        onDragStartScope: artworkView.resizeContainer,
        onDragStart: function(){
          if(this.attr('data-saved') == 'saved'){
            this.attr('data-saved', 'update');
          };
        },
        autoScroll: 1
      }));
    };
    $artworkEditor.css('width', this.rightMost + 100);
    $artworkEditor.css('height', this.bottomMost + 100);
  },
  addSearchImageToSalon: function(image){
    var $editableImage = image.clone(),
      apiID = $editableImage.prop('id'),
      source = $editableImage.data('museum');
    if(source == 'tumblr'){
      var title = $('.tumblr-title-input-' + apiID).val();
    } else{
      var title = $editableImage.data('title');
    };
      var artist = $editableImage.data('artist'),
      date = $editableImage.data('date'),
      imageURL = $editableImage.prop('src'),
      width = $editableImage.prop('width'),
      height = $editableImage.prop('height'),
      artwork = new Artwork(apiID, source, title, artist, date, imageURL, 0, 0, width, height, this.topMost + 1, 'new'),
      artworkView = new ArtworkView(artwork);
    $artworkEditor.append(artworkView.resizeContainer);
    this.$draggables.push(Draggable.create(artworkView.resizeContainer, {
      onDragStartScope: artworkView.resizeContainer,
      onDragStart: function(){
        if(this.attr('data-saved') == 'saved'){
          this.attr('data-saved', 'update');
        };
      },
      autoScroll: 1
    }));
    $('.ui-resizable-handle').attr('data-clickable', true);
    $artworkEditor.css('display', 'block');
    $editorTools.css('display', 'block');
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
  compareEdges: function(artwork, isView){
    if(isView){
      var rightEdge = parseInt(artwork.resizeContainer.css('left')) + parseInt(artwork.resizeContainer.css('width'));
      var bottomEdge = parseInt(artwork.resizeContainer.css('top')) + parseInt(artwork.resizeContainer.css('height'));
    } else{
      var rightEdge = artwork.xpos + artwork.width;
      var bottomEdge = artwork.ypos + artwork.height;
    };
    if(rightEdge > salonWall.rightMost){
      salonWall.rightMost = rightEdge;
    };
    if(bottomEdge > salonWall.bottomMost){
      salonWall.bottomMost = bottomEdge;
    };
  },
  compareZIndex: function(artworkView){
    var zzz = artworkView.resizeContainer.css('z-index');
    if(zzz > salonWall.topMost){
      salonWall.topMost = zzz;
    };
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
      salonWall.compareEdges(artworks[i], false);
    };
    salonWall.exitEditMode();
    $artworkEditor.css('width', salonWall.rightMost + 100);
    $artworkEditor.css('height', salonWall.bottomMost + 100);
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
    var $returnToSearch = $('.return-to-search');
    if(searchResults){
      $returnToSearch.text('Return To Search');
    };
    var $enterEditMode = $('.enter-edit-mode'),
      $exitEditMode = $('.exit-edit-mode'),
      $saveSalonWall = $('.save-salon-wall'),
      $enterInspectMode = $('.enter-inspect-mode'),
      $exitInspectMode = $('.exit-inspect-mode'),
      $zoomOut = $('.zoom-out'),
      $zoomIn = $('.zoom-in');
    $returnToSearch.on('click', this.returnToSearch);
    $enterEditMode.on('click', this.enterEditMode);
    $exitEditMode.on('click', this.exitEditMode);
    $saveSalonWall.on('click', this.saveWall);
    $enterInspectMode.on('click', this.enterInspectMode);
    $exitInspectMode.on('click', this.exitInspectMode);
    $zoomOut.on('click', this.zoomOut);
    $zoomIn.on('click', this.zoomIn);
  },
  enterInspectMode: function(){
    $('.enter-inspect-mode').css('display', 'none');
    $('.exit-inspect-mode').css('display', 'inline-block');
    var $salonImages = $('.salon');
    for (var i = 0; i < $salonImages.length; i++){
      var id = $salonImages[i].id,
        title = $salonImages[i].dataset.title,
        artist = $salonImages[i].dataset.artist,
        date = $salonImages[i].dataset.date,
        source = $salonImages[i].dataset.museum;
      if(source == 'met'){
        source = 'Metropolitan Museum of Art';
      } else if(source == 'vam'){
        source = 'Victoria & Albert Museum';
      } else if(source == 'rijks'){
        source = 'Rijksmuseum';
      } else if(source == 'bk'){
        source = 'Brooklyn Museum';
      } else if(source == 'coop'){
        source = 'Smithsonian Cooper Hewitt';
      } else if(source == 'tumblr'){
        source = 'Tumblr';
      };
      var $imageInfo = $("<div class='image-info' id='" + id + "-info'><p class='title'><span>Title: </span>" + title
        + "</p><p class='artist'><span>Artist: </span>" + artist
        + "</p><p class='date'><span>Dated: </span>" + date
        + "</p><p class='source'><span>Courtesy of: </span>" + source
        + "</p></div>");
      $artworkEditor.append($imageInfo);
      $($salonImages[i].parentNode).on('click', {
        divID: id + '-info'
      }, displayInfoDiv).on('mouseout', {
        divID: id + '-info'
      }, removeInfoDiv);
    };
  },
  exitInspectMode: function(){
    $('.exit-inspect-mode').css('display', 'none');
    $('.enter-inspect-mode').css('display', 'inline-block');
    var $salonImages = $('.salon'); 
    $($salonImages.parents()).off();
    $('.image-info').remove();
  },
  returnToSearch: function(){
    $editorTools.css('display', 'none');
    $artworkSearchPanel.css("display", "block");
    $resultsContainer.css("opacity", 1);
    $imageInspector.css("visibility", "hidden");
    TweenMax.to($artworkEditor, 0.1, {autoAlpha: 0});
    window.setTimeout(function(){
      $artworkEditor.css('display', 'none')
    }, 100);
  },
  zoomOut: function(){
    $('.enter-inspect-mode').css('display', 'none');
    $('.zoom-out').css('display', 'none');
    $('.zoom-in').css('display', 'inline-block');
    var fitScale = window.innerWidth / $artworkEditor.width();
    TweenMax.to(window, 0.5, {scrollTo: {x:0, y:0}});
    TweenMax.to($artworkEditor, 1, {scaleX: fitScale, scaleY: fitScale, transformOrigin: 'left top'});
  },
  zoomIn: function(){
    $('.enter-inspect-mode').css('display', 'inline-block');
    $('.zoom-in').css('display', 'none');
    $('.zoom-out').css('display', 'inline-block');
    TweenMax.to($artworkEditor, 1, {scaleX: 1, scaleY: 1});
  }
};

function displayInfoDiv(event){
  var $div = $("#" + event.data.divID);
  var $image = $(this);
  console.log($image.position());
  $div.css({
    top: $image.position().top,
    left: $image.position().left,
    width: $image.width(),
    height: $image.height()
  });
  $($div.children()).css({
    marginLeft: ($image.width() - 200) / 2,
    marginRight: ($image.width() - 200) / 2,
    marginTop: 10,
    marginBottom: 10
  });
  $($div.children().first()).css('marginTop', 40)
  TweenMax.fromTo($div, 0.3, {scaleX: 0.2, scaleY: 0.2}, {display: 'block', scaleX: 1, scaleY: 1});
};
function removeInfoDiv(event){
  var $div = $('#' + event.data.divID);
  TweenMax.to($div, 0.3, {display: 'none'});
}
