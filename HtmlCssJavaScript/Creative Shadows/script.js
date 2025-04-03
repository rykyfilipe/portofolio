/** @format */

const switchButton = document.querySelector(".button");
const scroll_items = document.querySelectorAll(".scroll-item");
const body = document.body;
const switchContainer = document.querySelector(".switch-container");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

let mode = false;

switchButton.addEventListener("click", () => {
	switchButton.classList.toggle("on");
	scroll_items.forEach((item, index) => {
		if (index < 2) {
			item.classList.toggle("dark");
			item.classList.toggle("light");
		}
		else {
			item.classList.toggle("dark-out");
			item.classList.toggle("light-out");
		}
	});

	body.classList.toggle("dark-color");
	switchContainer.classList.toggle("light-switch");

	mode = !mode;

	if (mode) {
		prev.src = "./arrow_back_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg";
		next.src = "./arrow_forward_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg";
	} else {
		prev.src = "./arrow_back_24dp_26282B_FILL0_wght400_GRAD0_opsz24.svg";
		next.src = "./arrow_forward_24dp_26282B_FILL0_wght400_GRAD0_opsz24.svg";
	}
});

const scroller = document.querySelector(".scroller");

document.querySelector(".prev").addEventListener("click", () => {
	scroller.scrollBy({ left: -250, behavior: "smooth" });
});

document.querySelector(".next").addEventListener("click", () => {
	scroller.scrollBy({ left: 250, behavior: "smooth" });
});
