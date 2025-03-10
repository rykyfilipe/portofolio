
export async function getAccount(accountId) {
    try {    
        const response = await fetch(`http://localhost:3000/account/${accountId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export function getFormattedSubscribers(accountSubscribers) {
    let subs = parseInt(accountSubscribers);

    if (subs >= 1_000_000_000) {
        return `${(subs / 1_000_000_000).toFixed(1)}B subscribers`;
    } else if (subs >= 1_000_000) {
        return `${(subs / 1_000_000).toFixed(1)}M subscribers`;
    } else if (subs >= 1_000) {
        return `${Math.floor(subs / 1_000)}K subscribers`;
    } else if (subs >= 1) {
        return `${subs} subscribers`;
    } else {
        return `1 subscriber`;
    }
}