//Search for tags
function searchTags() {
    //load tags from user input
    var tags = tagsInput.value;
    tags = tags.split(',');

    //cleat all spaces
    for (var i = 0; i < tags.length; i++) {
        tags[i] = tags[i].toLowerCase().trim();
    }

    console.log(tags);

    //clear all menu
    menu.innerHTML = '';

    //check all tags for each location
    locations.forEach(function (location) {
        var locationTags = location.tags.split(',');

        console.log(locationTags);

        //check every tag in location
        for (var i = 0; i < locationTags.length; i++) {
            //if it matches user input - draw it in menu
            if (tags.indexOf(locationTags[i].toLowerCase().trim()) != -1) {
                menu.appendChild(location.menuItem);
                //TODO: reregister event listener for checkbox
                break;
            }
        }
    });
}