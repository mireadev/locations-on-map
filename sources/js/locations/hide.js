//hide all locations(remove .hide class)
function hideAllLocations() {
    for (var index in locations) {
        hideLocation(locations[index]);
    }
}

//hide location
function hideLocation(location) {
    //hide menu item
    hide(location.menuItem);

    //hide location on map
    hideLocationOnMap(location.div);
}

//hide location on map
function hideLocationOnMap(div) {
    hide(div, true);
}