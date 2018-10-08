/* #### Add controls to all videos/gifs #### */
document.addEventListener("scroll", function() {
    var videos = document.getElementsByTagName("video");
    for (vid of videos) {
        vid.setAttribute("controls", "");
    }
});

/* #### Dark/Night theme on desktop #### */
document.addEventListener("DOMContentLoaded", function(event) {
    // Code in this form to inject into the site
    const switch_function = `function switch_theme() {
        var stylesheet = document.getElementById("dark-theme");
        if (stylesheet) {
            stylesheet.parentNode.removeChild(stylesheet);
            theme_switch.innerText = low_brightness;
        } else {
            stylesheet = document.createElement("link");
            stylesheet.setAttribute("id", "dark-theme");
            stylesheet.setAttribute("href", "` + browser.runtime.getURL("darken_9gag.css") + `");
            stylesheet.setAttribute("rel", "stylesheet");
            stylesheet.setAttribute("type", "text/css");
            document.getElementsByTagName("head")[0].appendChild(stylesheet);
            document.getElementsByClassName("background-white")[0].setAttribute("class", "background-dark");
            theme_switch.innerText = high_brightness;
        }
    }`
    // Inject code (end of body)
    var switch_function_tag = document.createElement("script");
    switch_function_tag.innerHTML = switch_function;
    document.body.appendChild(switch_function_tag);

    const low_brightness = "🔅";
    const high_brightness = "🔆";
    // Create the switch button
    var theme_switch = document.createElement("a");
    theme_switch.setAttribute("style", "display:block; height:30px; width:30px; float:left; padding:9px 0; font-size:16pt;");
    theme_switch.setAttribute("onclick", "switch_theme()");
    theme_switch.setAttribute("href", "javascript:void(0)");
    theme_switch.innerText = low_brightness;
    // ... and add it to the site (in the header, next to the search)
    var wrapper = document.getElementsByClassName("function-wrap")[0];
    wrapper.insertBefore(theme_switch, wrapper.childNodes[0]);
});
