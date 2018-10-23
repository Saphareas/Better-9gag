/* #### General style tweaks #### */
document.addEventListener("DOMContentLoaded", function() {
    var head = document.getElementsByTagName("head")[0];
    var style_tag = document.createElement("style");
    // TODO: Move into ui_tweaks.css
    var style = `
        #jsid-header-user-menu-avatar>a { border-radius: 2px; }
        .popup-menu.postpage-share { top: 43px; left: 164px; }`
    style_tag.append(style);
    head.append(style_tag);
});
/* ### Remove annoying paid video post from ora.tv ### */
document.addEventListener("scroll", function() {
    // find it
    var ora = document.querySelector('iframe[src^="https://www.ora.tv"]');
    // and delete it
    if (ora) {
        ora = ora.parentNode.parentNode;
        ora.parentNode.removeChild(ora);
    }
});
// TODO: remove #jsid-sticky-button

// initial scroll to trigger the event once
window.onload = function () { window.scrollBy(0,1); }

// TODO: Add a Changelog/First use popup
// TODO: create a settings page
// TODO: create a page action (for launching the settings page)
// TODO: remove or hide Youtube embededs
