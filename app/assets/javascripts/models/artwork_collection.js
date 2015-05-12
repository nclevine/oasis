function ArtworkCollection(){
  this.artworks = [];
  this.loadArtworks();
}
ArtworkCollection.prototype = {
  loadArtworks: function(){
    $.ajax({
      method: 'get',
      dataType: 'json',
      url: '/artworks'
    }).done(function(response){
      this.constructArtworks(response);
      salonWall.hangLoadedArtwork();
      salonWall.exitEditMode();
      $('.ui-resizable-handle').attr('data-clickable', true);
    }.bind(this));
  },
  constructArtworks: function(response){
    this.artworks = [];
    for (var i = response.length - 1; i >= 0; i--) {
      var artwork = new Artwork(
        response[i].apiID,
        response[i].source,
        response[i].title,
        response[i].artist,
        response[i].date,
        response[i].imageURL,
        response[i].xpos,
        response[i].ypos,
        response[i].width,
        response[i].height,
        response[i].zIndex,
        'saved'
      );
      this.artworks.push(artwork);
    };
  }
};