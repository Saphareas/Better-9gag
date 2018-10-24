let manifest = browser.runtime.getManifest();

function handleOnInstalled(details) {
    if (details.reason == "install") {
        let notificationOptions = {
            type: "basic",
            title: "Thanks!",
            message: "Thanks for installing Better 9gag.",
        };
        if (chrome) {
            chrome.notifications.create(notificationOptions);
        } else {
            browser.notifications.create(notificationOptions);
        }
    }
    else if (details.reason == "update") {
        let notificationOptions = {
            type: "basic",
            title: `Version ${manifest.version} Changelog`,
            message: `Better 9gag was updated. Here is what has changed:
                • This notification was added
                • The extension now removes the sticky button in the bottom right
                • Under-the-hood changes in preparation for version 2.0`
        };
        if (chrome) {
            chrome.notifications.create(notificationOptions);
        } else {
            browser.notifications.create(notificationOptions);
        }
    }
}
if (chrome) {
    chrome.runtime.onInstalled.addListener(handleOnInstalled);
} else {
    browser.runtime.onInstalled.addListener(handleOnInstalled);
}
