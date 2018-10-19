/* #### Add controls to all videos/gifs #### */
document.addEventListener("scroll", function() {
    var videos = document.getElementsByTagName("video");
    for (var i = 0; i < videos.length; i++) {
        videos[i].controls = true;
        videos[i].volume = 0.5;
        if (videos[i].nextElementSibling.classList[0] == "sound-toggle") {
            videos[i].parentNode.removeChild(videos[i].nextElementSibling);
        }
    }
});

document.addEventListener("DOMContentLoaded", function() {
    // function to call, if body observer fires
    var callback = function() {
        // function to be run by the below promise on success
        function onGot(item) {
            if (item == undefined) {
                if (typeof(browser) == "undefined") { chrome.storage.local.set({gag_is_dark: false}); }
                else { browser.storage.local.set({gag_is_dark: false}); }
            }
            // check if the trigger is present
            var trigger = document.getElementById("switch_theme_trigger");
            // if the trigger is present (user requested theme change)
            if (trigger != null) {
                // if storage is dark and request is smth else (reset) => switch theme to normal
                if (item.gag_is_dark === true && trigger.getAttribute("data-switch-to") != "to_dark") {
                    switch_theme("reset");
                }
                // if storage is normal and request change to dark => switch theme to dark
                else if (item.gag_is_dark === false && trigger.getAttribute("data-switch-to") == "to_dark") {
                    switch_theme("to_dark");
                }
                //console.debug(trigger);
                //finally remove the trigger
                trigger.parentNode.removeChild(trigger);
            }
            //if the trigger is not present (first load or user navigated)
            else {
                // switch theme according to the storage item
                if (item.gag_is_dark === true) {
                    switch_theme("to_dark");
                } else {
                    switch_theme("reset");
                }
            }
            //console.debug(item);
        }
        // function to be run by the below promise on an error
        function onError(error) {
            console.debug(`Error: ${error}`);
        }
        if (typeof(browser) == "undefined" && typeof(chrome) != "undefined") { // Chrome: uses "chrome" namespace, doesn't support promises
            chrome.storage.local.get(null, onGot);
        }
        else if (typeof(chrome) == "undefined" && typeof(browser) != "undefined") { // Edge: uses "browser" namespace, doesn't support promises
            browser.storage.local.get(null, onGot);
        }
        else { // Firefox: supports both namespaces and promises
            // read the extension storage (it's a promise)
            let get_storage = browser.storage.local.get();
            // if successful, run onGot(); if not run onError()
            get_storage.then(onGot, onError);
        }
    };
    // elements to be observed
    var config = { childList: true, subtree: true };
    // create and attach the observer
    var body_observer = new MutationObserver(callback);
    body_observer.observe(document.body, config);
});

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
