let manifest = browser.runtime.getManifest();

function handleOnInstalled(details) {
    if (details.reason == "install") {
        let notificationOptions = {
            type: "basic",
            title: "Thanks!",
            message: "Thank you for installing Better 9gag. If you like this extension, please consider giving it a good review. If you don't like it, feel free to tell me why.",
            iconUrl: "icons/icon-48.png"
        };
        browser.notifications.create(notificationOptions);
    }
    else if (details.reason == "update") {
        let notificationOptions = {
            type: "basic",
            title: `Version ${manifest.version} Changelog`,
            message: `Better 9gag was updated. Here is what has changed:
• Videos/Gifs don't preload, saving your bandwidth
• Fix dark mode for the notice under uncommented posts`,
            iconUrl: "icons/icon-48.png"
        };
        browser.notifications.create(notificationOptions);
    }
}

browser.runtime.onInstalled.addListener(handleOnInstalled);
