import { beerList } from "./beerList.js";
import { foodList } from "./foodlist.js";

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
