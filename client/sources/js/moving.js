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

            //set new position to all locations on map
            moveLocations(deltaX, deltaY);
        }
    }
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