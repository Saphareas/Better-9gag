﻿/*!
 * Copyright Fabian Große
 * Released under the GNU GENERAL PUBLIC LICENSE 3
 * https://raw.githubusercontent.com/Saphareas/Better-9gag/master/LICENSE
 */

let manifest = browser.runtime.getManifest();

function handleOnInstalled(details) {
    const defaultSettings = {
        settings: {
            replaceNativeDark: true,
            unlockNSFW: true,
            vidControls: true,
            noAutoplay:true,
            defaultVolume: 0.5,
            hideYtPosts: true,
            hideShareBtns: true,
            hideStickyBtn: true,
            hideOraVids: true
        }
    };

    if (details.reason == "install") {
        let notificationOptions = {
            type: "basic",
            title: "Thanks!",
            message: "Thank you for installing Better 9gag. This extension has settings that can be customized. If you like this extension, please consider giving it a good review. If you don't like it, feel free to tell me why.",
            iconUrl: "icons/icon-48.png"
        };
        browser.notifications.create(notificationOptions);
        browser.storage.local.set(defaultSettings);
    }
    else if (details.reason == "update") {
        let notificationOptions = {
            type: "basic",
            title: `Version ${manifest.version} Changelog`,
            message: `Better 9gag was updated. Here is what has changed:
• Added options: you can now turn on/off almost all features.
The options page is accessible via the extensions page of your browser.`,
            iconUrl: "icons/icon-48.png"
        };
        browser.notifications.create(notificationOptions);
        browser.storage.local.get("settings", function(item) {
            if (jQuery.isEmptyObject(item)) {
                browser.storage.local.set(defaultSettings);
            }
        });
    }
}

browser.runtime.onInstalled.addListener(handleOnInstalled);
