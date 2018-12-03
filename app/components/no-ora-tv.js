/**
 * Remove annoying paid video post from ora.tv.
 */
function rmOraVid() {
    // find it
    let ora = document.querySelector('iframe[src^="https://www.ora.tv"]');
    // and delete it
    if (ora) {
        ora = ora.parentNode.parentNode;
        ora.parentNode.removeChild(ora);
    }
}

$(document).ready(function() {
    getSetting("hideOraVids", null, rmOraVid);
});
