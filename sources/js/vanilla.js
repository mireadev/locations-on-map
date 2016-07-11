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

//return computed value
function getStyleValue(el, style) {
    return getStyle(el)[style];
}

//return computed styles
function getStyle(el) {
    return window.getComputedStyle ? getComputedStyle(el, '') : el.currentStyle;
}

//add class
function addClass(el, className) {
    if (el.classList)
        el.classList.add(className);
    else
        el.className += ' ' + className;
}

//remove class
function removeClass(el, className) {
    if (el.classList)
        el.classList.remove(className);
    else
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}

//toggle class
function toggleClass(el, className) {
    if (el.classList) {
        el.classList.toggle(className);
    } else {
        var classes = el.className.split(' ');
        var existingIndex = -1;
        for (var i = classes.length; i--;) {
            if (classes[i] === className)
                existingIndex = i;
        }

        if (existingIndex >= 0)
            classes.splice(existingIndex, 1);
        else
            classes.push(className);

        el.className = classes.join(' ');
    }
}

//hides element
function hide(el, withOpacity) {
    if (withOpacity) {
        addClass(el, 'hide-opacity');
    } else {
        addClass(el, 'hide');
    }
}

//show element
function show(el) {
    removeClass(el, 'hide');
    removeClass(el, 'hide-opacity');
}

//find if element has class
function hasClass(el, className) {
    if (el.classList)
        return el.classList.contains(className);
    else
        return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
}