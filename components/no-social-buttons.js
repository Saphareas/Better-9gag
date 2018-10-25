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

// TODO: replace onscroll event with Mutation Observer
document.addEventListener("scroll", rmShareBtns);
document.addEventListener("DOMContentLoaded", rmStickyBtn);