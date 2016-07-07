//Sets new position for each location
function moveLocations(deltaX, deltaY) {
    //for each location
    for (var index in locations) {
        countNewPos(locations[index].div, deltaX, deltaY);
    }
}

//load locations and set them on map
function loadLocations() {
    loadJson('locations.json', function (data) {
        if (data) {
            locations = data.locations;

            //draw loaded locations
            drawAllLocations();
        }
    });
}

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

//creates div for location
function createLocationDiv(id, location) {
    //create div for location
    var div = createElement('div', 'location');
    div.id = 'location' + id;
    div.style.left = location.x + 'px';
    div.style.top = location.y + 'px';

    //bind highlight location in menu function
    div.addEventListener('click', highlightLocationInMenu);

    //create location icon
    var icon = createMaterialIcon('location_on', 'red');

    //create span for location text
    var span = createElement('span', 'location-text');
    span.textContent = location.name;

    //combine all
    div.appendChild(icon);
    div.appendChild(span);

    return div;
}

//creates location in menu
function createLocationMenu(id, location) {
    //create li
    var li = createElement('li', 'mdl-list__item location-menu-item');
    li.id = 'menu-item-location' + id;

    //create span for icon and text
    var spanText = createElement('span', 'mdl-list__item-primary-content');
    spanText.textContent = location.name;

    //create icon
    var icon = createMaterialIcon('location_on');

    //append icon to it's parent
    spanText.insertBefore(icon, spanText.firstChild);

    //create span for checkbox
    var spanCheckbox = createElement('span', 'mdl-list__item-secondary-action');

    //create checkbox label
    var checkboxLabel = createElement('label', 'mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect');
    checkboxLabel.setAttribute('for', 'checkbox-location' + id);

    //create checkbox input
    var checkboxInput = createElement('input', 'mdl-checkbox__input');
    checkboxInput.setAttribute('type', 'checkbox');
    checkboxInput.id = 'checkbox-location' + id;
    checkboxInput.setAttribute('data-location', 'location' + id);

    //combine checkbox
    checkboxLabel.appendChild(checkboxInput);
    spanCheckbox.appendChild(checkboxLabel);

    //combine all
    li.appendChild(spanText);
    li.appendChild(spanCheckbox);

    //upgrade material functions
    setTimeout(function () {
        //need timeout to avoid bug with last checkbox not upgraded
        componentHandler.upgradeDom("MaterialCheckbox", 'mdl-checkbox');
        componentHandler.upgradeDom("MaterialRipple", 'mdl-js-ripple-effect');
    }, 1000);

    return li;
}

//@TODO: add hiding icon | location_off

//creates icon
function createMaterialIcon(type, additionalClasses) {
    //if now additional classes
    if (!additionalClasses) {
        additionalClasses = '';
    }

    //create icon
    var icon = createElement('i', 'material-icons mdl-list__item-avatar square-icons ' + additionalClasses);

    //set icon image(see material design icons for more)
    icon.textContent = type;

    return icon;
}

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

//show all locations(remove .hide class)
function showAllLocations() {
    for (var index in locations) {
        showLocation(locations[index]);
    }
}

//show location
function showLocation(location) {
    //hide menu item
    show(location.menuItem);

    //hide location on map
    show(location.div);
}

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
    hide(location.div, true);
}