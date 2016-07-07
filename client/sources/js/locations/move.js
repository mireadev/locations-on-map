//Sets new position for each location
function moveLocations(deltaX, deltaY) {
    //for each location
    for (var index in locations) {
        countNewPos(locations[index].div, deltaX, deltaY);
    }
}