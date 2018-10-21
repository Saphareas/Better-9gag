/* #### Add controls to all videos/gifs #### */
function addControls() {
    var videos = document.getElementsByTagName("video");
    for (var i = 0; i < videos.length; i++) {
        videos[i].controls = true;
        videos[i].volume = 0.5;
        if (videos[i].nextElementSibling.classList[0] == "sound-toggle") {
            videos[i].parentNode.removeChild(videos[i].nextElementSibling);
        }
    }
}

document.addEventListener("scroll", addControls);
