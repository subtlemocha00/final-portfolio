import { beerList } from "./beerList.js";

const menuBtns = document.querySelectorAll(".menuBtn");
const menuCont = document.getElementById("menuCont");

const menuBreweryUp = () => {
	menuCont.classList.toggle("visible");
};

menuBtns.forEach((button) => {
	button.addEventListener("click", menuBreweryUp);
});

// use JS to add nav items and links
const welcomeCont = document.getElementById("welcomeCont");
const welcomeBtn = document.getElementById("welcomeBtn");

welcomeBtn.addEventListener("click", () => {
	welcomeCont.scrollIntoView();
});

const contactCont = document.getElementById("contactCont");
const contactBtn = document.getElementById("contactBtn");

contactBtn.addEventListener("click", () => {
	contactCont.scrollIntoView();
});

const productCont = document.getElementById("productCont");
const productBtn = document.getElementById("productBtn");

productBtn.addEventListener("click", () => {
	productCont.scrollIntoView();
});

const breweryCont = document.getElementById("breweryCont");
const breweryBtn = document.getElementById("breweryBtn");

breweryBtn.addEventListener("click", () => {
	breweryCont.scrollIntoView();
});

beerList.forEach((beer) => {
	const productItemDiv = document.createElement("div");
	productItemDiv.classList.add("productItem");
	productItemDiv.innerHTML = `
  <figure class="productImage">
    <img src="${beer.image}" alt="${beer.name}" height="230px" />
    <figcaption>${beer.name} ${beer.alcoholContent}<figcaption/>
  </figure>
  <div class="productCont">
    <h2>${beer.name}</h2>
    <p class="productText">${beer.description}</p>
  </div>
    `;
	productCont.appendChild(productItemDiv);
});

const foodList = [
	{
		name: "Burger and Fries",
		price: "$15.99",
		description:
			"Our hamburger is made with a juicy, all-beef patty that is grilled to perfection and served on a toasted bun. It is topped with crisp lettuce, ripe tomato, and a tangy pickle, and it comes with a side of golden fries.",
		image: "./images/burger.svg",
	},
	{
		name: "Steak",
		price: "$20.99",
		description:
			"Our mouth-watering steak is a prime cut of beef, grilled to perfection and served with a side of your choice. The steak is tender and juicy, with a rich and savory flavor that will satisfy even the most discerning meat lovers.",
		image: "./images/steak.svg",
	},
	{
		name: "Chicken Sandwich and Fries",
		price: "$16.99",
		description:
			"Our chicken burger is a delicious and satisfying option for any meal. It is made with a juicy, grilled chicken patty, topped with lettuce, tomato, and mayonnaise, and served on a soft bun. The chicken is flavorful and tender, and the toppings add a fresh crunch to every bite.",
		image: "./images/chicken_sandwich.svg",
	},
	{
		name: "Bangers and Mash",
		price: "$12.99",
		description:
			"Bangers and mash is a classic pub dish featuring savory sausages and creamy mashed potatoes. Our version is made with juicy, flavorful sausages that are grilled to perfection and served atop a generous portion of creamy mashed potatoes. The dish is finished with a rich, savory gravy and a sprinkle of fresh herbs for added flavor.",
		image: "./images/bangers_n_mash.svg",
	},
	{
		name: "Fish and Chips",
		price: "$11.99",
		description:
			"Our fish and chips are a classic pub favorite. We use only the freshest, sustainably-caught fish, which we hand-batter and fry to perfection. Served with a generous portion of chips and a side of mushy peas, it's the perfect comfort food for any occasion.",
		image: "./images/fish_n_chips.svg",
	},
	{
		name: "Scotch Egg",
		price: "$12.99",
		description:
			"Try our delicious scotch egg, made with a soft-boiled egg wrapped in spicy sausage meat and coated in breadcrumbs. It's served with a side of mustard for dipping and makes a perfect appetizer or snack. Our scotch eggs are made with fresh, high-quality ingredients and are sure to satisfy your cravings.",
		image: "./images/scotch_egg.svg",
	},
];

const menuItemCont = document.getElementById("menuItems");

foodList.forEach((item) => {
	const menuItem = document.createElement("div");
	menuItem.classList.add("menuItem", "item");
	menuItem.innerHTML = `
    <img src="${item.image}" alt="${item.image}" class="menuImg img-fluid img-thumbnail w-75" />
    <span class="itemName">${item.name}</span>
    <span class="itemPrice">${item.price}</span>
    <span class="itemDesc">${item.description}</span>
  `;
	menuItemCont.appendChild(menuItem);
});
