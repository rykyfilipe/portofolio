import { accounts} from "./account.js";

export const videos = [];

export async function getVideos() {
    try {    
        const response = await fetch('http://localhost:3000/videos');
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        
        videos.length = 0; 
        videos.push(...data); 
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}   


export function getFormattedViews(videoId) {
    const video = videos.find(video => video.id === videoId);
    
    if (!video) {
        return "Invalid video ID";
    }
    
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


export function getFormattedTime(videoId) {
    const video = videos.find(video => video.id === videoId);
    
    if (!video) {
        return "Invalid video ID";
    }
    
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

