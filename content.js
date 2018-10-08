/* #### Add controls to all videos/gifs #### */
document.addEventListener("scroll", function() {
    let videos = document.getElementsByTagName("video");
    for (vid of videos) {
        vid.setAttribute("controls", "");
    }
});
