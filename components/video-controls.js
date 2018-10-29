/* #### Add controls to all videos/gifs #### */
function addControls() {
    let videos = document.getElementsByTagName("video");
    for (let i = 0; i < videos.length; i++) {
        videos[i].controls = true;
        videos[i].volume = 0.5; // TODO: default video volume customizable
        if (videos[i].nextElementSibling.classList[0] == "sound-toggle") {
            videos[i].parentNode.removeChild(videos[i].nextElementSibling);
        }
        // TODO: remove a.badge-track around videos (div.post-container > div > a.badge-track > video)
    }
}

activateComponent(function() {
    addControls();
    removeYoutubePosts();
});
