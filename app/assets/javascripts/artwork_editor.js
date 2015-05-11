var $artworkEditor = $('.artwork-edit-panel');
var $draggables = [];

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
  var $exitEditMode = $('.artwork-edit-panel .exit-edit-mode')
  $returnToSearch.on('click', function(){
    $artworkSearchPanel.css("display", "block");
    $resultsContainer.css("opacity", 1);
    $imageInspector.css("visibility", "hidden");
    TweenMax.to($artworkEditor, 0.1, {autoAlpha: 0});
  });
  $enterEditMode.on('click', enterEditMode);
  $exitEditMode.on('click', exitEditMode);
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
  
}