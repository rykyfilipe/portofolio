

const submitButton = document.querySelector('.js-button');
submitButton.addEventListener('click',() => {

    const dateString = document.querySelector('.js-date-birth').value;
    const birthDate = new Date(dateString + "T00:00:00")

    const today = new Date();

    const days = (today - birthDate)  / (1000 * 3600 * 24);
    const age = (days / 365).toFixed(0);

    const result = document.querySelector('.js-result')
        .innerText = `Your age is ${age} years old.`; 
});

const submitAtEnter = document.querySelector('.js-date-birth');

submitAtEnter.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {  

        const dateString = submitAtEnter.value;
        const birthDate = new Date(dateString + "T00:00:00");

        if (isNaN(birthDate.getTime())) { 
            document.querySelector('.js-result').innerText = "Invalid date format!";
            return;
        }

        const today = new Date();
        const days = (today - birthDate) / (1000 * 3600 * 24);
        const age = Math.floor(days / 365); 

        document.querySelector('.js-result').innerText = `Your age is ${age} years old.`;
    }
});

