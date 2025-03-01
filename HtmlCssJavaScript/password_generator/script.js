function generatePassword(length = 12) {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:',.<>?/";

    const allChars = uppercase + lowercase + numbers + symbols;
    let password = "";

    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];


    for (let i = password.length; i < length; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    password = password.split('').sort(() => 0.5 - Math.random()).join('');

    return password;
}

console.log(generatePassword(16));

const generatePasswordButton = document.querySelector('.js-generate-button');

generatePasswordButton.addEventListener('click', () => {
    const password = generatePassword(16);
    document.querySelector('.password').innerText = password;
});

const copyButton = document.querySelector('.js-copy');
copyButton.addEventListener('click', () => {
    const passwordText = document.querySelector('.password').innerText;
    
    
    const tempInput = document.createElement('textarea');
    tempInput.value = passwordText;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    if (!document.querySelector('.message')) {
        const message = document.createElement('p');
        message.classList.add('message');
        message.innerText = "Text copiat cu succes!";
        document.querySelector('.container').appendChild(message);

        setTimeout(() => {
            message.remove();
        }, 3000);
    }
});
