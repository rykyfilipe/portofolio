let targetLocation = 'London';

const temperatureField = document.querySelector(".temp");
const locationField = document.querySelector(".time_location p");
const date_and_timeField = document.querySelector(".time_location span");
const conditionField = document.querySelector(".condition p");
const searchField = document.querySelector(".search_area");
const form = document.querySelector("form");

form.addEventListener('submit', searchForLocation);

const fetchResults = async () => {
    let url = `http://api.weatherapi.com/v1/current.json?key=8e38ae834720455bb6c83239252501&q=${targetLocation}&aqi=no`;

    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log(data);

        let locationName = data.location.name;
        let time = data.location.localtime;
        let condition = data.current.condition.text;
        let temp = data.current.temp_c;

        updateDetails(temp, locationName, time, condition);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
};

function updateDetails(temp, locationName, time, condition) {
    temperatureField.innerHTML = `${temp}°C`;
    locationField.innerHTML = locationName;
    date_and_timeField.innerHTML = time;
    conditionField.innerHTML = condition;
}

function searchForLocation(e) {
    e.preventDefault();
    targetLocation = searchField.value;
    fetchResults();
}

fetchResults();
