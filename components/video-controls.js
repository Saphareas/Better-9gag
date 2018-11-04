/* #### Add controls to all videos/gifs #### */
function addControls(vid) {
    // Add controls
    vid.controls = true;
    // Stretch portrait videos => show volume slider instead of only volume icon
    vid.style.minWidth = "500px";
    // Remove now unnecessary elements
    let extraElements = [".play", ".sound-toggle", ".length"];
    for (j = 0; j < extraElements.length; j++) {
        let el = vid.parentNode.querySelector(extraElements[j]);
        if (el) {
            el.classList.add("hide");
        }
    }
}

function applyDefaultVolume(vid) {
    browser.storage.local.get(null, function(item) {
        if (item.settings.defaultVolume) {
            vid.volume = item.settings.defaultVolume;
        }
    });
}

function removeBadgeTrack(vid) {
    // Remove a.badge-track around videos => disable autoplay
    let badgeTracker = vid.parentNode.parentNode;
    if (badgeTracker.className.includes("badge")) {
        let actualPost = badgeTracker.firstElementChild.cloneNode(true);
        badgeTracker.parentNode.replaceChild(actualPost, badgeTracker);
    }
}

function loopThroughVideos() {
    let videos = document.getElementsByTagName("video");
    for (i = 0; i < videos.length; i++) {
        videos[i].preload = "metadata";
        // Setting 'vidControls'
        getSetting("vidControls", videos[i], addControls);

        // Set default volume to the configured value (0.5 by default)
        applyDefaultVolume(videos[i]);

        // Disable Autoplay
        videos[i].autoplay = false;
        // Setting 'noAutoplay'
        getSetting("noAutoplay", videos[i], removeBadgeTrack);
    }
}

function removeYoutubePosts() {
    let youtubePosts = document.querySelectorAll(".youtube-post");
    for (let i = 0; i < youtubePosts.length; i++) {
        let postRoot = youtubePosts[i].parentNode.parentNode.parentNode.parentNode;
        postRoot.parentNode.removeChild(postRoot);
    }
}

registerObserver(loopThroughVideos);
getSetting("hideYtPosts", removeYoutubePosts, registerObserver);
