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
var $navigation;
var $showNav;

$(document).ready(initialize);
$(document).on('page:load', initialize);

function initialize(){
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
  $navigation = $('.navigation');
  $showNav = $('.show-nav');
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
    $artworkEditor.css('display', 'block');
    TweenMax.to($artworkEditor, 0.2, {autoAlpha: 1});
  });

  $showNav.on('click', function(){
    TweenMax.to($showNav, 0.1, {autoAlpha: 0});
    TweenMax.to($navigation, 0.1, {autoAlpha: 1});
    TweenMax.to($navigation, 0.2, {width: 200, height: 200, delay: 0.1});
  });

  $('.close-nav').on('click', function(){
    TweenMax.to($navigation, 0.2, {width: 30, height: 30});
    TweenMax.to($showNav, 0.1, {autoAlpha: 1, delay: 0.2});
    TweenMax.to($navigation, 0.1, {autoAlpha: 0, delay: 0.2});
  });
}
