if (typeof browser == "undefined") {
    var browser = chrome;
}

function registerObserver(callback, observerConfig={ childList: true, subtree: true }) {
    $(document).ready(function() {
        // Create and attach the observer
        let body_observer = new MutationObserver(callback);
        body_observer.observe(document.body, observerConfig);
    },1);
}

function getSetting(key, arg, callback, item=localStorage) {
    setTimeout(function() {
        browser.storage.local.get(null, function(item) {
            let value = item.settings[key];
            if (value === true) { callback(arg) }
        });
    },1);
}
