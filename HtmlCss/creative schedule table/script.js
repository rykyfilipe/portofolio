document.addEventListener("DOMContentLoaded", () => {
    const weekButton = document.querySelector(".button"); // Selectăm butonul
    const daysList = document.querySelector(".days-list");

    weekButton.addEventListener("click", () => {
        daysList.classList.toggle("show-days"); // Alternăm clasa la fiecare click
    });
});
