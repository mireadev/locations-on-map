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