export const accounts = [
    { id: 0, name: "Crypto Academy", profileImage: "https://randomuser.me/api/portraits/men/1.jpg" },
    { id: 1, name: "Tech Review", profileImage: "https://randomuser.me/api/portraits/women/2.jpg" },
    { id: 2, name: "Gaming World", profileImage: "https://randomuser.me/api/portraits/men/3.jpg" },
    { id: 3, name: "Cooking Master", profileImage: "https://randomuser.me/api/portraits/women/4.jpg" },
    { id: 4, name: "Travel Vibes", profileImage: "https://randomuser.me/api/portraits/men/5.jpg" }
];

export function getAccount(accountID){
    
    return accounts.find(account => account.id == accountID);   
}