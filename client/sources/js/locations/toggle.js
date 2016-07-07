//hide/show location on map
function toggleLocationOnMap() {
    //check if we clicked on icon in menu, not on checkbox
    var attrLocationId = this.getAttribute('data-location-id');
    if (attrLocationId) {
        //we clicked on icon in menu, so we need to click on checkbox
        document.getElementById('checkbox-location' + attrLocationId).click();

        //lose focus on this element(this needed to fix bug with material when .is-focused class still remains on checkbox after click)
        document.getElementById('checkbox-location' + attrLocationId).blur();
        return false;
    }

    //get current location id
    var locationId = this.getAttribute('data-location');

    //get current location div on map
    var locationDiv = document.getElementById(locationId);

    //get current location icon in menu
    var locationIcon = document.getElementById('menu-item-icon-for-' + locationId);

    //if checkbox checked
    if (hasClass(this, 'is-checked')) {
        //checkbox is checked
        //hide location on map
        hideLocationOnMap(locationDiv);

        //set user hided attr
        locationDiv.setAttribute('data-hided-by-user', 'true');

        //change icon to hided
        locationIcon.textContent = 'location_off';
    } else {
        //checkbox is unchecked
        //show location on map
        showLocationOnMap(locationDiv, true);

        //delete user hided attr
        locationDiv.removeAttribute('data-hided-by-user');

        //change icon to showed
        locationIcon.textContent = 'location_on';
    }
}