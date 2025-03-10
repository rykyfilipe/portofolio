import { getAccount } from '../../data/account.js';
import { getFormattedTime ,getFormattedViews } from '../../data/videos.js';

export async function renderVideosGrid(videos) {
    let htmlGrid = '';

    for (const video of videos) {
        try {
            const account = await getAccount(video.accountId);

            if (!account) throw new Error();

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
                                ${getFormattedViews(video)}
                                ~
                                ${getFormattedTime(video)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        htmlGrid += html;
    } catch (error) {
        console.log(error);
    }
    }
    document.querySelector('.grid').innerHTML = htmlGrid;
}
