var $artworkEditor;
var $resizeHandles;
var artworkCollection;
var salonWall;
var searchResults;
var $artworkSearchPanel;
var $searchTerm;
var $artworkSource;
var $searchButton;
var $showSalonWall;
var $resultsContainer;
var $imageInspector;
var $loading;

$(document).ready(function() {
  $artworkEditor = $('.artwork-edit-panel');
  $resizeHandles = $('.ui-resizable-handle');
  $artworkSearchPanel = $('.artwork-search-panel');
  $searchTerm = $('.art-search-input');
  $artworkSource = $('.artwork-source');
  $searchButton = $('.artwork-search-button');
  $showSalonWall = $('.show-salon-wall')
  $resultsContainer = $('.results-container');
  $imageInspector = $('.image-inspector');
  $loading = $('.loading');
  console.log($artworkEditor);
  console.log($resizeHandles);
  artworkCollection = new ArtworkCollection();
  salonWall = new SalonWall(artworkCollection);
  salonWall.loadEditorTools();
  searchResults = '';

  $searchButton.on('click', function(){
    var source = $artworkSource.val();
    var searchTerm = $searchTerm.val();
    if(source == 'met'){
      metCollectionSearch(searchTerm);
    } else if(source == 'vam'){
      vamCollectionSearch(searchTerm);
    } else if(source == 'rijks'){
      rijksCollectionSearch(searchTerm);
    } else if(source == 'bk'){
      bkCollectionSearch(searchTerm);
    } else if(source == 'coop'){
      coopCollectionSearch(searchTerm);
    } else if(source == 'tumblr'){
      tumblrCollectionSearch(searchTerm);
    };
  });

  $showSalonWall.on('click', function(){
    $artworkSearchPanel.css("display", "none");
    TweenMax.to($artworkEditor, 0.1, {autoAlpha: 1});
  });
});
