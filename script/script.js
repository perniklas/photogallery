var col = 1;
var imageIndex = [];
var imageLinks = [];

$(document).ready(function() {
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
                imageIndex.push( '#img' + index);
                imageLinks.push(encodeURI(item.link));
            });
            addByNewest(totalPictures);
            setImageListeners();
        }
    });
});

function addByNewest(totalPictures) {
    for (var x in imageLinks) {
        var column = '.' + col;
        $(column).append(function() {
            return "<div class='box' id='img" + imageIndex[x] + "'><img src='" + imageLinks[totalPictures - x] +"'/></div>"
        });
        col++;
        if (col > 3) { col = 1; }
    }
}

function setImageListeners() {
    $('.box').click(function () {
        // make lightbox do the thing.
        console.log('this is image number ' + imageIndex[this.id]);
    });
}