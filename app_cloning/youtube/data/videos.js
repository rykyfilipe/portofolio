import { renderVideoInfo, renderFilteredVideos} from "../scripts/video/render.js";
import { getLocalVideoData,likeEvent } from "../scripts/video/eventLisener.js";
import { getAccount } from '../data/account.js';

export async function getVideos() {
    try {    
        const response = await fetch('http://localhost:3000/videos');
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data; 
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}   

export async function getFilteredVideos(video) {
    try {
        const response = await fetch(`http://localhost:3000/filterVideos/${video.id}`);
        if (!response.ok) {
            if (response.status === 404) {
                console.error('Video not found');
            } else {
                console.error('Error fetching data:', response.statusText);
            }
        }
        const data = await response.json();
        
        return data;

        } catch (error) {
            console.error('Error fetching data:', error);
        }
}

export function getFormattedViews(video) {
    
    let views = video.secondsFromPost;

    if (views >= 1_000_000_000) {
        return `${(views / 1_000_000_000).toFixed(1)}B views`;
    } else if (views >= 1_000_000) {
        return `${(views / 1_000_000).toFixed(1)}M views`;
    } else if (views >= 1_000) {
        return `${Math.floor(views / 1_000)}K views`;
    } else if (views >= 1){
        return `${views} views`; 
    }
    else
        return `1 view`; 
}


export function getFormattedTime(video) {
    
    let seconds = video.secondsFromPost;

    
    if (seconds > 1000000) {
        return "Posted a long time ago";
    }

    if (seconds < 60) {
        return `${seconds} second${seconds === 1 ? "" : "s"} ago`;
    } else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    } else if (seconds < 86400) {
        const hours = Math.floor(seconds / 3600);
        return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    } else {
        const days = Math.floor(seconds / 86400);
        return `${days} day${days === 1 ? "" : "s"} ago`;
    }
}

export function getFormattedLikes(video){
    const likes = video.likes;

    if (likes >= 1_000_000_000) {
        return `${(likes / 1_000_000_000).toFixed(1)}B `;
    } else if (likes >= 1_000_000) {
        return `${(likes / 1_000_000).toFixed(1)}M `;
    } else if (likes >= 1_000) {
        return `${Math.floor(likes / 1_000)}K `;
    } else if (likes >= 1){
        return `${likes} `; 
    }
    else
        return `1`; 
}   

export function getFormattedDislikes(video){
    const likes = video.dislikes;

    if (likes >= 1_000_000_000) {
        return `${(likes / 1_000_000_000).toFixed(1)}B `;
    } else if (likes >= 1_000_000) {
        return `${(likes / 1_000_000).toFixed(1)}M `;
    } else if (likes >= 1_000) {
        return `${Math.floor(likes / 1_000)}K `;
    } else
        return `${likes} `; 
}  

export async function updateVideoInfo(video) {
    let updatedVideo;

    try {
        fetch(`http://localhost:3000/video-update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ video }), 
        })
        .then(response => response.json()) 
        .then(data => updatedVideo = data)
        .catch(error => console.error('Eroare la request:', error));
    } catch (error) {
        console.error('Eroare generală:', error);
    }

    try {
        console.log(updatedVideo);
        const account = await getAccount(updatedVideo.accountId);
        console.log(updatedVideo);
        await renderVideoInfo(updatedVideo,account);
        
    } catch (error) {
        console.log(error);
    }

}
