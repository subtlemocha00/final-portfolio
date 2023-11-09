import { projectInfo } from './projectInfo.js';

const title = document.getElementById("title");
const image = document.getElementById("image");
const desc = document.getElementById("description");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");
const projCont = document.getElementById("projectContainer");
const projLink = document.getElementById("projectLink");
const dotContainer = document.getElementById('dotContainer');
let currentSlide = 0;

const setSlide = () => {
  const dots = document.querySelectorAll(".fa-circle");
  const project = projectInfo[currentSlide];
  title.textContent = project.title;
  image.src = project.image;
  image.alt = project.altImg;
  desc.textContent = project.description;
  projLink.href = project.link;
  dots.forEach(dot => dot.classList.remove('activeDot'))
  dots[currentSlide].classList.add('activeDot')
};
const prevSlide = () => {
  currentSlide === 0 ? (currentSlide = projectInfo.length - 1) : currentSlide--;
  setSlide();
};
const nextSlide = () => {
  currentSlide === projectInfo.length - 1 ? (currentSlide = 0) : currentSlide++;
  setSlide();
};

const renderDots = (numDots) => {
  for (let x = 0; x < numDots; x++) {
    const dot = document.createElement('i');
    dot.classList.add("col-1", "fa", "fa-circle");
    dotContainer.append(dot);
  }
}

renderDots(projectInfo.length)
setSlide();
leftBtn.addEventListener("click", prevSlide);
rightBtn.addEventListener("click", nextSlide);