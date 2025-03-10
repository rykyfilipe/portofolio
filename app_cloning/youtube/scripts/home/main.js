import { getVideos } from '../../data/videos.js';
import { renderVideosGrid } from '../home/render.js';


async function main() {
    try{
        const videos = await getVideos();
        renderVideosGrid(videos);
    }
    catch(error){
        console.log(error);
    }
}

main();