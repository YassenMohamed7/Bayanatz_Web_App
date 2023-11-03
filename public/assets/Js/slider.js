"use strict";

const arrowBtns = document.querySelectorAll(".arrow-btn");
const carouselOne = document.querySelector(".carousel-one");
const carouselTwo = document.querySelector(".carousel-two");
const firstCardWidth = document.querySelector(".card").offsetWidth;
const secondCardWidth = document.querySelector(".serv_big-card").offsetWidth;
const langBtn = document.getElementById("language");
let lang = window.localStorage.getItem("language");
let changeArrow = (lang)=>{
  if(lang==="English"){
    arrowBtns[0].classList.remove("active_arrow")
    arrowBtns[2].classList.remove("active_arrow")
    arrowBtns[1].classList.add("active_arrow")
    arrowBtns[3].classList.add("active_arrow")
  }else{
    arrowBtns[1].classList.remove("active_arrow")
    arrowBtns[3].classList.remove("active_arrow")
    arrowBtns[0].classList.add("active_arrow")
    arrowBtns[2].classList.add("active_arrow")
  }
}
changeArrow(lang)
langBtn.addEventListener("click",()=>{
  if(window.localStorage.getItem("language")==="English"){
    lang="العربية"
  }else{
    lang="English"
  }

  changeArrow(lang)
})
let isDown = false;
let startX;
let scrollLeft;

function draggedSlider(sl){
  let slider = sl;
  const end = () => {
    isDown = false;
    slider.style.cursor = "grab";
    slider.classList.remove("no-smooth");
  }
  
  const start = (e) => {
    isDown = true;
    slider.style.cursor = "grab"
    startX = e.pageX || e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;	
  }
  
  const move = (e) => {
    if(!isDown) return;
  
    e.preventDefault();
    slider.style.cursor = "grabbing"
    const x = e.pageX || e.touches[0].pageX - slider.offsetLeft;
    const dist = (x - startX);
    slider.classList.add("no-smooth");
    slider.scrollLeft = scrollLeft - dist;
    activeArrowBtn(sl);
  }
  
  (() => {
    slider.addEventListener('mousedown', start);
    slider.addEventListener('touchstart', start);
    slider.addEventListener('mouseenter', start);

    slider.addEventListener('mousemove', move);
    slider.addEventListener('touchmove', move);
    
  
    slider.addEventListener('mouseleave', end);
    slider.addEventListener('mouseup', end);
    slider.addEventListener('touchend', end);
  })();
}
let maxScrollLeft;
let activeArrowBtn = (ele)=>{
  if(window.localStorage.getItem("language")==="English"){
    maxScrollLeft = (ele.scrollWidth - ele.clientWidth)+(ele.scrollLeft - Math.floor(ele.scrollLeft));
    if (ele === carouselOne){
      if(carouselOne.scrollLeft===0)
        arrowBtns[0].classList.remove("active_arrow");
      else
        arrowBtns[0].classList.add("active_arrow");
      if(carouselOne.scrollLeft===maxScrollLeft)
        arrowBtns[1].classList.remove("active_arrow");
      else
        arrowBtns[1].classList.add("active_arrow");
    }else{
      if(ele.scrollLeft>0)
        arrowBtns[2].classList.add("active_arrow");
      else
        arrowBtns[2].classList.remove("active_arrow");
      if(ele.scrollLeft<maxScrollLeft)
        arrowBtns[3].classList.add("active_arrow");
      else
        arrowBtns[3].classList.remove("active_arrow");
    }
  }else{
    maxScrollLeft = -((ele.scrollWidth - ele.clientWidth)-(ele.scrollLeft - Math.floor(ele.scrollLeft)));
    if (ele === carouselOne){
      if(carouselOne.scrollLeft===maxScrollLeft)
        arrowBtns[0].classList.remove("active_arrow");
      else
        arrowBtns[0].classList.add("active_arrow");
      if(carouselOne.scrollLeft>=-1)
        arrowBtns[1].classList.remove("active_arrow");
      else
        arrowBtns[1].classList.add("active_arrow");
    }else{
      if(ele.scrollLeft>maxScrollLeft)
        arrowBtns[2].classList.add("active_arrow");
      else
        arrowBtns[2].classList.remove("active_arrow");
      if(ele.scrollLeft>=-1)
        arrowBtns[3].classList.remove("active_arrow");
      else
        arrowBtns[3].classList.add("active_arrow");
    }
  }
}

let timeoutId1, timeoutId2;
arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const currentCarousel = btn.parentElement.nextElementSibling;
    if (currentCarousel === carouselOne) {
      carouselOne.scrollLeft +=
        btn.classList[1] === "left-btn" ? -firstCardWidth : firstCardWidth;      
      activeArrowBtn(carouselOne);
    } else {
      carouselTwo.scrollLeft +=
        btn.classList[1] === "left-btn" ? -secondCardWidth : secondCardWidth;
      activeArrowBtn(carouselTwo);
    }
  });
});



const autoPlay1 = () => {
  timeoutId1 = setTimeout(() => {
    carouselOne.scrollLeft += firstCardWidth;
    activeArrowBtn(carouselOne)
    autoPlay1();
  }, 3000);
  if (
    Math.round(carouselOne.scrollLeft) ===
    carouselOne.scrollWidth - carouselOne.offsetWidth
  ) {
    carouselOne.classList.toggle("no-smooth");
    carouselOne.scrollLeft = 0;
    carouselOne.classList.toggle("no-smooth");
  }
};

const autoPlay2 = () => {
  timeoutId2 = setTimeout(() => {
    carouselTwo.scrollLeft += firstCardWidth;
    activeArrowBtn(carouselTwo)
    autoPlay2();
  }, 5000);
  if (
    Math.round(carouselTwo.scrollLeft) ===
    carouselTwo.scrollWidth - carouselTwo.offsetWidth
  ) {
    carouselTwo.classList.toggle("no-smooth");
    carouselTwo.scrollLeft = 0;
    carouselTwo.classList.toggle("no-smooth");
  }
};
carouselOne.addEventListener("mouseenter", () => {
  clearTimeout(timeoutId1);
});
carouselOne.addEventListener("mouseleave", autoPlay1);
carouselTwo.addEventListener("mouseenter", () => {
  clearTimeout(timeoutId2);
});
carouselTwo.addEventListener("mouseleave", autoPlay2);
arrowBtns.forEach((btn) => {
  btn.addEventListener("mouseenter", () => {
    const currentCarousel = btn.parentElement.nextElementSibling;
    if (currentCarousel === carouselOne) {
      clearTimeout(timeoutId1);
    } else {
      clearTimeout(timeoutId2);
    }
  });
});

arrowBtns.forEach((btn) => {
  btn.addEventListener("mouseleave", () => {
    const currentCarousel = btn.parentElement.nextElementSibling;
    if (currentCarousel === carouselOne) {
      autoPlay1
    } else {
      autoPlay2
    }
  });
});

draggedSlider(carouselOne);
draggedSlider(carouselTwo);