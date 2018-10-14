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
// doesn't work for videos/gifs
document.addEventListener("scroll", function() {
    var nsfw_posts = document.getElementsByClassName("nsfw-post");
    for (post of nsfw_posts) {
        var parent = post.parentNode;
        parent.removeChild(post);
        var post_id = parent.parentNode.parentNode.parentNode.getAttribute("id").split('-')[2];
        var source = document.createElement("source");
        source.srcset = "https://img-9gag-fun.9cache.com/photo/" + post_id + "_460swp.webp";
        source.type = "image/webp";
        var fallback = document.createElement("img");
        fallback.src= "https://img-9gag-fun.9cache.com/photo/" + post_id + "_460s.jpg";
        var picture_tag = document.createElement("picture");
        picture_tag.appendChild(source);
        picture_tag.appendChild(fallback);
        parent.appendChild(picture_tag);
    }
});

/*
<video preload="auto" poster="https://img-9gag-fun.9cache.com/photo/aB0Rn62_460s.jpg" loop="loop">
    <source src="https://img-9gag-fun.9cache.com/photo/aB0Rn62_460svvp9.webm" type="video/webm">
    <source src="https://img-9gag-fun.9cache.com/photo/aB0Rn62_460sv.mp4" type="video/mp4">
    <source src="https://img-9gag-fun.9cache.com/photo/aB0Rn62_460svwm.webm" type="video/webm">
</video>
*/

/* #### Remove sharing buttons #### */
document.addEventListener("scroll", function() {
    var share_btns_wrap = document.getElementsByClassName("share");
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
    style_tag.append();
    head.append(style_tag);
});

window.onload = function () { window.scrollBy(0,1); }
