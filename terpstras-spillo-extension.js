javascript: (function() {
    function bookmark(url) {
        var location = 'spillo:///bookmark?';
        var description = getSelText();
        if (description === "") {
            description = getMetaDescription();
        }
        location += 'url' + '=' + encodeURIComponent(url);
        location += '&';
        location += 'title' + '=' + encodeURIComponent(document.title);
        location += '&';
        location += 'desc' + '=' + encodeURIComponent(description);
        alert(location);
        document.location.href = location;
    }

    function getSelText() {
        var txt = "";
        if (window.getSelection) {
            txt = window.getSelection();
        } else if (document.getSelection) {
            txt = document.getSelection();
        } else if (document.selection) {
            txt = document.selection.createRange().text;
        } else return;
        return txt.toString();
    }

    function getMetaDescription() {
        var meta = document.getElementsByTagName("meta");
        for (var idx = 0; idx < meta.length; idx++) {
            if (meta[idx].name.toLowerCase() === "description") {
                return meta[idx].content;
            }
        }
        return "";
    }
    bookmark(document.location.href)
})()