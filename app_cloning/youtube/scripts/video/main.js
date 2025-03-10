import { renderVideoInfo, renderFilteredVideos} from "./render.js";
import { getLocalVideoData,likeEvent } from "./eventLisener.js";
import { getAccount } from '../../data/account.js';

async function main() {
    try{
        const video = await getLocalVideoData();
        const account = await getAccount(video.accountId);

        renderVideoInfo(video,account);
        renderFilteredVideos(video);
        likeEvent(video);
    }
    catch(error){
        console.log(error);
    }
}

main();