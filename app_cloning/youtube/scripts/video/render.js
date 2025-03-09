document.addEventListener('DOMContentLoaded', function () {
    const videoData = localStorage.getItem('videoData');

    if (!videoData) {
        console.error('Nu există date video în localStorage.');
        return;
    }

    try {
        const parsedData = JSON.parse(videoData);

        if (!parsedData.video) {
            console.error('Nu există un link video valid în datele salvate.');
            return;
        }

        const video = document.querySelector('.js-video');

        if (!video) {
            console.error('Elementul video nu a fost găsit în DOM.');
            return;
        }

        video.src = parsedData.video;
        
        video.load();
       
    } catch (error) {
        console.error('Eroare la parsarea datelor video:', error);
    }
});
