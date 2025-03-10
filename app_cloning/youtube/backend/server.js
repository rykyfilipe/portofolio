const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors()); 

const videos = [
    {
        "id": 1,
        "image": "https://i.ytimg.com/vi/gWw23EYM9VM/maxresdefault.jpg",
        "title": "Exploring the Unknown",
        "accountId": 12,
        "views": 12500000,
        "secondsFromPost": 43000,
        "video": "https://www.w3schools.com/html/mov_bbb.mp4",
        "likes": 75234,
        "dislikes": 0
    },
    {
        "id": 2,
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Forest_in_winter.jpg/800px-Forest_in_winter.jpg",
        "title": "Winter Wonderland",
        "accountId": 8,
        "views": 9200000,
        "secondsFromPost": 54000,
        "video": "https://www.w3schools.com/html/mov_bbb.mp4",
        "likes": 58219,
        "dislikes": 842
    },
    {
        "id": 3,
        "image": "https://i.ytimg.com/vi/Dr9C2oswZfA/maxresdefault.jpg",
        "title": "Beneath the Surface",
        "accountId": 19,
        "views": 17000000,
        "secondsFromPost": 31000,
        "video": "https://www.w3schools.com/html/mov_bbb.mp4",
        "likes": 89231,
        "dislikes": 2310
    },
    {
        "id": 4,
        "image": "https://upload.wikimedia.org/wikipedia/commons/7/73/Grand_Canyon_2008.jpg",
        "title": "The Grand Canyon",
        "accountId": 5,
        "views": 15000000,
        "secondsFromPost": 45000,
        "video": "https://www.w3schools.com/html/mov_bbb.mp4",
        "likes": 67452,
        "dislikes": 950
    },
    {
        "id": 5,
        "image": "https://upload.wikimedia.org/wikipedia/commons/4/4f/SpaceX_Falcon_Heavy_Demo_Flight_Launch_%28SpaceX%29_1.jpg",
        "title": "Journey to Space",
        "accountId": 15,
        "views": 35000000,
        "secondsFromPost": 123000,
        "video": "https://www.w3schools.com/html/mov_bbb.mp4",
        "likes": 98412,
        "dislikes": 3451
    },
    {
        "id": 6,
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/The_Great_Barrier_Reef.jpg/1920px-The_Great_Barrier_Reef.jpg",
        "title": "Underwater Wonders",
        "accountId": 2,
        "views": 22000000,
        "secondsFromPost": 56000,
        "video": "https://www.w3schools.com/html/mov_bbb.mp4",
        "likes": 76932,
        "dislikes": 1200
    },
    {
        "id": 7,
        "image": "https://upload.wikimedia.org/wikipedia/commons/7/7d/Chicago_Skyline.jpg",
        "title": "Cityscapes",
        "accountId": 0,
        "views": 20000000,
        "secondsFromPost": 78000,
        "video": "https://www.w3schools.com/html/mov_bbb.mp4",
        "likes": 65841,
        "dislikes": 932
    },
    {
        "id": 8,
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Greenwich_Observatory%2C_London.jpg/1280px-Greenwich_Observatory%2C_London.jpg",
        "title": "Observing the Heavens",
        "accountId": 17,
        "views": 5000000,
        "secondsFromPost": 60000,
        "video": "https://www.w3schools.com/html/mov_bbb.mp4",
        "likes": 31254,
        "dislikes": 500
    },
    {
        "id": 9,
        "image": "https://upload.wikimedia.org/wikipedia/commons/d/d6/Machu_Picchu_1.jpg",
        "title": "Machu Picchu Adventure",
        "accountId": 6,
        "views": 19000000,
        "secondsFromPost": 32000,
        "video": "https://www.w3schools.com/html/mov_bbb.mp4",
        "likes": 84256,
        "dislikes": 1204
    },
    {
        "id": 10,
        "image": "https://upload.wikimedia.org/wikipedia/commons/6/6c/Eiffel_Tower_%28Paris%29.jpg",
        "title": "The Eiffel Tower",
        "accountId": 13,
        "views": 15000000,
        "secondsFromPost": 48000,
        "video": "https://www.w3schools.com/html/mov_bbb.mp4",
        "likes": 72351,
        "dislikes": 845
    },
    {
        "id": 11,
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/The_Roman_Colosseum.jpg/1920px-The_Roman_Colosseum.jpg",
        "title": "Roman History",
        "accountId": 10,
        "views": 22000000,
        "secondsFromPost": 34000,
        "video": "https://www.w3schools.com/html/mov_bbb.mp4",
        "likes": 79468,
        "dislikes": 1560
    },
    {
        "id": 12,
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Louvre_Museum_Paris.jpg/800px-Louvre_Museum_Paris.jpg",
        "title": "Louvre Museum Tour",
        "accountId": 3,
        "views": 12000000,
        "secondsFromPost": 60000,
        "video": "https://www.w3schools.com/html/mov_bbb.mp4",
        "likes": 61245,
        "dislikes": 740
    },
    {
        "id": 13,
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Kilimanjaro_2016.jpg/1200px-Kilimanjaro_2016.jpg",
        "title": "Climbing Kilimanjaro",
        "accountId": 7,
        "views": 24000000,
        "secondsFromPost": 82000,
        "video": "https://www.w3schools.com/html/mov_bbb.mp4",
        "likes": 87632,
        "dislikes": 1893
    },
    {
        "id": 14,
        "image": "https://upload.wikimedia.org/wikipedia/commons/4/4d/The_Ruins_of_Pompeii.jpg",
        "title": "Pompeii: A Lost City",
        "accountId": 18,
        "views": 14000000,
        "secondsFromPost": 71000,
        "video": "https://www.w3schools.com/html/mov_bbb.mp4",
        "likes": 55461,
        "dislikes": 620
    },
    {
        "id": 15,
        "image": "https://upload.wikimedia.org/wikipedia/commons/c/c4/Neuschwanstein_Castle_2017.jpg",
        "title": "Fairytale Castles",
        "accountId": 14,
        "views": 28000000,
        "secondsFromPost": 92000,
        "video": "https://www.w3schools.com/html/mov_bbb.mp4",
        "likes": 93257,
        "dislikes": 2150
    }
];

    
const accounts = [
    { id: 0, name: "Crypto Academy", profileImage: "https://randomuser.me/api/portraits/men/1.jpg", subscribers: 120000 },
    { id: 1, name: "Tech Review", profileImage: "https://randomuser.me/api/portraits/women/2.jpg", subscribers: 85000 },
    { id: 2, name: "Gaming World", profileImage: "https://randomuser.me/api/portraits/men/3.jpg", subscribers: 200000 },
    { id: 3, name: "Cooking Master", profileImage: "https://randomuser.me/api/portraits/women/4.jpg", subscribers: 95000 },
    { id: 4, name: "Travel Vibes", profileImage: "https://randomuser.me/api/portraits/men/5.jpg", subscribers: 150000 },
    { id: 5, name: "Fitness Pro", profileImage: "https://randomuser.me/api/portraits/women/6.jpg", subscribers: 110000 },
    { id: 6, name: "Auto Garage", profileImage: "https://randomuser.me/api/portraits/men/7.jpg", subscribers: 87000 },
    { id: 7, name: "Science Hub", profileImage: "https://randomuser.me/api/portraits/women/8.jpg", subscribers: 130000 },
    { id: 8, name: "Music Lovers", profileImage: "https://randomuser.me/api/portraits/men/9.jpg", subscribers: 175000 },
    { id: 9, name: "Book Club", profileImage: "https://randomuser.me/api/portraits/women/10.jpg", subscribers: 67000 },
    { id: 10, name: "Startup Talks", profileImage: "https://randomuser.me/api/portraits/men/11.jpg", subscribers: 90000 },
    { id: 11, name: "Photography World", profileImage: "https://randomuser.me/api/portraits/women/12.jpg", subscribers: 120000 },
    { id: 12, name: "Fashion Trends", profileImage: "https://randomuser.me/api/portraits/men/13.jpg", subscribers: 155000 },
    { id: 13, name: "DIY Projects", profileImage: "https://randomuser.me/api/portraits/women/14.jpg", subscribers: 78000 },
    { id: 14, name: "Art & Design", profileImage: "https://randomuser.me/api/portraits/men/15.jpg", subscribers: 95000 },
    { id: 15, name: "Sports Fanatics", profileImage: "https://randomuser.me/api/portraits/women/16.jpg", subscribers: 180000 },
    { id: 16, name: "History Buffs", profileImage: "https://randomuser.me/api/portraits/men/17.jpg", subscribers: 74000 },
    { id: 17, name: "Tech Startups", profileImage: "https://randomuser.me/api/portraits/women/18.jpg", subscribers: 102000 },
    { id: 18, name: "Space Explorers", profileImage: "https://randomuser.me/api/portraits/men/19.jpg", subscribers: 165000 },
    { id: 19, name: "Pet Lovers", profileImage: "https://randomuser.me/api/portraits/women/20.jpg", subscribers: 89000 }
];


app.get('/videos', (req, res) => {

    console.log("Request received:", {
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        requestedUrl: req.originalUrl,
        method: req.method
    });

    res.json(videos);
});

app.get('/account/:id', (req, res) => {
    const accountId = req.params.id;
    console.log("Request received:", {
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        requestedUrl: req.originalUrl,
        method: req.method
    });
    
    res.json(getAccount(accountId));
});


app.use(express.urlencoded({ extended: true }));

app.post('/search', (req, res) => {
    
    const searchQuery = req.body.query;

    console.log('Căutare:', searchQuery);
    res.send(findFilteredVideos(searchQuery));
});

app.post('/video-update', (req, res) => {
    try {
        const video = req.body.video; 
        console.log(video);
        res.json(video); 
    } catch (error) {
        console.error("Eroare la procesarea video-ului:", error);
        res.status(500).send("Eroare server");
    }
});

app.get('/video/:id', (req, res) => {
    const videoId = req.params.id;
    const video = videos.find(v => v.id === parseInt(videoId));

    if (video) {
        res.json(video);
    } else {
        res.status(404).json({ message: 'Video not found' });
    }
});

app.get('/filterVideos/:id', (req, res) => {
    const videoId = req.params.id;
    const video = videos.find(v => v.id === parseInt(videoId));

    if (video) {
        const titleWords = video.title.toLowerCase().split(/\s+/);  
        const filterVideos = videos.filter(v => 
            titleWords.some(word => v.title.toLowerCase().includes(word))
        );
        res.json(filterVideos);
    } else {
        res.status(404).json({ message: 'Video not found' });
    }
});



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

function findFilteredVideos(string){
    return videos.filter(video => video.title.includes(string));
}

function getAccount(accountId){
    return accounts.find(account => account.id == accountId);
}