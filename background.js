let manifest = browser.runtime.getManifest();

function handleOnInstalled(details) {
    if (details.reason == "install") {
        let notificationOptions = {
            type: "basic",
            title: "Thanks!",
            message: "Thanks for installing Better 9gag.",
            iconUrl: "icons/icon-48.png"
        };
        browser.notifications.create(notificationOptions);
    }
    else if (details.reason == "update") {
        let notificationOptions = {
            type: "basic",
            title: `Version ${manifest.version} Changelog`,
            message: `Better 9gag was updated. Here is what has changed:
• Removed own theme switching button; uses 9gags new, own button instead.
-> If you've used 9gag's night mode before this update and you're stuck between the two night modes, please disable this extension, on 9gag switch off the native night mode, and then reactivate this extension.
• Simplified cross-browser stuff; this should give better performance.`,
            iconUrl: "icons/icon-48.png"
        };
        browser.notifications.create(notificationOptions);
    }
}
browser.runtime.onInstalled.addListener(handleOnInstalled);
