export const accounts = [
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

export function getAccount(accountID){
    
    return accounts.find(account => account.id == accountID);   
}