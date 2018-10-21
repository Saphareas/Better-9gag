/* #### Show NSFW posts when not logged in #### */
// Helper function to support both image and video/gif posts
function hasVideo(postId, parentNode) {
    const srcUrlBase = "https://img-9gag-fun.9cache.com/photo/" + postId;
    // create a video node with the unlocked post as source
    var video = document.createElement("video");
    video.src = srcUrlBase + "_460sv.mp4";
    video.loop = true;
    video.controls = true;
    video.volume = 0.5;
    // inject it into the site asap
    video.onloadedmetadata = function() {
        parentNode.appendChild(video);
    }
    // on error == if no video exists, replace it with the still image
    video.onerror = function() {
        var image = document.createElement("img");
        image.src= srcUrlBase + "_460s.jpg";
        parentNode.appendChild(image);
    }
}

// Main function that detects and replaces NSFW posts
function unlockNsfwPosts() {
    // get all NSFW post
    var nsfwPosts = document.getElementsByClassName("nsfw-post");
    // for each of them:
    for (i=0; i<nsfwPosts.length; i++) {
        var parent = nsfwPosts[i].parentNode;
        // get the 9gag id
        var postId = parent.parentNode.parentNode.parentNode.getAttribute("id").split('-')[2];
        // inject unlocked post
        hasVideo(postId, parent);
        // finally remove the placeholder
        parent.removeChild(nsfwPosts[i]);
    }
}

document.addEventListener("scroll", unlockNsfwPosts);
