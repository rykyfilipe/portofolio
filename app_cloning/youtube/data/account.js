export const accounts = [];

export async function getAccounts() {
    try {    
        const response = await fetch('http://localhost:3000/accounts');
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        
        accounts.length = 0; 
        accounts.push(...data); 
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}   

export function getAccount(accountID){
    
    return accounts.find(account => account.id == accountID);   
}