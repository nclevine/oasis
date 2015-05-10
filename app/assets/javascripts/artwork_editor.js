var $artworkEditor = $('.artwork-edit-panel');

function enterArtworkEditor(image){
  var editableImage = image.clone();
  $artworkEditor.html(editableImage);
  var dragImage = Draggable.create(editableImage);
  loadArtworkEditorTools();
  console.log($artworkEditor);
  TweenMax.to($artworkEditor, 0.3, {autoAlpha: 1});
  $artworkSearchPanel.css("visibility", "hidden");
  console.log(dragImage);
};

function loadArtworkEditorTools(){
  var $returnToSearch = $("<button>Return To Search</button>")
  $returnToSearch.on('click', function(){
    $artworkSearchPanel.css("visibility", "visible");
    TweenMax.to($artworkEditor, 0.3, {autoAlpha: 0});
  });
  var $addToWall = $("<button>Add To Wall</button>");
  $addToWall.on('click', function(){
    addToWall(dragImage);
  });
  $artworkEditor.append($returnToSearch, $addToWall);
};

function addToWall(image){

};