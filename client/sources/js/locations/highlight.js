//highlight menu item
function highlightLocationInMenu() {
    //get menu item for this location
    var cc = document.getElementById('menu-item-' + this.id);

    //add highlight animation
    addClass(cc, 'highlight');

    //remove highlight animation
    setTimeout(function () {
        removeClass(cc, 'highlight');
    }, 3000);
}

//highlight location on map
function highlightLocationOnMap() {
    //get current location id
    var attrLocationId = this.getAttribute('data-location-id');

    //if location is hided on map
    if (this.textContent == 'location_off') {
        //show location on map
        document.getElementById('checkbox-location' + attrLocationId).click();

        //lose focus on this element(this needed to fix bug with material when .is-focused class still remains on checkbox after click)
        document.getElementById('checkbox-location' + attrLocationId).blur();
    }

    //set scope to location on map
    //@TODO: add focusing and highlighting location on map
}