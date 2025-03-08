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

    document.querySelector('.search-button')
        .addEventListener('click', (event) => {
            event.preventDefault(); 
            const searchQuery = document.querySelector('.search-bar').value.toLowerCase();

            
            const filteredVideos = videos.filter(video => 
                video.title.includes(searchQuery)
            );

            renderVideosGrid(filteredVideos);
        });

        document.querySelectorAll('.js-video-click').forEach(element => {
            console.log("Found clickable element:", element);
            
            element.addEventListener('click', event => {
                console.log("Click event fired!");
                console.log("Element clicked:", event.currentTarget);
                console.log("Data attributes:", event.currentTarget.dataset);
        
                
                const videoId = event.currentTarget.dataset.videoId;
        
                if (videoId) {
                    localStorage.setItem('clickedVideoId', videoId);
                    console.log("Just set video ID:", localStorage.getItem('clickedVideoId'));
                } else {
                    console.warn("No video ID found in dataset!");
                }

                event.preventDefault();
            });
        });
        
        
});
