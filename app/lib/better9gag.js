if (typeof browser == "undefined") {
    var browser = chrome;
}

/**
 * Create a MutationObserver and attach it to document.body.
 * @param {function} callback Function to be run by the observer when it fires.
 */
function registerObserver(callback) {
    $(document).ready(function() {
        // Create and attach the observer
        let observerConfig = { childList: true, subtree: true };
        let body_observer = new MutationObserver(callback);
        body_observer.observe(document.body, observerConfig);
    },1);
}

/**
 * Get the stored settings and run the callback with the arguments when the setting specified by 'key' is true.
 * @param {string} key Name of the setting.
 * @param {*} arg Argument that will be passed in the callback.
 * @param {function} callback Function that is run when the setting is true.
 */
function getSetting(key, arg, callback) {
    setTimeout(function() {
        browser.storage.local.get(null, function(item) {
            let value = item.settings[key];
            if (value === true) { callback(arg) }
        });
    },1);
}
