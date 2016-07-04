//load json file
function loadJson(url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            callback(JSON.parse(request.responseText));
        } else {
            // We reached our target server, but it returned an error
            callback(false, request.status);
        }
    };

    request.onerror = function (err) {
        // There was a connection error of some sort
        callback(false, err);
    };

    request.send();
}

//creates html element
function createElement(type, classes) {
    //if there is no classes
    if (!classes) {
        classes = '';
    }

    var elem = document.createElement(type);
    //add classes to elem
    elem.className = classes;

    return elem;
}