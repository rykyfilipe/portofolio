/** @format */

const grid = document.querySelector(".photos-grid");

for (let i = 0; i < 50; i++) {
	const img = document.createElement("img");
	img.classList.add("element-image");
	img.src = `https://picsum.photos/400/250?random=${Math.floor(
		Math.random() * 1000,
	)}`;
	img.alt = "";

	grid.appendChild(img);
}

document.querySelectorAll(".column-button").forEach((button) => {
	button.addEventListener("click", () => {
		const grid = document.querySelector(".photos-grid");
		const columns = parseInt(button.textContent);
		grid.style.display = "grid";
		grid.style.gridTemplateColumns = `repeat(${columns}, minmax(0, 1fr))`;
	});
});
