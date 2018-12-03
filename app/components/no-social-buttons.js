/*!
 * Copyright Fabian Große
 * Released under the GNU GENERAL PUBLIC LICENSE 3
 * https://raw.githubusercontent.com/Saphareas/Better-9gag/master/LICENSE
 */

/**
 * Remove (Facebook and Pinterest) sharing buttons.
 */
function rmShareBtns() {
    // get all of the buttons (actually the wrappers)
    let shareBtnsWrap = document.getElementsByClassName("share");
    // ...and remove 'em
    for (let i = 0; i < shareBtnsWrap.length; i++) {
        shareBtnsWrap[i].parentNode.removeChild(shareBtnsWrap[i]);
    }
}

/**
 * Remove the sticky button in the bottom right.
 */
function rmStickyBtn() {
    let stickyBtn = document.getElementById("jsid-sticky-button");
    stickyBtn.parentNode.removeChild(stickyBtn);
}

$(document).ready(function() {
    getSetting("hideStickyBtn", null, rmStickyBtn);
});
getSetting("hideShareBtns", rmShareBtns, registerObserver);
