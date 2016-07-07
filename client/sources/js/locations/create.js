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
    var icon = createMaterialIcon('location_on', 'cursor-pointer');
    icon.id = 'menu-item-icon-for-location' + id;
    icon.setAttribute('data-location-id', id);

    //bind hide/show location on map func
    icon.addEventListener('click', highlightLocationOnMap);

    //append icon to it's parent
    spanText.insertBefore(icon, spanText.firstChild);

    //create span for checkbox
    var spanCheckbox = createElement('span', 'mdl-list__item-secondary-action');

    //create checkbox label
    var checkboxLabel = createElement('label', 'mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect');
    checkboxLabel.setAttribute('for', 'checkbox-location' + id);
    checkboxLabel.setAttribute('data-location', 'location' + id);

    //bind hide/show location on map func
    checkboxLabel.addEventListener('click', toggleLocationOnMap);

    //create checkbox input
    var checkboxInput = createElement('input', 'mdl-checkbox__input');
    checkboxInput.setAttribute('type', 'checkbox');
    checkboxInput.id = 'checkbox-location' + id;

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

        //set checkbox to checked
        checkboxLabel.MaterialCheckbox.check();
    }, 1000);

    return li;
}

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