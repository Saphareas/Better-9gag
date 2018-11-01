if (browser == "undefined") {
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
        inputs[i].addEventListener("input", handleCheckboxInput);
    }

    document.getElementsByName("resetDark")[0].addEventListener("click", function() {
        browser.storage.local.remove("gagIsDark");
    })

    loadSettings();
});
