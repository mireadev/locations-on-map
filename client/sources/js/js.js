var selected = null, // Object of the element to be moved
    oldX, oldY, // Stores x & y coordinates of the mouse pointer
    map, wrap, menu, tagsInput, //stores elements
    locations, //stores locations objects array
    lastSearch; //stores last search string


document.addEventListener('DOMContentLoaded', function () {
    //load map element
    map = document.getElementById('map');
    //load map-wrap element
    wrap = document.getElementById('map-wrap');
    //load menu element
    menu = document.getElementById('menu');
    //load tags input
    tagsInput = document.getElementById('input-tags');

    //wait until map image will be loaded
    map.addEventListener('load', function () {
        //count deltas to set map to center
        var deltaX = (wrap.clientWidth - map.clientWidth) / 2;
        var deltaY = (wrap.clientHeight - map.clientHeight) / 2;

        //set it to center
        map.style.left = deltaX + 'px';
        map.style.top = deltaY + 'px';

        //load locations and draw them on map
        loadLocations();

        //hide loader
        hideLoader();
    });

    // Bind the functions for map
    map.addEventListener('mousedown', function (e) {
        initDrag(e, this);
    });
    document.addEventListener('mousemove', moveMap);
    document.addEventListener('mouseup', offDrag);

    // bind tags search
    tagsInput.addEventListener('keyup', searchTags);
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

//hide loader
function hideLoader() {
    hide(document.getElementById('dark'));
    hide(document.getElementById('loader'));
}