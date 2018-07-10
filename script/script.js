/**
 * @author Per-Niklas Longberg
 *
 * JS/jQuery to dynamically populate image grid from a private Imgur album that I upload my photographs to.
 */

var albumURL = '';
var imageIndex = [];
var imageLinks = [];
var category = {
    'landscape': [],
    'portrait': [],
    'street': []
};

/**
 * Page initializes (unless you're edgy and have disabled javascript).
 */
$(document).ready(function() {
    $('#lightbox').hide();

    /**
     * HTTP request to get the JSON with the links to the images from Imgur.
     */
    $.ajax({
        type: 'GET',
        url: 'https://api.imgur.com/3/album/cXUGL0p/images',
        dataType: 'text',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Client-ID 2472ea8b7092738')
        },
        success: function (data) {
            var json = JSON.parse(data);
            // TODO make images appear in reverse order - newest first instead of first first.
            var totalPictures = Object.keys(json.data).length - 1;

            /**
             * Stores the image links, categories and image indexes for use in populating HTML
             */
            $.each(json.data, function (index, item) {
                imageIndex.push(index);
                imageLinks.push(encodeURI(item.link));
                category[item.description].push(item.link);
            });
            updateGallery(imageLinks);

            /**
             * On click listener for the images - opens up the lightbox with the clicked image
             */

            $('#catgAll').click(function () {
                $('.box').remove();
                updateGallery(imageLinks);
            });

            $('#catgLand').click(function () {
                $('.box').remove();
                console.log(category.landscape);
                updateGallery(category.landscape);
            });

            $('#catgPort').click(function () {
                $('.box').remove();
                console.log(category.portrait);
                updateGallery(category.portrait);
            });

            $('#catgStreet').click(function () {
                $('.box').remove();
                updateGallery(category.street);
            });
        }
    });
});

/**
 * Appends the images to the gallery - iterates through each of the 3 column for the whole image bunch.
 *
 * @param listOfImages:
 * An array containing image links.
 */
function updateGallery(listOfImages) {
    col = 1;
    for (var x in listOfImages) {
        var column = '.' + col;
        $(column).append("" +
            "<div class='box'>" +
            "<img id='img" + imageIndex[x] + "' src='" + listOfImages[(listOfImages.length-1) - x] + "' class='image'/>" +
            "</div>");
        col++;
        if (col > 3) {
            col = 1;
        }
    }
    triggerLightbox();
}

function triggerLightbox() {
    $('.image').click(function () {
        var img = $(this).attr('src');
        $('#some').fadeOut();
        $('#focus').attr('src', img);
        $('#lightbox').show();

        /**
         * On click listener for the lightbox - closes lightbox on click.
         */
        $('#lightbox').click(function () {
            $('#lightbox').hide();
            $('#some').fadeIn();
            $('#focus').attr('src', ' ');
        });
    });
}