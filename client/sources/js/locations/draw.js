//draws all locations
function drawAllLocations() {
    //load deltaX and deltaY for new loaded locations
    var deltaX = +getStyleValue(map, 'left').replace('px', '');
    var deltaY = +getStyleValue(map, 'top').replace('px', '');

    //draw locations
    for (var index in locations) {
        //save div
        locations[index].div = createLocationDiv(index, locations[index]);

        //draw it on page
        wrap.appendChild(locations[index].div);

        //set it to new pos
        countNewPos(locations[index].div, deltaX, deltaY);

        //load locations to menu
        locations[index].menuItem = createLocationMenu(index, locations[index]);

        //append this item to locations menu
        menu.appendChild(locations[index].menuItem);
    }
}