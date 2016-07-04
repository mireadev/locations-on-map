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
            }

            callback();
        }
    });
}

//creates div tag
function createTagDiv(id, tag) {
    //create div for tag
    var div = document.createElement('div');
    div.className = 'tag';
    div.id = 'tag' + id;
    div.style.left = tag.x + 'px';
    div.style.top = tag.y + 'px';

    //create tag icon
    var icon = document.createElement('i');
    //add classes to icon
    icon.className = 'material-icons mdl-list__item-avatar square-icons red';
    //set icon image(see material desgin icons for more)
    icon.textContent = 'location_on';

    //create span for tag text
    var span = document.createElement('span');
    span.className = 'tag-text';
    span.textContent = tag.name;

    //combine all
    div.appendChild(icon);
    div.appendChild(span);

    return div;
}