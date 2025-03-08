document.addEventListener('DOMContentLoaded', function() {

    const videoId = localStorage.getItem('clickedVideoId');
    console.log("Retrieved video ID:", videoId);
    
    
    if (videoId) {
        console.log("Video ID found:", videoId);
        
    } else {
        console.log("No video ID found in localStorage");
    }
});