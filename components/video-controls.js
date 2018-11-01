/* #### Add controls to all videos/gifs #### */
function addControls() {
    let videos = document.getElementsByTagName("video");
    for (let i = 0; i < videos.length; i++) {
        // Add controls
        videos[i].controls = true;
        // Set Volume to 50%
        videos[i].volume = 0.5; // TODO: default video volume customizable
        // Disable Autoplay
        videos[i].autoplay = false;
        // Stretch portrait videos => show volume slider instead of only volume icon
        videos[i].style.minWidth = "500px";
        // Remove a.badge-track around videos => disable autoplay
        let badgeTracker = videos[i].parentNode.parentNode;
        if (badgeTracker.className.includes("badge")) {
            let actualPost =  badgeTracker.firstElementChild.cloneNode(true);
            badgeTracker.parentNode.replaceChild(actualPost, badgeTracker);
        }
        // Remove now unnecessary elements
        hideExtraElements(".play");
        hideExtraElements(".sound-toggle");
        hideExtraElements(".length");

        function hideExtraElements(identifier) {
            let el = videos[i].parentNode.querySelector(identifier);
            if (el) {
                el.classList.add("hide");
            }
        }
    }
}

function removeYoutubePosts() {
    let youtubePosts = document.querySelectorAll(".youtube-post");
    for (let i = 0; i < youtubePosts.length; i++) {
        let postRoot = youtubePosts[i].parentNode.parentNode.parentNode.parentNode;
        postRoot.parentNode.removeChild(postRoot);
    }
}

registerObserver(function() {
    addControls();
    removeYoutubePosts();
});
