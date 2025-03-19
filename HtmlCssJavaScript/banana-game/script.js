/** @format */

document.addEventListener("dblclick", function (event) {
	event.preventDefault();
});

var counter = 0;
var money = 0;
let lastClickTime = 0;
let resetTimeout;

function createMainContainer() {
	const gameRoot = document.getElementById("game");

	const div = document.createElement("div");
	div.classList.add("money-shop-container");

	const div_1 = document.createElement("div");
	div_1.classList.add("money-container");
	const h2 = document.createElement("h2");
	h2.classList.add("money");
	h2.innerText = "MONEY : 0";
	div_1.append(h2);

	const div_2 = document.createElement("div");
	div_2.classList.add("shop-container");

	const div_3 = document.createElement("div");
	div_3.classList.add("my-skins");

	div.append(div_1);
	div.append(div_2);
	gameRoot.append(div);

	addBanana();
	addStrike();
	gameRoot.append(div_3);
	mySkinsContainer();
}

function mySkinsContainer() {
	const mySkinsContainer = document.querySelector(".my-skins");
	const h2 = document.createElement("h2");
	h2.innerText = "MY SKINS";
	mySkinsContainer.append(h2);
}

function updateMoney(currentCounter) {
	const moneyElement = document.querySelector(".money");
	const currentMoney = parseInt(
		moneyElement.innerText.replace("MONEY : ", ""),
		10,
	);

	if (currentCounter % 10 === 0) {
		moneyElement.innerText = "MONEY : " + (currentMoney + 1);
	}
}

function addBanana() {
	const gameRoot = document.getElementById("game");

	const div = document.createElement("div");
	div.classList.add("bannana-container");

	const button = document.createElement("button");
	button.classList.add("btn");

	const image = document.createElement("img");
	image.classList.add("bannana-image");
	image.src = "./banana-blackbarry-blackberries-svgrepo-com.svg";

	button.append(image);
	div.append(button);
	gameRoot.append(div);

	button.addEventListener("click", () => {
		const now = Date.now();

		clearTimeout(resetTimeout);

		lastClickTime = now;

		counter++;
		renderCounter(counter);
		zoomBannana();
		updateMoney(counter);
		strike(counter);

		resetTimeout = setTimeout(() => {
			counter = 0;
			renderCounter(counter);
			strike(0);
		}, 2000);
	});
}

function addCounter() {
	const bananaContainer = document.querySelector(".bannana-container");

	const h2 = document.createElement("h2");
	h2.classList.add("counter");
	h2.innerText = "0";

	bananaContainer.append(h2);
}

function addStrike() {
	const game = document.querySelector(".bannana-container");
	const h1 = document.createElement("h1");
	h1.classList.add("strike");

	game.append(h1);
}

function renderCounter(currentCounter) {
	const counterElement = document.querySelector(".counter");
	counterElement.innerText = currentCounter;
}

function zoomBannana() {
	const bannanaImage = document.querySelector(".bannana-image");
	bannanaImage.classList.toggle("zoom");
}

function strike(currentCounter) {
	const h1 = document.querySelector(".strike");
	const currentStrike = Math.floor(currentCounter / 10);

	if (currentStrike > 1) {
		h1.innerText = `X${currentStrike} strike!`;
	} else {
		h1.innerText = "";
	}
}

createMainContainer();
addCounter();
