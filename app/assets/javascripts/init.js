var $artworkEditor;
var $editorTools;
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
var $newSpaceForm;


$(document).ready(initialize);
$(document).on('page:load', initialize);

function initialize(){
  $artworkEditor = $('.artwork-edit-panel');
  $editorTools = $('.edit-tools');
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
  $newSpaceForm = $('.new-space-form');
  $('.new-space-form-show').on('click', function(){
    $newSpaceForm.css("visibility", "visible");
  });
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
    $editorTools.css('display', 'block');
    TweenMax.to($artworkEditor, 0.2, {autoAlpha: 1});
  });

  $('.nav-button').on('click', function(){
    if($('.nav-button').hasClass('nav-open')){
      TweenMax.to($navigation, 0.2, {width: 115, height: 130});
      TweenMax.to($('.navigation a, .navigation button'), 0.1, {autoAlpha: 1, delay: 0.2});
      $('.nav-button').toggleClass('nav-open nav-close');
    } else{      
      TweenMax.to($('.navigation a, .navigation button'), 0.1, {autoAlpha: 0});
      TweenMax.to($navigation, 0.2, {width: 25, height: 25, delay: 0.1});
      $('.nav-button').toggleClass('nav-open nav-close');
    }
  });

  $('.hide-tools').on('click', function(){
    if($(this).hasClass('hide')){
      TweenMax.to($editorTools, 0.1, {autoAlpha: 0});
      // $editorTools.css('display', 'none');
      $(this).html('Show Tools');
      $(this).toggleClass('hide show');
    } else{
      TweenMax.to($editorTools, 0.1, {autoAlpha: 1});
      // $editorTools.css('display', 'block');
      $(this).html('Hide Tools');
      $(this).toggleClass('hide show');
    }
  });

  $('.edit-profile').on('click', function(){
    TweenMax.fromTo($('.edit-profile-form'), 0.2, {autoAlpha: 0, scaleX: 0.2, scaleY: 0.2}, {autoAlpha: 1, scaleX: 1, scaleY: 1, transformOrigin: 'center'})
  })
}
