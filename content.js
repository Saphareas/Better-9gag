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
document.addEventListener("DOMContentLoaded", function(event) {
    // Code in this form to inject into the site
    const switch_function = 'const low_brightness = "🔅"; const high_brightness = "🔆"; function switch_theme() { var theme_switch = document.getElementById("theme-switch"); var stylesheet = document.getElementById("dark-theme"); if (stylesheet) { stylesheet.parentNode.removeChild(stylesheet); document.getElementsByClassName("background-dark")[0].setAttribute("class", "background-white"); theme_switch.innerText = low_brightness; } else { stylesheet = document.createElement("link"); stylesheet.setAttribute("id", "dark-theme"); stylesheet.setAttribute("href", "' + browser.runtime.getURL("darken_9gag.css") + '"); stylesheet.setAttribute("rel", "stylesheet"); stylesheet.setAttribute("type", "text/css"); document.getElementsByTagName("head")[0].appendChild(stylesheet); document.getElementsByClassName("background-white")[0].setAttribute("class", "background-dark"); theme_switch.innerText = high_brightness; }}'
    // Inject code (end of body)
    var switch_function_tag = document.createElement("script");
    switch_function_tag.id = "theme-switch-function";
    switch_function_tag.appendChild(document.createTextNode(switch_function));
    document.body.appendChild(switch_function_tag);

    // Create the switch button
    var theme_switch = document.createElement("a");
    theme_switch.id = "theme-switch";
    theme_switch.style = "display:block; height:30px; width:30px; float:left; font-size:16pt;";
    theme_switch.setAttribute("onclick", "switch_theme()");
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
