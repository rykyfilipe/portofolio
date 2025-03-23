/** @format */

const grid = document.querySelector(".scroller");

for (let i = 0; i < 50; i++) {
	const div = document.createElement("div");
	div.classList.add("image-container");

	const img = document.createElement("img");
	img.classList.add("element-image");
	img.src = `https://picsum.photos/400/250?random=${i}`;
	img.alt = "Random Image";

	div.appendChild(img);

	grid.appendChild(div);
}

const images = document.querySelectorAll(".element-image");
images.forEach((image) => {
	image.addEventListener("click", () => {
		const info = document.createElement("div");
		info.classList.add("info");
		info.innerText = "This is a random image";

		const container = image.closest(".image-container");
		container.appendChild(info);

		setTimeout(() => {
			container.removeChild(info);
		}, 2000);
	});
});
