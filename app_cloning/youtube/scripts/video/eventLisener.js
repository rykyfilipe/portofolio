import { renderUpdatedLikes } from "./render.js";

export  function likeEvent(videoDta) {
    const video = videoDta;
    const likeButton = document.querySelector('.like-button');
    const disLikeButton = document.querySelector('.dislike-button');

    let likeActive = false;
    let dislikeActive = false;

    likeButton.addEventListener('click', () => {
        if (!likeActive && !dislikeActive) {
            likeButton.classList.add("clicked");
            likeActive = true;
            disLikeButton.disabled = true;
            video.likes++;
            renderUpdatedLikes(video);

        } else if (likeActive) {
            likeButton.classList.remove("clicked");
            likeActive = false;
            disLikeButton.disabled = false;
            video.likes--;
            renderUpdatedLikes(video);
            
        }
    });

    disLikeButton.addEventListener('click', () => {
        if (!likeActive && !dislikeActive) {
            disLikeButton.classList.add("clicked");
            dislikeActive = true;
            likeButton.disabled = true; 
            video.dislikes++;
            renderUpdatedLikes(video);


        } else if (dislikeActive) {
            disLikeButton.classList.remove("clicked");
            dislikeActive = false;
            likeButton.disabled = false;
            video.dislikes--;
            renderUpdatedLikes(video);
        }
    });
}


export function getLocalVideoData(){
    const videoData = localStorage.getItem('videoData');

    if (!videoData) {
        console.error('Nu există date video în localStorage.');
        return;
    }

    try {
        const video = JSON.parse(videoData);
        
        return video;
        
    } catch (error) {
        console.error('Eroare la parsarea datelor video:', error);
    }


}