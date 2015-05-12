function Artwork(apiID, source, title, artist, date, imageURL, xpos, ypos, width, height, zIndex, saved){
  this.apiID = apiID;
  this.source = source;
  this.title = title;
  this.artist = artist;
  this.date = date;
  this.imageURL = imageURL;
  this.xpos = xpos;
  this.ypos = ypos;
  this.width = width;
  this.height = height;
  this.zIndex = zIndex;
  this.saved = saved;
}
Artwork.prototype = {
  save: function(){
    $.ajax({
      method: 'post',
      data: {artwork: {
        apiID: this.apiID,
        source: this.source,
        title: this.title,
        artist: this.artist,
        date: this.date,
        imageURL: this.imageURL,
        xpos: this.xpos,
        ypos: this.ypos,
        width: this.width,
        height: this.height,
        zIndex: this.zIndex
      }},
      dataType: 'json',
      url: '/artworks'
    }).done(function(response){
      console.log('artwork saved');
    }).fail(function(response){
      console.dir(response);
    });
  },
  update: function(){
    $.ajax({
      method: 'put',
      data: {artwork: {
        apiID: this.apiID,
        source: this.source,
        title: this.title,
        artist: this.artist,
        date: this.date,
        imageURL: this.imageURL,
        xpos: this.xpos,
        ypos: this.ypos,
        width: this.width,
        height: this.height,
        zIndex: this.zIndex
      }},
      dataType: 'json',
      url: '/artworks/0'
    }).done(function(response){
      console.log('artwork updated');
    }).fail(function(response){
      console.dir(response);
    });
  },
  delete: function(){
    $.ajax({
      method: 'delete',
      data: {artwork: {
        apiID: this.apiID
      }},
      dataType: 'json',
      url: '/artworks/0'
    }).done(function(response){
      console.log('artwork deleted');
    })
  }
};
