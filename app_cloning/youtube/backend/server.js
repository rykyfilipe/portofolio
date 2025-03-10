const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors()); 

const videos = [
    {
        "id": 0,
        "image": "https://source.unsplash.com/400x250/?technology",
        "title": "ETH daily - Step by step tutorial for everyone!",
        "accountId": 0,
        "views": 100,
        "secondsFromPost": 46800,
        "video": "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
        "id": 1,
        "image": "https://source.unsplash.com/400x250/?blockchain",
        "title": "Bitcoin vs Ethereum - Which one is better?",
        "accountId": 0,
        "views": 5432,
        "secondsFromPost": 28800,
        "video": "https://www.w3schools.com/html/movie.mp4"
    },
    {
        "id": 2,
        "image": "https://source.unsplash.com/400x250/?cryptocurrency",
        "title": "Top 5 Altcoins to watch this year!",
        "accountId": 1,
        "views": 2341,
        "secondsFromPost": 54000,
        "video": "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
    },
    {
        "id": 3,
        "image": "https://source.unsplash.com/400x250/?finance",
        "title": "How to invest in crypto safely?",
        "accountId": 2,
        "views": 8756,
        "secondsFromPost": 72000,
        "video": "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
    },
    {
        "id": 4,
        "image": "https://source.unsplash.com/400x250/?bitcoin",
        "title": "Will Bitcoin reach $100k soon?",
        "accountId": 3,
        "views": 11234,
        "secondsFromPost": 36000,
        "video": "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
        "id": 5,
        "image": "https://source.unsplash.com/400x250/?ethereum",
        "title": "Ethereum 2.0 - What you need to know",
        "accountId": 4,
        "views": 7567,
        "secondsFromPost": 18000,
        "video": "https://www.w3schools.com/html/movie.mp4"
    },
    {
        "id": 6,
        "image": "https://source.unsplash.com/400x250/?nft",
        "title": "NFTs explained - Are they worth it?",
        "accountId": 5,
        "views": 3489,
        "secondsFromPost": 60000,
        "video": "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
    },
    {
        "id": 7,
        "image": "https://source.unsplash.com/400x250/?web3",
        "title": "What is Web3 and why does it matter?",
        "accountId": 6,
        "views": 9234,
        "secondsFromPost": 42000,
        "video": "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
        "id": 8,
        "image": "https://source.unsplash.com/400x250/?defi",
        "title": "Decentralized Finance (DeFi) for beginners",
        "accountId": 7,
        "views": 6123,
        "secondsFromPost": 51000,
        "video": "https://www.w3schools.com/html/movie.mp4"
    },
    {
        "id": 9,
        "image": "https://source.unsplash.com/400x250/?smartcontracts",
        "title": "How do smart contracts work?",
        "accountId": 8,
        "views": 4892,
        "secondsFromPost": 7200,
        "video": "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
    }
]
const accounts = [
    { id: 0, name: "Crypto Academy", profileImage: "https://randomuser.me/api/portraits/men/1.jpg" },
    { id: 1, name: "Tech Review", profileImage: "https://randomuser.me/api/portraits/women/2.jpg" },
    { id: 2, name: "Gaming World", profileImage: "https://randomuser.me/api/portraits/men/3.jpg" },
    { id: 3, name: "Cooking Master", profileImage: "https://randomuser.me/api/portraits/women/4.jpg" },
    { id: 4, name: "Travel Vibes", profileImage: "https://randomuser.me/api/portraits/men/5.jpg" },
    { id: 5, name: "Fitness Pro", profileImage: "https://randomuser.me/api/portraits/women/6.jpg" },
    { id: 6, name: "Auto Garage", profileImage: "https://randomuser.me/api/portraits/men/7.jpg" },
    { id: 7, name: "Science Hub", profileImage: "https://randomuser.me/api/portraits/women/8.jpg" },
    { id: 8, name: "Music Lovers", profileImage: "https://randomuser.me/api/portraits/men/9.jpg" },
    { id: 9, name: "Book Club", profileImage: "https://randomuser.me/api/portraits/women/10.jpg" },
    { id: 10, name: "Startup Talks", profileImage: "https://randomuser.me/api/portraits/men/11.jpg" },
    { id: 11, name: "Photography World", profileImage: "https://randomuser.me/api/portraits/women/12.jpg" },
    { id: 12, name: "Fashion Trends", profileImage: "https://randomuser.me/api/portraits/men/13.jpg" },
    { id: 13, name: "DIY Projects", profileImage: "https://randomuser.me/api/portraits/women/14.jpg" },
    { id: 14, name: "Art & Design", profileImage: "https://randomuser.me/api/portraits/men/15.jpg" },
    { id: 15, name: "Sports Fanatics", profileImage: "https://randomuser.me/api/portraits/women/16.jpg" },
    { id: 16, name: "History Buffs", profileImage: "https://randomuser.me/api/portraits/men/17.jpg" },
    { id: 17, name: "Tech Startups", profileImage: "https://randomuser.me/api/portraits/women/18.jpg" },
    { id: 18, name: "Space Explorers", profileImage: "https://randomuser.me/api/portraits/men/19.jpg" },
    { id: 19, name: "Pet Lovers", profileImage: "https://randomuser.me/api/portraits/women/20.jpg" }
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

app.get('/accounts', (req, res) => {
    console.log("Request received:", {
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        requestedUrl: req.originalUrl,
        method: req.method
    });
    
    res.json(accounts);
});


app.use(express.urlencoded({ extended: true }));

app.post('/search', (req, res) => {
    
    const searchQuery = req.body.query;

    console.log('Căutare:', searchQuery);
    res.send(findVideos(searchQuery));
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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

function findVideos(string){
    return videos.filter(video => video.title.includes(string));
}