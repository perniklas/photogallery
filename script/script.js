/**
 * @author Per-Niklas Longberg
 *
 * JS/jQuery to dynamically populate image grid from a private Imgur album that I upload my photographs to.
 */

var imageIndex = [],
    imageLinks = [];

var category = {
    'all': imageLinks,
    'landscape': [],
    'portrait': [],
    'street': []
},
headers = {
    'all': "and this is both web development practice as well as a gallery of photographs that I've " +
    "gone and done.",
    'landscape': 'and here are some landscapes for you to enjoy, you\'re very welcome.',
    'portrait': 'and these are some people that I know (and a cat).',
    'street': 'and you\'re looking at some streets and buildings I\'ve photographed.',
    'about': 'and this should answer some questions. I hope.'
};


/**
 * Page initializes (unless you're edgy and have disabled javascript).
 */
$(document).ready(function() {
    $('#description').text(headers.all);

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
                if (item != null && item !== undefined) {
                    imageIndex.push(index);
                    imageLinks.push(encodeURI(item.link));
                    category[item.description].push(item.link);
                }
            });
            $('#all').addClass('pressed'); // On ready, the first category presented is All.
            updateGallery(imageLinks);
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
    var col = 1;
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
    buttonClickListener();
    lightboxClickListener();
}

/**
 * In case the user clicks an image - listen for the click and enable lightbox with clicked image if click.
 */
function lightboxClickListener() {
    $('.image').click(function () {
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

function buttonClickListener() {
    $('.catgButton').click(function () {
        updateContentOnClick(this)
    });

    $('#about').click(function () {
        updateContentOnClick(this)
    });

    function updateContentOnClick(clickedItem) {
        if (!clickedItem.classList.contains('pressed')) {
            $('.box').remove();
            $('.aboutText').remove();
            $('.catgButton, #about').removeClass('pressed');
            $(clickedItem).addClass('pressed');
            $('#description').text(headers[clickedItem.id]);
            if(clickedItem.id === "about") {
                $.getJSON('../about.json', function(data) {
                    someoneClickedAbout(formatJSONtoHTML(data));
                });
            } else {
                updateGallery(category[clickedItem.id]);
            }
        }
    }
}

function formatJSONtoHTML(json) {

    var strings = [];
    var camList = [
        '<ul class="aboutText">Cameras'
    ];
    getStrings(json);

    function getStrings(json) {
        $.each(json, function(item) {
            if (item === 'cameras') {
                $.each(json[item], function (camera) {
                    camList.push('<li>' + json[item][camera] + '</li>');
                });
            } else if (typeof json[item] === "object") {
                // getStrings(json[item]);  TODO make recursiveness work
                $.each(json[item], function(subitem) {
                    strings.push('<p class="aboutText">' + json[item][subitem] + '</p>');
                });
            }
        });
    }
    camList.push('</ul>');

    return {text: strings.join(""), cameras: camList.join("")}
}

function someoneClickedAbout(about) {
    $.each(about, function(item) {
        console.log(about[item]);
        $('#gallery').append(about[item]);
    });
}