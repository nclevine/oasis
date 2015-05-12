var $artworkEditor;
var $resizeHandles;
var artworkCollection;
var salonWall;
var searchResults;

$(document).ready(function() {
  $artworkEditor = $('.artwork-edit-panel');
  $resizeHandles = $('.ui-resizable-handle');
  artworkCollection = new ArtworkCollection();
  salonWall = new SalonWall(artworkCollection);
  salonWall.loadEditorTools();
  searchResults = '';
});
