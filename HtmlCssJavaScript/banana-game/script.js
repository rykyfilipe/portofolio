/** @format */

let counter = 0;
let money = parseInt(localStorage.getItem("money")) || 0;
let lastClickTime = 0;
let resetTimeout;
let mySkins = [];

try {
	const savedSkins = localStorage.getItem("my-skins");
	if (savedSkins) {
		mySkins = JSON.parse(savedSkins);
	}
} catch (error) {
	console.log("Error loading skins, using default");
	mySkins = [];
}

const skins = [
	{
		id: 0,
		src: "./banana_13.svg",
		price: 0,
	},
	{
		id: 1,
		src: "./skins/banana_1.svg",
		price: 10,
	},
	{
		id: 2,
		src: "./skins/banana_2.svg",
		price: 2,
	},
	{
		id: 3,
		src: "./skins/banana_3.svg",
		price: 6,
	},
	{
		id: 4,
		src: "./skins/banana_4.svg",
		price: 8,
	},
	{
		id: 5,
		src: "./skins/banana_5.svg",
		price: 90,
	},
	{
		id: 6,
		src: "./skins/banana_6.svg",
		price: 40,
	},
	{
		id: 7,
		src: "./skins/banana_7.svg",
		price: 34,
	},
	{
		id: 8,
		src: "./skins/banana_8.svg",
		price: 13,
	},
	{
		id: 9,
		src: "./skins/banana_9.svg",
		price: 33,
	},
	{
		id: 10,
		src: "./skins/banana_10.svg",
		price: 5,
	},
	{
		id: 11,
		src: "./skins/banana_11.svg",
		price: 31,
	},
	{
		id: 12,
		src: "./skins/banana_12.svg",
		price: 18,
	},
	{
		id: 13,
		src: "./skins/banana_14.svg",
		price: 7,
	},
	{
		id: 14,
		src: "./skins/banana_15.svg",
		price: 20,
	},
	{
		id: 15,
		src: "./skins/banana_17.svg",
		price: 50,
	},
	{
		id: 16,
		src: "./skins/banana_16.svg",
		price: 1,
	},
];

document.addEventListener("DOMContentLoaded", function () {
	initGame();
});

function initGame() {
	if (mySkins.length === 0) {
		mySkins.push(skins[0]);
		localStorage.setItem("my-skins", JSON.stringify(mySkins));
	}

	createMainContainer();
	loadProgress();
}

function loadProgress() {
	const moneyElement = document.querySelector(".money");
	if (moneyElement) {
		moneyElement.innerText = `MONEY : ${money}`;
	}

	const savedSkin = localStorage.getItem("selectedSkin");
	if (savedSkin) {
		addBananaSkin(savedSkin);
	} else {
		addBananaSkin(skins[0].src);
	}
}

function createMenus() {
	const body = document.querySelector("body");

	const menuOpen = document.createElement("img");
	menuOpen.src = "./assets/open.svg";
	menuOpen.classList.add("menu-open");

	const close = document.createElement("img");
	close.src = "./assets/close.svg";
	close.classList.add("menu-close");

	const menu = document.createElement("div");
	menu.classList.add("menu");

	menuOpen.addEventListener("click", () => {
		menu.classList.add("show");
		menuOpen.classList.add("open");
	});

	close.addEventListener("click", () => {
		menu.classList.remove("show");
		menu.classList.add("hide");
		menuOpen.classList.remove("open");
	});

	body.prepend(menuOpen);

	menu.append(close);
	body.append(menu);
}

function createMainContainer() {
	const gameRoot = document.getElementById("game");
	if (!gameRoot) return;

	createMenus();

	const container = document.createElement("div");
	container.classList.add("money-shop-container");

	const moneyContainer = document.createElement("div");
	moneyContainer.classList.add("money-container");

	const moneyDisplay = document.createElement("h2");
	moneyDisplay.classList.add("money");
	moneyDisplay.innerText = `MONEY : ${money}`;
	moneyContainer.append(moneyDisplay);

	const shopContainer = document.createElement("div");
	shopContainer.classList.add("shop-container");

	const mySkinsDiv = document.createElement("div");
	mySkinsDiv.classList.add("my-skins");

	container.append(moneyContainer);
	container.append(shopContainer);
	gameRoot.append(container);

	addBanana(skins[0].src);
	addStrike();
	gameRoot.append(mySkinsDiv);

	createSkins();
	updateMySkinsContainer();
}

function addBananaSkin(link) {
	const image = document.querySelector(".bannana-image");
	if (image) {
		image.src = link;
	}
}

function updateMySkinsContainer() {
	const skinsContainer = document.querySelector(".my-skins");
	if (!skinsContainer) return;

	skinsContainer.innerHTML = "<h2>MY SKINS</h2>";

	const grid = document.createElement("div");
	grid.classList.add("skins-container");

	mySkins.forEach((skin) => {
		const button = document.createElement("button");
		button.classList.add("skin-button");

		button.addEventListener("click", () => {
			addBananaSkin(skin.src);
			localStorage.setItem("selectedSkin", skin.src);
		});

		const image = document.createElement("img");
		image.src = skin.src;
		image.alt = `Banana skin ${skin.id}`;
		button.append(image);
		grid.append(button);
	});

	skinsContainer.append(grid);
}

function createSkins() {
	const grid = document.querySelector(".shop-container");
	if (!grid) return;

	skins.forEach((skin) => {
		const button = document.createElement("button");
		button.classList.add("skin-button");
		button.dataset.id = skin.id;

		button.addEventListener("click", () => {
			buySkin(skin.id);
		});

		const price = document.createElement("p");
		price.classList.add("skin-price");
		price.innerText = skin.price;

		const image = document.createElement("img");
		image.src = skin.src;
		image.alt = `Banana skin ${skin.id}`;

		if (skin.price > money) button.classList.add("insuficent-money");
		else button.classList.remove("insuficent-money");

		button.append(image);
		button.append(price);
		grid.append(button);
	});
}

function buySkin(skinId) {
	const skin = skins[skinId];
	if (!skin) return;

	if (mySkins.some((ownedSkin) => ownedSkin.id === skin.id)) {
		addBananaSkin(skin.src);
		localStorage.setItem("selectedSkin", skin.src);
		showMessage("Skin already owned!", 3000);
		return;
	}

	if (skin.price <= money) {
		mySkins.push(skin);
		money -= skin.price;
		updateMoneyDisplay();
		updateMySkinsContainer();

		localStorage.setItem("my-skins", JSON.stringify(mySkins));
		localStorage.setItem("money", money);

		addBananaSkin(skin.src);
		localStorage.setItem("selectedSkin", skin.src);
	} else {
		showMessage("Insufficient money!", 3000);
	}
}

function showMessage(text, duration) {
	const message = document.createElement("p");
	message.innerText = text;
	message.classList.add("game-message");

	const container = document.querySelector(".bannana-container");
	if (container) {
		container.append(message);
		setTimeout(() => message.remove(), duration);
	}
}

function updateMoney(currentCounter) {
	if (currentCounter % 10 === 0 && currentCounter > 0) {
		const bonus = Math.floor(currentCounter / 10);
		money += bonus;
		updateMoneyDisplay();
		localStorage.setItem("money", money);
	}
}

function updateMoneyDisplay() {
	const moneyElement = document.querySelector(".money");
	if (moneyElement) {
		moneyElement.innerText = `MONEY : ${money}`;
	}
}

function addBanana(imageLink) {
	const gameRoot = document.getElementById("game");
	if (!gameRoot) return;

	const div = document.createElement("div");
	div.classList.add("bannana-container");

	const button = document.createElement("button");
	button.classList.add("btn");

	const image = document.createElement("img");
	image.classList.add("bannana-image");
	image.src = imageLink;
	image.alt = "Clickable banana";

	button.append(image);
	div.append(button);
	gameRoot.append(div);

	button.addEventListener("dblclick", function (event) {
		event.preventDefault();
	});

	button.addEventListener("click", () => {
		const buttons = document.querySelectorAll(".skin-button");

		buttons.forEach((button) => {
			const skinId = Number(button.dataset.id);

			if (skins[skinId] && skins[skinId].price > money) {
				button.classList.add("insuficent-money");
			} else {
				button.classList.remove("insuficent-money");
			}
		});

		const now = Date.now();

		clearTimeout(resetTimeout);
		lastClickTime = now;

		counter++;
		renderCounter(counter);
		toggleBananaZoom();
		updateMoney(counter);
		updateStrike(counter);

		resetTimeout = setTimeout(() => {
			counter = 0;
			renderCounter(counter);
			updateStrike(0);
		}, 2000);
	});
}

function addCounter() {
	const bananaContainer = document.querySelector(".bannana-container");
	if (!bananaContainer) return;

	const h2 = document.createElement("h2");
	h2.classList.add("counter");
	h2.innerText = "0";

	bananaContainer.append(h2);
}

function addStrike() {
	const container = document.querySelector(".bannana-container");
	if (!container) return;

	const h1 = document.createElement("h1");
	h1.classList.add("strike");

	container.append(h1);
	addCounter();
}

function renderCounter(currentCounter) {
	const counterElement = document.querySelector(".counter");
	if (counterElement) {
		counterElement.innerText = currentCounter;
	}
}

function toggleBananaZoom() {
	const bananaImage = document.querySelector(".bannana-image");
	if (bananaImage) {
		bananaImage.classList.toggle("zoom");

		setTimeout(() => {
			bananaImage.classList.remove("zoom");
		}, 150);
	}
}

function updateStrike(currentCounter) {
	const strikeElement = document.querySelector(".strike");
	if (!strikeElement) return;

	const currentStrike = Math.floor(currentCounter / 10);

	if (currentStrike > 1) {
		strikeElement.innerText = `X${currentStrike} strike`;
	} else {
		strikeElement.innerText = "";
	}
}
