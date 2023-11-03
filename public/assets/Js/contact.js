let fildes = document.querySelectorAll(".field-holder");
console.log(fildes);
fildes.forEach((ele) => {
  ele.children[1].onfocus = function () {
    ele.children[0].classList.add("label");
    ele.children[1].classList.add("field");
  };
  ele.children[1].onblur = function () {
    if (this.value.trim() === "") {
      ele.children[0].classList.remove("label");
      ele.children[1].classList.remove("field");
      this.value = "";
    }
  };
});



