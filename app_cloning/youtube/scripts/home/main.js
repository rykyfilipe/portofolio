import { videos, getVideos } from '../../data/videos.js';
import { renderVideosGrid } from '../home/render.js';

async function main() {
    try{
        await getVideos();
        await renderVideosGrid(videos);
    }
    catch(error){
        console.log(error);
    }
}

main();