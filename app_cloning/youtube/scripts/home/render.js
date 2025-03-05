import { videos} from '../../data/videos.js';
import { accounts, getAccount } from '../../data/account.js';

export function renderVideosGrid(){
    
    let htmlGrid = '';
    console.log(videos);

    videos.forEach(video => {
        const account = getAccount(video.accountId);

        if (!account) {
            console.warn(`No account found for accountId: ${video.accountId}`);
            return; // Skip this video if no account is found
        }

        const html = `
            <div class="grid-element">
                <img class="element-image" src="https://picsum.photos/400/250?random=${Math.floor(Math.random() * 1000)}" alt="">
                <div class="info">
                    <img class="element-profile-image" src="${account.profileImage}" alt="${account.name}">
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
