/*!
 * Copyright Fabian Große
 * Released under the GNU GENERAL PUBLIC LICENSE 3
 * https://raw.githubusercontent.com/Saphareas/Better-9gag/master/LICENSE
 */

/**
 * Add controls to all videos/gifs.
 * @param {HTMLElement} vid <video> element to be processed.
 */
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

/**
 * Apply the default volume set by the user.
 * @param {HTMLElement} vid <video> element to be processed.
 */
function applyDefaultVolume(vid) {
    browser.storage.local.get(null, function(item) {
        if (item.settings.defaultVolume) {
            vid.volume = item.settings.defaultVolume;
        }
    });
}

/**
 * Remove a.badge-track around videos to disable autoplay when scrolling by.
 * @param {HTMLElement} vid <video> element to be processed.
 */
function removeBadgeTrack(vid) {
    let badgeTracker = vid.parentNode.parentNode;
    if (badgeTracker.className.includes("badge")) {
        let actualPost = badgeTracker.firstElementChild.cloneNode(true);
        badgeTracker.parentNode.replaceChild(actualPost, badgeTracker);
    }
}

/**
 * Get all videos/gifs, loop through them and apply the changes according to the users settings.
 */
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

/**
 * Find Youtube posts and remove them.
 */
function removeYoutubePosts() {
    let youtubePosts = document.querySelectorAll(".youtube-post");
    for (let i = 0; i < youtubePosts.length; i++) {
        let postRoot = youtubePosts[i].parentNode.parentNode.parentNode.parentNode;
        postRoot.parentNode.removeChild(postRoot);
    }
}

registerObserver(loopThroughVideos);
getSetting("hideYtPosts", removeYoutubePosts, registerObserver);
