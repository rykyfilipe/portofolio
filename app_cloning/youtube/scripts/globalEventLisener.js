import { renderVideosGrid } from "./home/render.js";

function unlockScreen() {
    document.body.classList.remove("locked");
    document.querySelector(".overlay-lock")?.remove();
    
    const sideNavbar = document.querySelector('.side-navbar');
    const sideNavLinks = document.querySelectorAll('.nav-link');
    sideNavbar.classList.remove("active");
    sideNavLinks.forEach(link => link.classList.remove("active"));
}

document.addEventListener("DOMContentLoaded", () => {
    const navButton = document.querySelector('.nav-button');
    const sideNavbar = document.querySelector('.side-navbar');
    const sideNavLinks = document.querySelectorAll('.nav-link');

    navButton.addEventListener("click", () => {
        const isLocked = document.body.classList.toggle("locked");
        sideNavbar.classList.toggle("active");
        sideNavLinks.forEach(link => link.classList.toggle("active"));

        if (isLocked) {
            let overlay = document.createElement("div");
            overlay.classList.add("overlay-lock");
            overlay.addEventListener("click", unlockScreen);
            document.body.appendChild(overlay);
        } else {
            unlockScreen();
        }
    });




    const form = document.querySelector('.js-search-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const searchQuery = document.querySelector('.search-bar').value;

        fetch('http://localhost:3000/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `query=${encodeURIComponent(searchQuery)}`,
        })
        .then(response => response.text())  
        .then(data => {
            const filteredVideos = JSON.parse(data);
            window.location.href = 'home.html';
            renderVideosGrid(filteredVideos);
        })
        .catch(error => {
            console.error('Eroare:', error);
        });
    });

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
