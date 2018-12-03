/*!
 * Copyright Fabian Große
 * Released under the GNU GENERAL PUBLIC LICENSE 3
 * https://raw.githubusercontent.com/Saphareas/Better-9gag/master/LICENSE
 */

/**
 * Helper function to support both image and video/gif posts.
 * @param {string} postId The ID of the post to be replaced.
 * @param {HTMLElement} post The node with the NSFW placeholder.
 */
function hasVideo(postId, post) {
    const srcUrlBase = "https://img-9gag-fun.9cache.com/photo/" + postId;
    // create a video node with the unlocked post as source
    let video = document.createElement("video");
    video.preload = "metadata";
    video.src = srcUrlBase + "_460sv.mp4";
    video.loop = true;
    // inject it into the site asap
    video.onloadedmetadata = function() {
        post.parentNode.appendChild(video);
        // finally remove the placeholder
        post.parentNode.removeChild(post);
    }
    // onerror == if no video exists, replace it with the still image
    video.onerror = function() {
        var image = document.createElement("img");
        image.src= srcUrlBase + "_460s.jpg";
        post.parentNode.appendChild(image);
        // finally remove the placeholder
        post.parentNode.removeChild(post);
    }
}

/**
 * Get all NSFW posts and replace the placeholder with the actual post.
 */
function unlockNsfwPosts() {
    // get all NSFW post
    let nsfwPosts = document.getElementsByClassName("nsfw-post");
    // for each of them:
    for (let i = 0; i < nsfwPosts.length; i++) {
        // get the 9gag id
        let postId = nsfwPosts[i].parentNode.parentNode.parentNode.parentNode.getAttribute("id").split('-')[2];
        // inject unlocked post
        hasVideo(postId, nsfwPosts[i]);
    }
}

getSetting("unlockNSFW", unlockNsfwPosts, registerObserver);
