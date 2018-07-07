var col = 1;

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
            var reverse = Object.keys(json.data).length;
            $.each(json.data, function(index, item) {
                var column = '.' + col;
                console.log(index);
                var image = encodeURI(item.link);
                $(column).append(function() {
                    return "<div class='box' id='img" + index + "'><img src='" + image +"'/></div>"
                    // return "<div class='box' style='background: url(" + image + ");'></div>";
                    // return "<div class=\"box\"><img src=\"" + item.link + "\"/></div>";
                });
                col++;
                if (col > 3) {
                    col = 1;
                }
                $('#img' + index).attr('background-image', image);
            });
        }
    });
});