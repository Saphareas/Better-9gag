if (typeof browser == "undefined") {
    var browser = chrome;
}

function activateComponent(callback, observerConfig={ childList: true, subtree: true }, registeringEvent="DOMContentLoaded") {
    document.addEventListener(registeringEvent, function() {
        // Create and attach the observer
        let body_observer = new MutationObserver(callback);
        body_observer.observe(document.body, observerConfig);
    });
}
