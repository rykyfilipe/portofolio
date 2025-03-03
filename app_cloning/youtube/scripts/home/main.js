import { videos } from '../../data/videos.js';
import { accounts, getAccount } from '../../data/account.js';

document.addEventListener("DOMContentLoaded", function () {
    const navButton = document.querySelector(".nav-button");
    const sideNavbar = document.querySelector(".side-navbar");
    const sideNavbarElement = document.querySelectorAll(".nav-link");

    navButton.addEventListener("click", function () {
        sideNavbar.classList.toggle("active");
        sideNavbarElement.forEach(element => element.classList.toggle("active"));
    });
});

function renderVideosGrid(){
    
    let htmlGrid = '';

    videos.forEach(video => {

        const account = getAccount(video.accountId);
        
        const html = `
            <div class="grid-element">
                <img class = "element-image" src="https://picsum.photos/400/250?random=${Math.floor(Math.random() * 1000)}" alt="">
                <div class="info">
                    <img class="element-profile-image" src="https://picsum.photos/400/250?random=${Math.floor(Math.random() * 1000)}" alt="">
                    <div class="description">
                        <p class="title">${video.title}</p>
                        <div class="account-detailes">
                            <p class="name">${account.name}</p>
                            <p class="views">
                                ${video.views} views
                                ~
                                ${video.hoursFromPost} hours ago
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        htmlGrid += html;
    });

    document.querySelector('.grid').innerHTML = htmlGrid;
}

renderVideosGrid();