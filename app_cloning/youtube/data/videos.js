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
