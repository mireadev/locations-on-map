//show all locations(remove .hide class)
function showAllLocations() {
    for (var index in locations) {
        showLocation(locations[index]);
    }
}

//show location
function showLocation(location) {
    //show menu item
    show(location.menuItem);

    //show location on map
    showLocationOnMap(location.div)
}

//show location on map
function showLocationOnMap(div, ignoreUserHiding) {
    //if we need to ignore that user hide this location by checkbox
    if (ignoreUserHiding) {
        show(div);
    } else {
        //check if user hided this location by checkbox
        if (!div.getAttribute('data-hided-by-user')) {
            show(div);
        }
    }
}