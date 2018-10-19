/* #### Dark/Night theme on desktop #### */
const low_brightness = function() {
    if (typeof(browser) == "undefined") { return chrome.runtime.getURL("icons/low-brightness-symbol.png"); }
    else { return chrome.runtime.getURL("icons/low-brightness-symbol.png"); }
}();
const high_brightness = function(){
    if (typeof(browser) == "undefined") { return chrome.runtime.getURL("icons/high-brightness-symbol.png"); }
    else { return chrome.runtime.getURL("icons/high-brightness-symbol.png"); }
}();

document.addEventListener("DOMContentLoaded", function() {
    // Code to inject into the site; triggers the body observer
    const switch_function_trigger = 'function switch_theme_trigger() { let trigger = document.createElement("div"); trigger.id = "switch_theme_trigger"; let stylesheet = document.getElementById("dark-theme"); if (stylesheet) { trigger.setAttribute("data-switch-to", "reset"); } else { trigger.setAttribute("data-switch-to", "to_dark"); } document.body.append(trigger); }';
    // Inject code (end of body)
    var switch_function_tag = document.createElement("script");
    switch_function_tag.id = "theme-switch-function";
    switch_function_tag.appendChild(document.createTextNode(switch_function_trigger));
    document.body.appendChild(switch_function_tag);

    // Create the switch button
    var theme_switch_img = document.createElement("img");
    theme_switch_img.style = "height:30px; width:30px;";
    theme_switch_img.src = low_brightness;
    var theme_switch_a = document.createElement("a");
    theme_switch_a.id = "theme-switch";
    theme_switch_a.style = "display:block; height:30px; width:30px; float:left;";
    theme_switch_a.setAttribute("onclick", "switch_theme_trigger()");
    theme_switch_a.href= "javascript:void(0)";
    theme_switch_a.append(theme_switch_img);
    var theme_switch_wrap = document.createElement("div");
    theme_switch_wrap.classList.add("general-function");
    theme_switch_wrap.style = "text-align:center; line-height:30px; margin-right:10px;";
    theme_switch_wrap.appendChild(theme_switch_a);
    // ... and add it to the site (in the header, next to the search)
    var wrapper = document.getElementsByClassName("function-wrap")[0];
    wrapper.insertBefore(theme_switch_wrap, wrapper.childNodes[0]);
});

// Actual function to switch the theme; is run by the body observer
function switch_theme(target) {
    var theme_switch = document.getElementById("theme-switch");
    // If the target theme is not dark, means back to normal
    if (target != "to_dark") {
        var stylesheet = document.getElementById("dark-theme");
        // remove the dark stylesheet (if present) and change the switch icon
        if (stylesheet) {
            stylesheet.parentNode.removeChild(stylesheet);
            theme_switch.firstChild.src = low_brightness;
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
            theme_switch.firstChild.src = high_brightness;
        }
        // finally save the state in extension storage
        if (typeof(browser) == "undefined") { chrome.storage.local.set({gag_is_dark: true}); }
        else { browser.storage.local.set({gag_is_dark: true}); }
    }
}
