let myBtns = document.querySelectorAll(".view__more");
let hideBtns = document.querySelectorAll(".hide");

var boxs = Array.from(document.getElementsByClassName("work-cardes")),
  count = boxs.length,
  currenttab = 1,
  btns = Array.from(document.getElementsByClassName("header-p"));
// this funcation to remove the active classe from any main elements and add it to the element we need to active
function animation() {
  boxs.forEach(function (tab) {
    tab.classList.remove("card-active");
  });
  btns.forEach(function (dot) {
    dot.classList.remove("tap-active");
  });

  boxs[currenttab - 1].classList.add("card-active");
  btns[currenttab - 1].classList.add("tap-active");
}
// for loop to set the tab link
for (var i = 0; i < btns.length; i++) {
  btns[i].onclick = function () {
    currenttab = parseInt(this.getAttribute("data-index"));
    animation();
  };
}

function draggedSlider(sl) {
  let slider = sl;
  const end = () => {
    isDown = false;
  };

  const start = (e) => {
    isDown = true;
    slider.style.cursor = "grab";
    startX = e.pageX || e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  };

  const move = (e) => {
    if (!isDown) return;

    // e.preventDefault();
    slider.style.cursor = "grabbing";
    const x = e.pageX || e.touches[0].pageX - slider.offsetLeft;
    const dist = x - startX;
    slider.scrollLeft = scrollLeft - dist;
  };

  (() => {
    slider.addEventListener("mousedown", start);
    slider.addEventListener("touchstart", start);

    slider.addEventListener("mouseover", move);
    slider.addEventListener("touchmove", move);

    slider.addEventListener("mouseleave", end);
    slider.addEventListener("mouseup", end);
    slider.addEventListener("touchend", end);
  })();
}

let slide = document.querySelector(".interns");
function myFunction(x) {
  if (x.matches) {
    myBtns.forEach((ele)=>{
      ele.addEventListener('click',()=>{
        myBtns.forEach((InerEle)=>{
          InerEle.classList.remove("see__more");
        });
        ele.classList.add("hide");
        ele.parentElement.children[1].style.display = "block";
        ele.parentElement.style.height = "fit-content";
        ele.parentElement.lastElementChild.classList.add("see__more");
    
      })
    })
    hideBtns.forEach((ele)=>{
      ele.addEventListener('click',()=>{
        hideBtns.forEach((InerEle)=>{
          InerEle.classList.remove("see__more");
        });
        ele.parentElement.children[1].style.display = "none";
        ele.parentElement.style.height = "fit-content";
        ele.parentElement.children[2].classList.add("see__more");
      })
    })
    draggedSlider(slide);
  } else {
    return;
  }
}

var x = window.matchMedia("(max-width: 992px)");
myFunction(x); // Call listener function at run time
x.addListener(myFunction);
