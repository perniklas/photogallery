/**
 * @author Per-Niklas Longberg
 *
 * JS/jQuery to dynamically populate image grid from a private Imgur album that I upload my photographs to.
 */

var col = 1;
var imageIndex = [];
var imageLinks = [];

$(document).ready(function() {
    $('#lightbox').hide();
    $.ajax({
        type: 'GET',
        url: 'https://api.imgur.com/3/album/cXUGL0p/images',
        dataType: 'text',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', 'Client-ID 2472ea8b7092738')
        },
        success: function(data) {
            var json = JSON.parse(data);
            // TODO make images appear in reverse order - newest first instead of first first.
            var totalPictures = Object.keys(json.data).length - 1;
            $.each(json.data, function(index, item) {
                imageIndex.push(index);
                imageLinks.push(encodeURI(item.link));
            });

            for (var x in imageLinks) {
                var column = '.' + col;
                $(column).append("" +
                    "<div class='box'>" +
                    "<img id='img" + imageIndex[x] + "' src='" + imageLinks[totalPictures - x] +"' class='image'/>" +
                    "</div>");
                col++;
                if (col > 3) { col = 1; }
            }

            $('.image').click(function() {
                var img = $(this).attr('src');
                $('#some').fadeOut();
                $('#focus').attr('src', img);
                $('#lightbox').show();

                $('#lightbox').click(function() {
                    $('#lightbox').hide();
                    $('#some').fadeIn();
                    $('#focus').attr('src', ' ');
                });
            });
        }
    });
});