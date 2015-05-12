var $artworkEditor;
var $resizeHandles;
var artworkCollection;
var salonWall;
var searchResults;

$(document).ready(function() {
  $artworkEditor = $('.artwork-edit-panel');
  $resizeHandles = $('.ui-resizable-handle');
  console.log($artworkEditor);
  console.log($resizeHandles);
  artworkCollection = new ArtworkCollection();
  salonWall = new SalonWall(artworkCollection);
  salonWall.loadEditorTools();
  searchResults = '';
  $artworkEditor.ready(function(){
    console.log($('.resize-container'));
    console.log($('.ui-resizable-handle'));
  });
  // $('.ui-resizable-handle').attr('data-clickable', true);
  // $draggables = [];
  // var artworkObjects = [];
});

// function loadEditorTools(){
//   var $returnToSearch = $('.artwork-edit-panel .return-to-search');
//   if(searchResults){
//     $returnToSearch.text('Return To Search');
//   };
//   var $enterEditMode = $('.artwork-edit-panel .enter-edit-mode');
//   var $exitEditMode = $('.artwork-edit-panel .exit-edit-mode');
//   var $saveSalonWall = $('.artwork-edit-panel .save-salon-wall')
//   $returnToSearch.on('click', function(){
//     $artworkSearchPanel.css("display", "block");
//     $resultsContainer.css("opacity", 1);
//     $imageInspector.css("visibility", "hidden");
//     TweenMax.to($artworkEditor, 0.1, {autoAlpha: 0});
//   });
//   $enterEditMode.on('click', salonWall.enterEditMode);
//   $exitEditMode.on('click', salonWall.exitEditMode);
//   $saveSalonWall.on('click', salonWall.saveSalonWall);
// };
