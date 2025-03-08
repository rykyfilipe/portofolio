import { accounts } from "../../data/account.js";
import { videos } from "../../data/videos.js";
import { renderVideosGrid } from "./render.js";

document.addEventListener("DOMContentLoaded", function () {
    const navButton = document.querySelector(".nav-button");
    const sideNavbar = document.querySelector(".side-navbar");
    const sideNavbarElements = document.querySelectorAll(".nav-link");

    navButton.addEventListener("click", function () {
        sideNavbar.classList.toggle("active");
        sideNavbarElements.forEach(element => element.classList.toggle("active"));
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
            renderVideosGrid(filteredVideos);
        })
        .catch(error => {
            console.error('Eroare:', error);
        });
    });


    const grid = document.querySelector('.grid');

    grid.addEventListener('click', function (event) {
        
        if (event.target.closest('.js-video-click')) {
            const data = event.target.closest('.js-video-click').dataset.videoId;
            console.log('Video ID:', data);  
            fetch('http://localhost:3000/sentVideoId', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ videoId: data })
            })
            .then(response => response.json())
            .then(data => console.log('Succes:', data))
            .catch((error) => console.error('Eroare:', error));
        }
    });
        
});
