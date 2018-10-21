/* #### Remove sharing buttons #### */
document.addEventListener("scroll", function() {
    // get all of the buttons (actually the wrappers)
    var share_btns_wrap = document.getElementsByClassName("share");
    // ...and remove 'em
    for (i=0; i<share_btns_wrap.length; i++) {
        share_btns_wrap[i].parentNode.removeChild(share_btns_wrap[i]);
    }
});

/* #### General style tweaks #### */
document.addEventListener("DOMContentLoaded", function() {
    var head = document.getElementsByTagName("head")[0];
    var style_tag = document.createElement("style");
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
// initial scroll to trigger the event once
window.onload = function () { window.scrollBy(0,1); }
