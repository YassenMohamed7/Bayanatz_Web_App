
if(window.localStorage.getItem("language") == null){
    window.localStorage.setItem("language","English");
}

// remove loading page
function loadingPage() {
  if (document.getElementById("loading"))
    document.getElementById("loading").style.display = "none";
}

window.onload = function () {
  setTimeout(loadingPage, 500);
};
// open and close the nav bar
function viewMenue() {
  document.getElementById("navBar").classList.remove("hiden2");
  document.getElementById("navBar").classList.add("visible2");
}
function viewbackground() {
  document.getElementById("black").classList.remove("hiden");
  document.getElementById("black").classList.add("visible");
}
function deleteMenue() {
  document.getElementById("navBar").classList.remove("visible2");
  document.getElementById("navBar").classList.add("hiden2");
}
function deletebackground() {
  document.getElementById("black").classList.remove("visible");
  document.getElementById("black").classList.add("hiden");
}
document.getElementById("openMenue").onclick = function () {
  viewbackground();
  setTimeout(viewMenue, 500);
};
document.getElementById("closeTheNav").onclick = function () {
  deleteMenue();
  setTimeout(deletebackground, 500);
};
var navigationLinks = document.getElementsByClassName("nav-link");
for (var i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].onclick = function () {
    deleteMenue();
    setTimeout(deletebackground, 500);
  };
}
document.getElementById("year").textContent = new Date().getFullYear();
