/* #### Dark/Night theme on desktop #### */
const LowBrightness = browser.runtime.getURL("icons/low-brightness-symbol.png");
const HighBrightness = browser.runtime.getURL("icons/high-brightness-symbol.png");

function hijackThemeSwitch() {
    // Code to inject into the site; triggers the body observer
    const switchFunctionTrigger = 'function switchThemeTrigger() { let trigger = document.createElement("div"); trigger.id = "switch-theme-trigger"; let stylesheet = document.getElementById("dark-theme"); if (stylesheet) { trigger.setAttribute("data-switch-to", "reset"); } else { trigger.setAttribute("data-switch-to", "toDark"); } document.body.append(trigger); }';
    // Inject code
    let switchFunctionTag = document.createElement("script");
    switchFunctionTag.id = "theme-switch-function";
    switchFunctionTag.appendChild(document.createTextNode(switchFunctionTrigger));
    document.head.append(switchFunctionTag);

    let themeSwitch = document.getElementById("jsid-header-darkmode-btn");
    let themeSwitchClone = themeSwitch.cloneNode(true);
    themeSwitchClone.id = "theme-switch";
    themeSwitchClone.setAttribute("onclick", "switchThemeTrigger()");
    themeSwitch.parentElement.replaceChild(themeSwitchClone, themeSwitch);
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
            themeSwitch.classList.remove("active");
        }
        // finally save the state in extension storage
        browser.storage.local.set({gagIsDark: false});
    }
    // If the target theme is dark
    else if (target == "toDark") {
        let stylesheet = document.getElementById("dark-theme");
        // create and add a link to the dark stylesheet (if not already present) and change the switch icon
        if (!stylesheet) {
            stylesheet = document.createElement("link");
            stylesheet.id = "dark-theme";
            stylesheet.href = browser.runtime.getURL("stylesheets/darken-9gag.css");
            stylesheet.rel = "stylesheet";
            stylesheet.type = "text/css";
            document.getElementsByTagName("head")[0].appendChild(stylesheet);
            themeSwitch.classList.add("active");
        }
        // finally save the state in extension storage
        browser.storage.local.set({gagIsDark: true});
    }
}

function registerThemeSwitchObserver() {
    // function to call, if body observer fires
    let callback = function() {
        // function to be run by the below promise on success
        function onGot(item) {
            if (item.gagIsDark == undefined) {
                browser.storage.local.set({gagIsDark: false});
            }
            // check if the trigger is present
            var trigger = document.getElementById("switch-theme-trigger");
            // if the trigger is present (user requested theme change)
            if (trigger != null) {
                // if storage is dark and request is smth else (reset) => switch theme to normal
                if (item.gagIsDark === true && trigger.getAttribute("data-switch-to") != "toDark") {
                    switchTheme("reset");
                }
                // if storage is normal and request change to dark => switch theme to dark
                else if (item.gagIsDark === false && trigger.getAttribute("data-switch-to") == "toDark") {
                    switchTheme("toDark");
                }
                //finally remove the trigger
                trigger.parentNode.removeChild(trigger);
            }
            //if the trigger is not present (first load or user navigated)
            else {
                // switch theme according to the storage item
                if (item.gagIsDark === true) {
                    switchTheme("toDark");
                } else {
                    switchTheme("reset");
                }
            }
        }
        browser.storage.local.get(null, onGot);
    };
    // elements to be observed
    let config = { childList: true, subtree: true };
    // create and attach the observer
    let body_observer = new MutationObserver(callback);
    body_observer.observe(document.body, config);
}

// Add the switch to the site when DOM is ready
document.addEventListener("DOMContentLoaded", hijackThemeSwitch);
// Register the observer
document.addEventListener("DOMContentLoaded", registerThemeSwitchObserver);
