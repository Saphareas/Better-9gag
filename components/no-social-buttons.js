/* #### Remove sharing buttons #### */
function rmShareBtns() {
    // get all of the buttons (actually the wrappers)
    let shareBtnsWrap = document.getElementsByClassName("share");
    // ...and remove 'em
    for (let i = 0; i < shareBtnsWrap.length; i++) {
        shareBtnsWrap[i].parentNode.removeChild(shareBtnsWrap[i]);
    }
}

function rmStickyBtn() {
    let stickyBtn = document.getElementById("jsid-sticky-button");
    stickyBtn.parentNode.removeChild(stickyBtn);
}

document.addEventListener("DOMContentLoaded", function() {
    getSetting("hideStickyBtn", null, rmStickyBtn);
});
getSetting("hideShareBtns", rmShareBtns, registerObserver);
 