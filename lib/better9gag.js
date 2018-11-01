if (typeof browser == "undefined") {
    var browser = chrome;
}

function registerObserver(callback, observerConfig={ childList: true, subtree: true }, registeringEvent="DOMContentLoaded") {
    document.addEventListener(registeringEvent, function() {
        // Create and attach the observer
        let body_observer = new MutationObserver(callback);
        body_observer.observe(document.body, observerConfig);
    });
}

function activateComponent(key, callback) {
    browser.storage.local.get(null, function(item) {
        let value = item.settings[key];
        console.debug(`Value of ${key} is ${value}`);
        if (value === true) { callback() }
    });
}
