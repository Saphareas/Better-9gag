/* #### Show NSFW posts when not logged in #### */
document.addEventListener("scroll", function() {
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
});

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
