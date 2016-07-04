//Search for tags
function searchTags() {
    //load tags from user input
    var tags = tagsInput.value.toLowerCase().trim();

    //if we don't change anything
    if (lastSearch === tags) {
        return;
    } else {
        lastSearch = tags;
    }

    //split tags to array
    tags = tags.split(',');

    //hide all menu items
    hideAllLocations();

    //if there is an empty input
    if (tags[0] == "") {
        //show all tags back
        showAllLocations();
        return;
    }

    //cleat all spaces
    for (var i = 0; i < tags.length; i++) {
        tags[i] = tags[i].trim();
    }

    //check all tags for each location
    locations.forEach(function (location) {
        //load location tags to array
        var locationTags = location.tags.split(',');

        //check every tag in location
        for (var i = 0; i < locationTags.length; i++) {
            //if it matches user input - draw it in menu
            if (tags.indexOf(locationTags[i].toLowerCase().trim()) != -1) {
                //show location on map and in menu
                showLocation(location);
                //TODO: reregister event listener for checkbox
                break;
            }
        }
    });
}