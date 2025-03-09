import { renderVideosGrid } from "./home/render.js";

document.addEventListener("DOMContentLoaded", () => {
    const navButton = document.querySelector('.nav-button');
    const sideNavbar = document.querySelector('.side-navbar');
    const sideNavLinks = document.querySelectorAll('.nav-link');

    navButton.addEventListener("click", () => {
        sideNavbar.classList.toggle("active");
        sideNavLinks.forEach(link => link.classList.toggle("active"));
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

});
