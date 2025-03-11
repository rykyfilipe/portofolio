import {getAccount, getFormattedSubscribers} from '../../data/account.js';
import {getFormattedTime, getFormattedViews,getFormattedLikes,getFilteredVideos, getFormattedDislikes,updateVideoInfo} from '../../data/videos.js';


export async function renderVideoInfo(video, account) {
    const videoContainer = document.querySelector('.video-container');
    

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
                        <button class="like-button">
                            <img src="../assets/icons/like-button.svg" alt="">
                            <p class="likes-nr">${getFormattedLikes(video)}</p>
                        </button>
                        <button class="dislike-button">
                            <p class="dislikes-nr">${getFormattedDislikes(video)}</p>
                            <img class="inverted" src="../assets/icons/dislike-button.svg" alt="">
                        </button>
                    </div>
                    <button class="share-button">
                        <img class="inverted" src="../assets/icons/share-button.svg" alt="">    
                        Share
                    </button>
                </div>
            </div>
        </div>
    `;
}

export async function renderFilteredVideos(video) {
    const grid = document.querySelector('.grid-videos');
    let html = '';
    const videos = await getFilteredVideos(video);

    for (const videoItem of videos) {
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

export async function renderUpdatedLikes(video){
    try {
        const updatedVideo = await updateVideoInfo(video);
        console.log(updatedVideo);
        const account = await getAccount(updatedVideo.accountId);
        await renderVideoInfo(updatedVideo,account);

    } catch (error) {
        console.log(error);
    }
}