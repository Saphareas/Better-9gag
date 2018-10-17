/* #### Add controls to all videos/gifs #### */
document.addEventListener("scroll", function() {
    var videos = document.getElementsByTagName("video");
    for (vid of videos) {
        vid.setAttribute("controls", "");
        if (vid.nextElementSibling.classList[0] == "sound-toggle") {
            vid.parentNode.removeChild(vid.nextElementSibling);
        }
    }
});

/* #### Dark/Night theme on desktop #### */
document.addEventListener("DOMContentLoaded", function() {
    // Code to inject into the site; triggers the body observer
    const switch_function_trigger = 'function switch_theme_trigger() { let trigger = document.createElement("div"); trigger.id = "switch_theme_trigger"; let stylesheet = document.getElementById("dark-theme"); if (stylesheet) { trigger.setAttribute("data-switch-to", "reset"); } else { trigger.setAttribute("data-switch-to", "to_dark"); } document.body.append(trigger); }';
    // Inject code (end of body)
    var switch_function_tag = document.createElement("script");
    switch_function_tag.id = "theme-switch-function";
    switch_function_tag.appendChild(document.createTextNode(switch_function_trigger));
    document.body.appendChild(switch_function_tag);

    // Create the switch button
    var theme_switch = document.createElement("a");
    theme_switch.id = "theme-switch";
    theme_switch.style = "display:block; height:30px; width:30px; float:left; font-size:16pt;";
    theme_switch.setAttribute("onclick", "switch_theme_trigger()");
    theme_switch.href= "javascript:void(0)";
    theme_switch.innerText = "🔅";
    var theme_switch_wrap = document.createElement("div");
    theme_switch_wrap.classList.add("general-function");
    theme_switch_wrap.style = "text-align:center; line-height:30px; margin-right:10px;";
    theme_switch_wrap.appendChild(theme_switch);
    // ... and add it to the site (in the header, next to the search)
    var wrapper = document.getElementsByClassName("function-wrap")[0];
    wrapper.insertBefore(theme_switch_wrap, wrapper.childNodes[0]);
});

const low_brightness = "🔅"; const high_brightness = "🔆";
// Actual function to switch the theme; is run by the body observer
function switch_theme(target) {
    var theme_switch = document.getElementById("theme-switch");
    // If the target theme is not dark, means back to normal
    if (target != "to_dark") {
        var stylesheet = document.getElementById("dark-theme");
        // remove the dark stylesheet (if present) and change the switch icon
        if (stylesheet) {
            stylesheet.parentNode.removeChild(stylesheet);
            theme_switch.innerText = low_brightness;
        }
        // finally save the state in extension storage
        if (typeof(browser) == "undefined") { chrome.storage.local.set({gag_is_dark: false}); }
        else { browser.storage.local.set({gag_is_dark: false}); }
    }
    // If the target theme is dark
    else if (target == "to_dark") {
        var stylesheet = document.getElementById("dark-theme");
        // create and add a link to the dark stylesheet (if not already present) and change the switch icon
        if (!stylesheet) {
            stylesheet = document.createElement("link");
            stylesheet.setAttribute("id", "dark-theme");
            if (typeof(browser) == "undefined") { stylesheet.setAttribute("href", chrome.runtime.getURL("darken_9gag.css")); }
            else { stylesheet.setAttribute("href", browser.runtime.getURL("darken_9gag.css")); }
            stylesheet.setAttribute("rel", "stylesheet");
            stylesheet.setAttribute("type", "text/css");
            document.getElementsByTagName("head")[0].appendChild(stylesheet);
            theme_switch.innerText = high_brightness;
        }
        // finally save the state in extension storage
        if (typeof(browser) == "undefined") { chrome.storage.local.set({gag_is_dark: true}); }
        else { browser.storage.local.set({gag_is_dark: true}); }
    }
}

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
        if (typeof(browser) == "undefined") { chrome.storage.local.get(null, onGot); }
        else {
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
            video.autoplay = true;
            video.loop = true;
            video.controls = true;
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

console.debug("Type of browser: "+typeof(browser));
console.debug("Type of chrome: "+typeof(chrome));
