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

                //load tags to menu
                createTagMenu(index, tags[index]);
            }

            callback();
        }
    });
}

//creates div tag
function createTagDiv(id, tag) {
    //create div for tag
    var div = createElement('div', 'tag');
    div.id = 'tag' + id;
    div.style.left = tag.x + 'px';
    div.style.top = tag.y + 'px';

    //create tag icon
    var icon = createMaterialIcon('location_on', 'red');

    //create span for tag text
    var span = createElement('span', 'tag-text');
    span.textContent = tag.name;

    //combine all
    div.appendChild(icon);
    div.appendChild(span);

    return div;
}

//creates tag in menu
function createTagMenu(id, tag) {
    //create li
    var li = createElement('li', 'mdl-list__item');

    //create span for icon and text
    var spanText = createElement('span', 'mdl-list__item-primary-content');
    spanText.textContent = tag.name;

    //create icon
    var icon = createMaterialIcon('location_on');

    //append icon to it's parent
    spanText.insertBefore(icon, spanText.firstChild);

    //create span for checkbox
    var spanCheckbox = createElement('span', 'mdl-list__item-secondary-action');

    //create checkbox label
    var checkboxLabel = createElement('label', 'mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect');
    checkboxLabel.setAttribute('for', 'checkbox-tag' + id);

    //create checkbox input
    var checkboxInput = createElement('input', 'mdl-checkbox__input');
    checkboxInput.id = 'checkbox-tag' + id;
    checkboxInput.setAttribute('data-tag', 'tag' + id);

    //combine checkbox
    checkboxLabel.appendChild(checkboxInput);
    spanCheckbox.appendChild(checkboxLabel);

    //combine all
    li.appendChild(spanText);
    li.appendChild(spanCheckbox);

    //append this item to tags menu
    menu.appendChild(li);

    //TODO: fix checkbox binding
    componentHandler.upgradeDom();
    setTimeout(function(){
        // componentHandler.upgradeElement(li, "mdl-checkbox");
        // componentHandler.upgradeElement(checkboxInput, "MaterialCheckBox");
        // componentHandler.upgradeElement(checkboxLabel, "mdl-checkbox");
        // componentHandler.upgradeElement(spanCheckbox, "MaterialCheckBox");
        componentHandler.upgradeDom();
    }, 3000);
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
function highlightTagInMenu(tag){

}