document.addEventListener("DOMContentLoaded", function () {

    const grid = document.querySelector('.grid');
    grid.addEventListener('click', function (event) {
        if (event.target.closest('.js-video-click')) {
            const videoId = event.target.closest('.js-video-click').dataset.videoId;

            fetch(`http://localhost:3000/video/${videoId}`)
                .then(response => response.json())
                .then(data => {
                    console.log('Succes:', data);

                    localStorage.setItem('videoData', JSON.stringify(data));
                    window.location.href = 'video.html';
                })
                .catch((error) => console.error('Eroare:', error));
        }
    });

        
});
