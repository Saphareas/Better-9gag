/* #### Dark/Night theme on desktop #### */
function getResourceURL(resource) {
    if (typeof(browser) == "undefined") {
        return chrome.runtime.getURL(resource);
    }
    else {
        return chrome.runtime.getURL(resource);
    }
}

const LowBrightness = getResourceURL("icons/low-brightness-symbol.png");
const HighBrightness = getResourceURL("icons/low-brightness-symbol.png");

function addThemeSwitch() {
    // Code to inject into the site; triggers the body observer
    const switchFunctionTrigger = 'function switchThemeTrigger() { let trigger = document.createElement("div"); trigger.id = "switch-theme-trigger"; let stylesheet = document.getElementById("dark-theme"); if (stylesheet) { trigger.setAttribute("data-switch-to", "reset"); } else { trigger.setAttribute("data-switch-to", "toDark"); } document.body.append(trigger); }';
    // Inject code (end of body)
    let switchFunctionTag = document.createElement("script");
    switchFunctionTag.id = "theme-switch-function";
    switchFunctionTag.appendChild(document.createTextNode(switchFunctionTrigger));
    document.head.append(switchFunctionTag);

    // Create the switch button
    let themeSwitchWrapper = document.createElement("div");
    themeSwitchWrapper.classList.add("general-function");
    themeSwitchWrapper.id = "theme-switch-wrapper";

    let themeSwitchLink = document.createElement("a");
    themeSwitchLink.id = "theme-switch";
    themeSwitchLink.href= "javascript:void(0)";
    themeSwitchLink.setAttribute("onclick", "switchThemeTrigger()");

    let themeSwitchImg = document.createElement("img");
    themeSwitchImg.src = LowBrightness;

    themeSwitchLink.append(themeSwitchImg);
    themeSwitchWrapper.appendChild(themeSwitchLink);

    // ... and add it to the site (in the header, next to the search)
    let wrapper = document.getElementsByClassName("function-wrap")[0];
    wrapper.insertBefore(themeSwitchWrapper, wrapper.childNodes[0]);
}

// Actual function to switch the theme; is run by the body observer
function switchTheme(target) {
    let themeSwitch = document.getElementById("theme-switch");
    // If the target theme is not dark, means back to normal
    if (target != "toDark") {
        let stylesheet = document.getElementById("dark-theme");
        // remove the dark stylesheet (if present) and change the switch icon
        if (stylesheet) {
            stylesheet.parentNode.removeChild(stylesheet);
            themeSwitch.firstChild.src = LowBrightness;
        }
        // finally save the state in extension storage
        if (typeof(browser) == "undefined") {
            chrome.storage.local.set({gagIsDark: false});
        }
        else {
            browser.storage.local.set({gagIsDark: false});
        }
    }
    // If the target theme is dark
    else if (target == "toDark") {
        let stylesheet = document.getElementById("dark-theme");
        // create and add a link to the dark stylesheet (if not already present) and change the switch icon
        if (!stylesheet) {
            stylesheet = document.createElement("link");
            stylesheet.id = "dark-theme";
            stylesheet.href = getResourceURL("darken_9gag.css");
            stylesheet.rel = "stylesheet";
            stylesheet.type = "text/css";
            document.getElementsByTagName("head")[0].appendChild(stylesheet);
            themeSwitch.firstChild.src = HighBrightness;
        }
        // finally save the state in extension storage
        if (typeof(browser) == "undefined") {
            chrome.storage.local.set({gagIsDark: true});
        }
        else {
            browser.storage.local.set({gagIsDark: true});
        }
    }
}

// Add the switch to the site when DOM is ready
document.addEventListener("DOMContentLoaded", addThemeSwitch);
