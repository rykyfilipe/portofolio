document.addEventListener("DOMContentLoaded", function () {
    const navButton = document.querySelector(".nav-button");
    const sideNavbar = document.querySelector(".side-navbar");
    const sideNavbarElement = document.querySelectorAll(".nav-link");

    navButton.addEventListener("click", function () {
        sideNavbar.classList.toggle("active");
        sideNavbarElement.forEach(element => element.classList.toggle("active"));
    });
});
