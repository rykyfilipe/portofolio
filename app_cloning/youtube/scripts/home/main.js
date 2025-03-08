import { videos, getVideos } from '../../data/videos.js';
import { renderVideosGrid } from '../home/render.js';
import { getAccounts } from '../../data/account.js';

async function main() {
    try{
        await getVideos();
        await getAccounts();
        renderVideosGrid(videos);
    }
    catch(error){
        console.log(error);
    }
}

main();