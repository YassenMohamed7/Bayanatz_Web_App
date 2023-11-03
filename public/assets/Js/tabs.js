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
    console.log("funcation");
}
// for loop to set the tab link
for (var i = 0; i < btns.length; i++) {
    btns[i].onclick = function () {
        currenttab = parseInt(this.getAttribute("data-index"));
        animation();
    }
}
function cardContent(ele){
    document.getElementsByClassName("big__card")[0].children[0].src = ele.children[0].children[0].src ;
        document.getElementsByClassName("big__card")[0].children[1].textContent = ele.children[1].children[0].textContent;
        document.getElementsByClassName("big__card")[0].children[2].textContent = ele.children[1].children[1].textContent;
}
let cards = document.querySelectorAll(".small__card");
let changeCardContent = function(){
    for(let i = 0;i<cards.length;i++){
        if(cards[i].classList.contains("selected")){
            cardContent(cards[i])
        }
        cards[i].addEventListener("click",()=>{
            for(let i = 0;i<cards.length;i++){
                cards[i].classList.remove("selected")
            }
            cards[i].classList.add("selected");
            cardContent(cards[i])
        })
    }
}
changeCardContent();
export { changeCardContent }
