if (typeof browser == "undefined") {
    var browser = chrome;
}

// Load current settings when the page is launched
function loadSettings() {
    let checkboxes = document.querySelectorAll("input[type=checkbox]");
    browser.storage.local.get(null, function(item) {
        for (i = 0; i < checkboxes.length; i++) {
            let chkbxName = checkboxes[i].name;
            checkboxes[i].checked = item.settings[chkbxName];
        }
    });
    let numeric = document.querySelectorAll("input[type=number]");
    browser.storage.local.get(null, function(item) {
        for (i = 0; i < numeric.length; i++) {
            let numbName = numeric[i].name;
            numeric[i].value = item.settings[numbName] * 100;
        }
    });
}

function handleCheckboxInput(sender) {
    if (sender != null || sender != undefined) {
        browser.storage.local.get(null, function(item) {
            item.settings[sender.srcElement.name] = sender.srcElement.checked;
            browser.storage.local.set(item);
        });
    }
}

document.addEventListener("DOMContentLoaded", function() {
    let inputs = document.querySelectorAll("input[type=checkbox]");
    for (i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("change", handleCheckboxInput);
    }

    document.getElementsByName("resetDark")[0].addEventListener("click", function() {
        browser.storage.local.remove("gagIsDark");
    });

    document.getElementsByName("defaultVolume")[0].addEventListener("input", function(sender) {
        if (sender != null || sender != undefined) {
            browser.storage.local.get(null, function(item) {
                item.settings[sender.srcElement.name] = sender.srcElement.value / 100;
                browser.storage.local.set(item);
            });
        }
    });

    loadSettings();
});
