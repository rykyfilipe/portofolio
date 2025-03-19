/** @format */

const grid = document.querySelector(".photos-grid");

let html = "";

for (let i = 0; i < 50; i++) {
	html += `
        <img
            class="element-image"
            src="https://picsum.photos/400/250?random=${Math.floor(
							Math.random() * 1000,
						)}" 
            alt=""
        >
    `;
}

grid.innerHTML = html;

document.querySelectorAll(".column-button").forEach((button) => {
	button.addEventListener("click", () => {
		const grid = document.querySelector(".photos-grid");
		const columns = parseInt(button.textContent);
		grid.style.display = "grid";
		grid.style.gridTemplateColumns = `repeat(${columns}, minmax(0, 1fr))`;
	});
});
