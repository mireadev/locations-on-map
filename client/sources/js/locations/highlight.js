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