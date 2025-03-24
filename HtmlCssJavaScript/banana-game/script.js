/** @format */

// Game state variables
let counter = 0;
let money = parseInt(localStorage.getItem("money")) || 0;
let lastClickTime = 0;
let resetTimeout;
let mySkins = [];
let currentSkinId = 0;

// DOM element references for better performance
const domElements = {};

// Initialize skins array
const skins = [
	{ id: 0, src: "./banana_13.svg", price: 0 },
	{ id: 1, src: "./skins/banana_1.svg", price: 10 },
	{ id: 2, src: "./skins/banana_2.svg", price: 2 },
	{ id: 3, src: "./skins/banana_3.svg", price: 6 },
	{ id: 4, src: "./skins/banana_4.svg", price: 8 },
	{ id: 5, src: "./skins/banana_5.svg", price: 90 },
	{ id: 6, src: "./skins/banana_6.svg", price: 40 },
	{ id: 7, src: "./skins/banana_7.svg", price: 34 },
	{ id: 8, src: "./skins/banana_8.svg", price: 13 },
	{ id: 9, src: "./skins/banana_9.svg", price: 33 },
	{ id: 10, src: "./skins/banana_10.svg", price: 5 },
	{ id: 11, src: "./skins/banana_11.svg", price: 31 },
	{ id: 12, src: "./skins/banana_12.svg", price: 18 },
	{ id: 13, src: "./skins/banana_14.svg", price: 7 },
	{ id: 14, src: "./skins/banana_15.svg", price: 20 },
	{ id: 15, src: "./skins/banana_17.svg", price: 50 },
	{ id: 16, src: "./skins/banana_16.svg", price: 1 },
];

// Load skins from localStorage or use default
function loadSavedSkins() {
	try {
		const savedSkins = localStorage.getItem("my-skins");
		if (savedSkins) {
			mySkins = JSON.parse(savedSkins);
		}
	} catch (error) {
		console.log("Error loading skins, using default");
		mySkins = [];
	}
}

// Initialize game when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
	loadSavedSkins();
	initGame();
});

// Game initialization function
function initGame() {
	// Add default skin if none exist
	if (mySkins.length === 0) {
		mySkins.push(skins[0]);
		saveSkins();
	}

	createMenus();
	createMainContainer();

	// Store DOM elements for future use to avoid repeated queries
	cacheElements();
	loadProgress();
}

// Cache frequently accessed DOM elements
function cacheElements() {
	domElements.moneyDisplay = document.querySelector(".money");
	domElements.bananaImage = document.querySelector(".bannana-image");
	domElements.counterElement = document.querySelector(".counter");
	domElements.strikeElement = document.querySelector(".strike");
	domElements.shopContainer = document.querySelector(".shop-container");
	domElements.mySkinsContainer = document.querySelector(".my-skins");
}

// Load saved player progress
function loadProgress() {
	if (domElements.moneyDisplay) {
		domElements.moneyDisplay.innerText = `MONEY : ${money}`;
	}

	const savedSkinSrc = localStorage.getItem("selectedSkin");
	if (savedSkinSrc) {
		addBananaSkin(savedSkinSrc);
	} else {
		addBananaSkin(skins[0].src);
	}
}

// Helper functions for localStorage operations
function saveSkins() {
	localStorage.setItem("my-skins", JSON.stringify(mySkins));
}

function saveMoney() {
	localStorage.setItem("money", money);
}

function saveSelectedSkin(skinSrc) {
	localStorage.setItem("selectedSkin", skinSrc);
}

// Create menu structure
function createMenus() {
	const body = document.querySelector("body");

	// Create menu elements
	const menuOpen = document.createElement("img");
	menuOpen.src = "./assets/open.svg";
	menuOpen.classList.add("menu-open");

	const close = document.createElement("img");
	close.src = "./assets/close.svg";
	close.classList.add("menu-close");

	const menu = document.createElement("div");
	menu.classList.add("menu");

	// Optimize by creating a toggle function
	const toggleMenu = () => {
		menu.classList.toggle("show");
		menuOpen.classList.toggle("open");
	};

	menuOpen.addEventListener("click", toggleMenu);
	close.addEventListener("click", toggleMenu);

	// Create menu buttons

	const goToHome = createButton("Home", "menu-button", () => {
		toggleMenu();
		body.innerHTML = "<div id='game'></div>";
		initGame();
	});

	const goToMySkins = createButton("My Skins", "menu-button", () => {
		toggleMenu();
		createMySkinsContainer();
	});

	const goToShop = createButton("Shop", "menu-button", () => {
		toggleMenu();
		createShop();
	});

	menu.append(goToHome, goToMySkins, goToShop, close);
	body.prepend(menuOpen);
	body.append(menu);
}

// Helper function to create buttons
function createButton(text, className, onClick) {
	const button = document.createElement("button");
	button.textContent = text;
	button.classList.add(className);
	button.addEventListener("click", onClick);
	return button;
}

// Create main game container
function createMainContainer() {
	const gameRoot = document.getElementById("game");
	if (!gameRoot) return;

	// Create elements using document fragment for better performance
	const fragment = document.createDocumentFragment();

	// Create money and shop container
	const container = document.createElement("div");
	container.classList.add("money-shop-container");

	// Money display
	const moneyContainer = document.createElement("div");
	moneyContainer.classList.add("money-container");

	const moneyDisplay = document.createElement("h2");
	moneyDisplay.classList.add("money");
	moneyDisplay.innerText = `MONEY : ${money}`;
	moneyContainer.append(moneyDisplay);

	// Shop container
	const shopContainer = document.createElement("div");
	shopContainer.classList.add("shop-container");

	// My skins container
	const mySkinsDiv = document.createElement("div");
	mySkinsDiv.classList.add("my-skins");

	container.append(moneyContainer, shopContainer);
	fragment.appendChild(container);

	// Add banana and strike elements
	addBanana(skins[0].src, fragment);
	addStrike(fragment);

	fragment.appendChild(mySkinsDiv);
	gameRoot.appendChild(fragment);

	// Initialize skins display
	createSkins();
	updateMySkinsContainer();
}

// Change banana skin
function addBananaSkin(link) {
	if (domElements.bananaImage) {
		domElements.bananaImage.src = link;
	}
}

// Update My Skins container
function updateMySkinsContainer() {
	const skinsContainer = domElements.mySkinsContainer;
	if (!skinsContainer) return;

	// Clear and recreate skins display
	skinsContainer.innerHTML = "<h2>MY SKINS</h2>";

	const grid = document.createElement("div");
	grid.classList.add("skins-container");

	// Create fragment to minimize DOM operations
	const fragment = document.createDocumentFragment();

	mySkins.forEach((skin) => {
		const button = createButton("", "skin-button", () => {
			addBananaSkin(skin.src);
			saveSelectedSkin(skin.src);
		});

		const image = document.createElement("img");
		image.src = skin.src;
		image.alt = `Banana skin ${skin.id}`;

		button.append(image);
		fragment.appendChild(button);
	});

	grid.appendChild(fragment);
	skinsContainer.appendChild(grid);
}

// Create My Skins page
function createMySkinsContainer() {
	const body = document.querySelector("body");
	body.innerHTML = "";

	createMenus();
	const div = document.createElement("div");
	div.classList.add("my-skins-container");
	div.innerHTML = "<h2>MY SKINS</h2>";

	const fragment = document.createDocumentFragment();

	mySkins.forEach((skin) => {
		const button = createButton("", "skin-button", () => {
			saveSelectedSkin(skin.src);
			addBananaSkin(skin.src);

			body.innerHTML = "<div id='game'></div>";
			initGame();
		});

		const image = document.createElement("img");
		image.src = skin.src;
		image.alt = `Banana skin ${skin.id}`;

		button.append(image);
		fragment.appendChild(button);
	});

	div.appendChild(fragment);
	body.appendChild(div);
}

function createSkins() {
	cacheElements();

	const grid = domElements.shopContainer;
	if (!grid) return;
	domElements.shopContainer.innerHTML = "";

	const fragment = document.createDocumentFragment();

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

		if (skin.price > money) {
			button.classList.add("insuficent-money");
		}

		button.append(image, price);
		fragment.appendChild(button);
	});

	grid.appendChild(fragment);
}

function createShop() {
	const body = document.querySelector("body");

	body.innerHTML = `
        <div class='shop'>
            <div class='wrapper'>
                <h2 class="money-container">Money : ${money}</h2>
                <h2>Shop</h2>
            </div>
			<div class="bannana-container down"></div>
        </div>
    `;

	createMenus();

	const grid = document.querySelector(".shop");

	const fragment = document.createDocumentFragment();

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

		if (skin.price > money) {
			button.classList.add("insuficent-money");
		}

		button.append(image, price);
		fragment.appendChild(button);
	});

	grid.appendChild(fragment);
}

function buySkin(skinId) {
	const skin = skins[skinId];
	if (!skin) return;

	if (mySkins.some((ownedSkin) => ownedSkin.id === skin.id)) {
		showMessage("Skin already owned!", 3000);
		return;
	}

	if (skin.price <= money) {
		mySkins.push(skin);
		money -= skin.price;
		loadProgress();
		updateMoneyDisplay();
		updateMySkinsContainer();

		saveSkins();
		saveMoney();
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
		saveMoney();
	}
}

function updateMoneyDisplay() {
	let moneyDisplay = document.querySelector(".money");
	if (moneyDisplay) {
		moneyDisplay.innerText = `MONEY : ${money}`;
	} else {
		moneyDisplay = document.querySelector(".money-container");
		moneyDisplay.innerText = `MONEY : ${money}`;
	}
}

function addBanana(imageLink, parentElement) {
	const container = parentElement || document.getElementById("game");
	if (!container) return;

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
	container.append(div);

	button.addEventListener("dblclick", (event) => {
		event.preventDefault();
	});

	button.addEventListener("click", () => {
		updateShopButtons();

		clearTimeout(resetTimeout);
		lastClickTime = Date.now();

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

function updateShopButtons() {
	const buttons = document.querySelectorAll(".skin-button");
	buttons.forEach((button) => {
		const skinId = Number(button.dataset.id);
		if (skins[skinId] && skins[skinId].price > money) {
			button.classList.add("insuficent-money");
		} else {
			button.classList.remove("insuficent-money");
		}
	});
}

function addCounter(container) {
	const bananaContainer =
		container || document.querySelector(".bannana-container");
	if (!bananaContainer) return;

	const h2 = document.createElement("h2");
	h2.classList.add("counter");
	h2.innerText = "0";

	bananaContainer.append(h2);
}

function addStrike(parentElement) {
	const container =
		parentElement?.querySelector?.(".bannana-container") ||
		document.querySelector(".bannana-container");
	if (!container) return;

	const h1 = document.createElement("h1");
	h1.classList.add("strike");

	container.append(h1);
	addCounter(container);
}

function renderCounter(currentCounter) {
	if (domElements.counterElement) {
		domElements.counterElement.innerText = currentCounter;
	}
}

function toggleBananaZoom() {
	if (domElements.bananaImage) {
		domElements.bananaImage.classList.add("zoom");

		setTimeout(() => {
			domElements.bananaImage.classList.remove("zoom");
		}, 150);
	}
}

function updateStrike(currentCounter) {
	if (!domElements.strikeElement) return;

	const currentStrike = Math.floor(currentCounter / 10);

	if (currentStrike > 1) {
		domElements.strikeElement.innerText = `X${currentStrike} strike`;
	} else {
		domElements.strikeElement.innerText = "";
	}
}
