import { accounts } from "./account.js";

export const videos = [
    {
        id: 0,
        image: "https://source.unsplash.com/400x250/?technology",
        title: "ETH daily - Step by step tutorial for everyone!",
        accountId: 0,
        views: 100,
        hoursFromPost: 13
    },
    {
        id: 1,
        image: "https://source.unsplash.com/400x250/?blockchain",
        title: "Bitcoin vs Ethereum - Which one is better?",
        accountId: 0,
        views: 5432,
        hoursFromPost: 8
    },
    {
        id: 2,
        image: "https://source.unsplash.com/400x250/?computer",
        title: "Latest AI Tools You Should Know!",
        accountId: 1,
        views: 10987,
        hoursFromPost: 3
    },
    {
        id: 3,
        image: "https://source.unsplash.com/400x250/?gaming",
        title: "TOP 5 Games of 2025 - Must Play!",
        accountId: 2,
        views: 7500,
        hoursFromPost: 5
    },
    {
        id: 4,
        image: "https://source.unsplash.com/400x250/?recipe",
        title: "The Best Homemade Pizza Recipe",
        accountId: 3,
        views: 3900,
        hoursFromPost: 10
    },
    {
        id: 5,
        image: "https://source.unsplash.com/400x250/?travel",
        title: "Hidden Gems in Bali - Travel Guide",
        accountId: 4,
        views: 22000,
        hoursFromPost: 1
    },
    {
        id: 6,
        image: "https://source.unsplash.com/400x250/?coding",
        title: "JavaScript Crash Course for Beginners",
        accountId: 1,
        views: 54000,
        hoursFromPost: 6
    },
    {
        id: 7,
        image: "https://source.unsplash.com/400x250/?nature",
        title: "The Most Beautiful Places on Earth",
        accountId: 4,
        views: 18000,
        hoursFromPost: 4
    },
    {
        id: 8,
        image: "https://source.unsplash.com/400x250/?car",
        title: "Tesla Model X - Full Review",
        accountId: 1,
        views: 29000,
        hoursFromPost: 7
    },
    {
        id: 9,
        image: "https://source.unsplash.com/400x250/?fitness",
        title: "Best Exercises for Weight Loss",
        accountId: 3,
        views: 7200,
        hoursFromPost: 11
    },
    {
        id: 10,
        image: "https://source.unsplash.com/400x250/?music",
        title: "Top 10 Hits of the Month!",
        accountId: 2,
        views: 33000,
        hoursFromPost: 9
    },
    {
        id: 11,
        image: "https://source.unsplash.com/400x250/?robot",
        title: "The Future of Robotics and AI",
        accountId: 0,
        views: 5000,
        hoursFromPost: 12
    },
    {
        id: 12,
        image: "https://source.unsplash.com/400x250/?smartphone",
        title: "iPhone 15 vs Samsung S24 - Camera Test!",
        accountId: 1,
        views: 28000,
        hoursFromPost: 2
    },
    {
        id: 13,
        image: "https://source.unsplash.com/400x250/?movie",
        title: "Best Movies to Watch This Year",
        accountId: 2,
        views: 15000,
        hoursFromPost: 14
    },
    {
        id: 14,
        image: "https://source.unsplash.com/400x250/?food",
        title: "Street Food Around the World",
        accountId: 3,
        views: 8900,
        hoursFromPost: 5
    },
    {
        id: 15,
        image: "https://source.unsplash.com/400x250/?luxury",
        title: "Inside the Most Expensive Mansions",
        accountId: 4,
        views: 120000,
        hoursFromPost: 1
    },
    {
        id: 16,
        image: "https://source.unsplash.com/400x250/?pc",
        title: "Building a Gaming PC Under $1000",
        accountId: 1,
        views: 34000,
        hoursFromPost: 3
    },
    {
        id: 17,
        image: "https://source.unsplash.com/400x250/?astronomy",
        title: "Secrets of the Universe Explained!",
        accountId: 0,
        views: 6600,
        hoursFromPost: 6
    },
    {
        id: 18,
        image: "https://source.unsplash.com/400x250/?car",
        title: "Top 10 Supercars of 2025",
        accountId: 1,
        views: 45000,
        hoursFromPost: 4
    },
    {
        id: 19,
        image: "https://source.unsplash.com/400x250/?architecture",
        title: "The Most Amazing Buildings in the World",
        accountId: 4,
        views: 12000,
        hoursFromPost: 8
    }
];

// Generăm restul până la 30 de video-uri
for (let i = 20; i < 30; i++) {
    videos.push({
        id: i,
        image: `https://source.unsplash.com/400x250/?random&sig=${i}`,
        title: `Random Video ${i + 1}`,
        accountId: Math.floor(Math.random() * accounts.length),
        views: Math.floor(Math.random() * 100000),
        hoursFromPost: Math.floor(Math.random() * 24)
    });
}
