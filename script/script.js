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
var headers = {
    'all': "and this is both web development practice as well as a gallery of photographs that I've " +
    "gone and done.",
    'landscape': 'and here are some landscapes for you to enjoy, you\'re very welcome.',
    'portrait': 'and these are some people that I know (and a cat).',
    'street': 'and you\'re looking at some streets and buildings I\'ve photographed.'
}

/**
 * Page initializes (unless you're edgy and have disabled javascript).
 */
$(document).ready(function() {
    $('#description').text("and this is both web development practice as well as a gallery of photographs that I've " +
        "gone and done.");

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
            /**
             * Stores the image links, categories and image indexes for use in populating HTML
             */
            $.each(json.data, function (index, item) {
                imageIndex.push(index);
                imageLinks.push(encodeURI(item.link));
                category[item.description].push(item.link);
            });
            $('#catgAll').addClass('pressed'); // On ready, the first category presented is All.
            updateGallery(imageLinks);
            categoryClickListener();
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
    categoryClickListener();
    lightboxClickListener();
}

/**
 * In case the user clicks an image - listen for the click and enable lightbox with clicked image if click.
 */
function lightboxClickListener() {
    $('.image').click(function () {
        console.log();
        $('#some').hide();
        $('#focus').attr('src', $(this).attr('src'));
        $('#main').css('overflow', 'hidden');
        $('#lightbox').show();

        /**
         * On click listener for the lightbox - closes lightbox on click.
         */
        $('#lightbox').click(function () {
            $('#lightbox').hide();
            $('#some').fadeIn();
            $('#main').css('overflow', 'auto');
            $('#focus').attr('src', ' ');
        });

        /**
         * On click listener for arrow keys - right for next, left for previous
         */
        $('#lightbox').keydown(function(key) {
            console.log(key);
        });
    });
}

function categoryClickListener() {
    $('#catgAll').click(function () {
        $('.box').remove();
        $('.catgButton').removeClass('pressed');
        $('#catgAll').addClass('pressed');
        $('#description').text(headers.all);
        updateGallery(imageLinks);
    });

    $('#catgLand').click(function () {
        $('.box').remove();
        $('.catgButton').removeClass('pressed');
        $('#catgLand').addClass('pressed');
        $('#description').text(headers.landscape);
        updateGallery(category.landscape);
    });

    $('#catgPort').click(function () {
        $('.box').remove();
        $('.catgButton').removeClass('pressed');
        $('#catgPort').addClass('pressed');
        $('#description').text(headers.portrait);
        updateGallery(category.portrait);
    });

    $('#catgStreet').click(function () {
        $('.box').remove();
        $('.catgButton').removeClass('pressed');
        $('#catgStreet').addClass('pressed');
        $('#description').text(headers.street);
        updateGallery(category.street);
    });
}