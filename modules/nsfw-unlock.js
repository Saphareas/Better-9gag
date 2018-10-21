/* #### Show NSFW posts when not logged in #### */
function unlockNsfwPosts() {
    // get all NSFW post
    var nsfw_posts = document.getElementsByClassName("nsfw-post");
    // for each of them:
    for (i=0; i<nsfw_posts.length; i++) {
        var parent = nsfw_posts[i].parentNode;
        // get the 9gag id
        var post_id = parent.parentNode.parentNode.parentNode.getAttribute("id").split('-')[2];
        // inject unlocked post
        has_video(post_id, parent);
        // finally remove the placeholder
        parent.removeChild(nsfw_posts[i]);

        function has_video(post_id, parent_node) {
            const src_url_base = "https://img-9gag-fun.9cache.com/photo/" + post_id;
            // create a video node with the unlocked post as source
            var video = document.createElement("video");
            video.src = src_url_base + "_460sv.mp4";
            video.loop = true;
            video.controls = true;
            video.volume = 0.5;
            // inject it into the site asap
            video.onloadedmetadata = function() {
                parent_node.appendChild(video);
            }
            // on error == if no video exists, replace it with the still image
            video.onerror = function() {
                var image = document.createElement("img");
                image.src= src_url_base + "_460s.jpg";
                parent_node.appendChild(image);
            }
        }
    }
}

document.addEventListener("scroll", unlockNsfwPosts);
