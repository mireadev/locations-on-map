var selected = null, // Object of the element to be moved
    oldX, oldY, // Stores x & y coordinates of the mouse pointer
    map, wrap, //stores elements
    tags; //stores tags objects array


document.addEventListener('DOMContentLoaded', function () {
    //load map element
    map = document.getElementById('map');
    //load map-wrap element
    wrap = document.getElementById('map-wrap');

    //count deltas to set map to center
    var deltaX = (wrap.clientWidth - map.clientWidth) / 2;
    var deltaY = (wrap.clientHeight - map.clientHeight) / 2;

    //set it to center
    map.style.left = deltaX + 'px';
    map.style.top = deltaY + 'px';

    //load tags and draw them on map
    loadTags(function () {
        //and recount tags position
        moveTags(deltaX, deltaY);
    });

    // Bind the functions...
    map.addEventListener('mousedown', function (e) {
        initDrag(e, this);
    });

    document.addEventListener('mousemove', moveMap);
    document.addEventListener('mouseup', offDrag);
});


// Will be called when user starts dragging an element
function initDrag(e, elem) {
    //remember mouse coordinates
    oldX = document.all ? window.event.clientX : e.pageX;
    oldY = document.all ? window.event.clientY : e.pageY;

    // Store the object of the element which needs to be moved
    selected = elem;
}

// Destroy the object when we are done
function offDrag() {
    selected = null;
}
