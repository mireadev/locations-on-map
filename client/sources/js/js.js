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

// Will be called when user dragging an element
function moveMap(e) {
    //get new mouse coordinates
    var newX = document.all ? window.event.clientX : e.pageX;
    var newY = document.all ? window.event.clientY : e.pageY;

    //if we have active element
    if (selected !== null) {
        //count deltas(old mouse coordinates minus new mouse coordinates)
        var deltaX = newX - oldX;
        var deltaY = newY - oldY;

        //remember new mouse coordinates
        oldX = newX;
        oldY = newY;

        //count new coordinates for map
        var newMapX = selected.offsetLeft + deltaX;
        var newMapY = selected.offsetTop + deltaY;

        //fix for map not going out from the left border
        if (newMapX > 0) {
            newMapX = 0;

            //recount delta
            deltaX = -1 * selected.offsetLeft;
        }

        //fix for map not to go out from the top border
        if (newMapY > 0) {
            newMapY = 0;

            //recount delta
            deltaY = -1 * selected.offsetTop;
        }

        //check if our new position isn't outside the wrap
        if ((selected.width - Math.abs(newMapX) >= wrap.clientWidth) && (selected.height - Math.abs(newMapY) >= wrap.clientHeight)) {
            //set new position to map
            setNewPos(map, newMapX, newMapY);

            //set new position to all tags on map
            moveTags(deltaX, deltaY);
        }
    }
}

// Destroy the object when we are done
function offDrag() {
    selected = null;
}

//count new position of element
function countNewPos(el, deltaX, deltaY) {
    var newX = el.offsetLeft + deltaX;
    var newY = el.offsetTop + deltaY;

    //set new position to element
    setNewPos(el, newX, newY);
}

//Set new position to element
function setNewPos(el, newX, newY) {
    el.style.left = newX + 'px';
    el.style.top = newY + 'px';
}

//Sets new position for each tag
function moveTags(deltaX, deltaY) {
    //for each tag
    for (var index in tags) {
        countNewPos(tags[index].div, deltaX, deltaY);
    }
}

//load tags and set them on map
function loadTags(callback) {
    loadJson('tags.json', function (data) {
        if (data) {
            tags = data.tags;

            //draw tags
            for (var index in tags) {
                //save div
                tags[index].div = createTagDiv(index, tags[index]);

                //draw it on page
                wrap.appendChild(tags[index].div);
            }

            callback();
        }
    });
}

//creates div tag
function createTagDiv(id, tag) {
    //create div for tag
    var div = document.createElement('div');
    div.className = 'tag';
    div.id = 'tag' + id;
    div.style.left = tag.x + 'px';
    div.style.top = tag.y + 'px';

    //create tag icon
    var icon = document.createElement('i');
    //add classes to icon
    icon.className = 'material-icons mdl-list__item-avatar square-icons red';
    //set icon image(see material desgin icons for more)
    icon.textContent = 'location_on';

    //create span for tag text
    var span = document.createElement('span');
    span.className = 'tag-text';
    span.textContent = tag.name;

    //combine all
    div.appendChild(icon);
    div.appendChild(span);

    return div;
}