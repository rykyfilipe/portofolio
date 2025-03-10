import {getAccount, getFormattedSubscribers} from '../../data/account.js';
import {getFormattedTime, getFormattedViews} from '../../data/videos.js';


document.addEventListener('DOMContentLoaded', function () {
    const videoData = localStorage.getItem('videoData');

    if (!videoData) {
        console.error('Nu există date video în localStorage.');
        return;
    }

    try {
        const video = JSON.parse(videoData);

        renderFilteredVideos(video);
        renderVideoInfo(video);
       
    } catch (error) {
        console.error('Eroare la parsarea datelor video:', error);
    }

});

async function renderVideoInfo(video) {
    const videoContainer = document.querySelector('.video-container');
    let account;

    try{
        account = await getAccount(video.accountId);

        if(!account)
            throw new Error();
    }catch(error){
        console.log(error);
    }

    videoContainer.innerHTML = `
        <div class="video-wrapper">
            <video class="js-video" controls autoplay>
                    <source src="${video.video}" type="video/mp4">
                    Your browser does not support the video tag.
            </video>
        </div>
            
        <div class="video-basic-info">
            <h1 clas="video-title">${video.title}</h1>
            <div class="profile-container">
                <div class="profile-info">
                    <img src="${account.profileImage}" alt="" class="profile-image">
                    <div class="profile-ajust">
                        <p class="profile-name">${account.name}</p>
                        <p class="profile-subscribes">${getFormattedSubscribers(account.subscribers)}</p>
                    </div>
                    <button class="subscribe-button">Subscribe</button>
                </div>
                
                <div class="ui-buttons">
                    <div class="likes">
                        <button class="like-button">Like</button>
                        <button class="unlike-button">Unlike</button>
                    </div>
                    <button class="share-button">Share</button>
                </div>
            </div>
        </div>
    `;
}

async function renderFilteredVideos(video) {
    const grid = document.querySelector('.grid-videos');
    let html = '';
    let data;

    try {
        const response = await fetch(`http://localhost:3000/filterVideos/${video.id}`);
        if (!response.ok) {
            if (response.status === 404) {
                console.error('Video not found');
            } else {
                console.error('Error fetching data:', response.statusText);
            }
        }
        data = await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    for (const videoItem of data) {
        try {
            
            const account = await getAccount(videoItem.accountId);

            if (!account) throw new Error('Account not found');

            
            html += `
            <div class="filter-video">
                <a href="" class="js-video-click" data-video-id="${videoItem.id}">
                    <img src="https://picsum.photos/400/250?random=${Math.floor(Math.random() * 1000)}" alt="video image">
                </a>
                <div class="video-info">
                    <a href="" class="title">${videoItem.title}</a>
                    <div class="profile-info">
                        <a href="" class="profile-name">${account.name}</a>
                        <p class="views-and-time">${getFormattedViews(videoItem)} ~ ${getFormattedTime(videoItem)}</p>
                    </div>
                </div>
            </div>
            `;
        } catch (error) {
            console.error('Error fetching account data:', error);
        }
    }

    
    grid.innerHTML = html;
}

