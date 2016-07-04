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