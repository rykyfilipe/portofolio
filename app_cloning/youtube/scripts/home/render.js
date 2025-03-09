import { accounts, getAccount } from '../../data/account.js';
import { getFormattedTime ,getFormattedViews } from '../../data/videos.js';

export function renderVideosGrid(videos){
    
    let htmlGrid = '';

    videos.forEach(video => {
        const account = getAccount(video.accountId);

        if (!account) {
            console.warn(`No account found for accountId: ${video.accountId}`);
            return; 
        }

        const html = `
            <div class="grid-element">
                <a href="video.html" class="js-video-click" data-video-id="${video.id} ">
                    <img class="element-image" src="https://picsum.photos/400/250?random=${Math.floor(Math.random() * 1000)}" alt="">
                </a>
                <div class="info">       
                    <img class="element-profile-image" src="${account.profileImage}" alt="${account.name}">
                    <div class="description">
                        <a href="video.html" class="js-video-click" data-video-id="${video.id}">
                            <p class="title">${video.title}</p>
                        </a>
                        <div class="account-detailes">
                            <p class="name">${account.name}</p>
                            <p class="views">
                                ${getFormattedViews(video.id)}
                                ~
                                ${getFormattedTime(video.id)}
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
