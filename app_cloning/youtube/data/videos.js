import { accounts} from "./account.js";

export const videos = [];

export async function getVideos() {
    try {    
        const response = await fetch('http://127.0.0.1:3658/m1/831093-810841-default/video');
        
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

export function getTime(videoId) {
    if (!videos[videoId]) {
        return "Invalid video ID";
    }

    let seconds = videos[videoId].secondsFromPost;

    
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

