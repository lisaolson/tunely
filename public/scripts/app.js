/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */

$(document).ready(function() {
  console.log('app.js loaded!');
  $.ajax({
    method: 'GET',
    url: '/api/albums',
    success: renderMultipleAlbums
  });

  $('#album-form form').on('submit', function(e) {
    e.preventDefault();
    var formData = $(this).serialize();
    // console.log('formData', formData);
    $.post('/api/albums', formData, function(album) {
      // console.log('album after POST', album);
      renderAlbum(album);  //render the server's response
    });
    $(this).trigger("reset");
  });
});

function renderMultipleAlbums(albums) {
  albums.forEach(function(album) {
    // console.log(album);
    renderAlbum(album);
  });

  $('#albums').on('click', '.add-song', function(e) {
      console.log('add-song clicked!');
      var id = $(this).closest('.album').data('album-id'); // "5665ff1678209c64e51b4e7b"
      console.log('id',id);
      $('#songModal').data('album-id', id);
      $('#songModal').modal();
  });

  $('#saveSong').on('click', function(e){
    console.log('saveSong clicked');
    e.preventDefault();
    handleNewSongSubmit();
  });
}

function renderAlbum(album) {
  // console.log('rendering album', album);
  var albumHtml = $('#album-template').html();
  var albumsTemplate = Handlebars.compile(albumHtml);
  var html = albumsTemplate(album);
  $('#albums').prepend(html);
}

function handleNewSongSubmit() {
  var newSongName = $('#songName').val();
  var newSongTrackNumber = $('#trackNumber').val();
  console.log(newSongName, newSongTrackNumber);
  var albumId = $('#songModal').data('albumId');
  console.log(albumId);
}
