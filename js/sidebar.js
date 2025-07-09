



/*===== EXPANDER MENU  =====*/
const showMenu = (toggleId, navbarId, bodyId) => {
  const toggle = document.getElementById(toggleId),
    navbar = document.getElementById(navbarId),
    bodypadding = document.getElementById(bodyId);

  if (toggle && navbar) {
    toggle.addEventListener("click", () => {
      navbar.classList.toggle("expander");

      bodypadding.classList.toggle("section-pd");
    });
  }
};
showMenu("nav-toggle", "navbar", "section-pd");


/*===== LINK ACTIVE  =====*/
const linkColor = document.querySelectorAll(".nav__link");
function colorLink() {
  linkColor.forEach((l) => l.classList.remove("active"));
  this.classList.add("active");
}
linkColor.forEach((l) => l.addEventListener("click", colorLink));



document.querySelector(".drop__link").addEventListener("click", function () {
    document.querySelector(".drop__menu").classList.toggle("showDrop");
    document.querySelector(".drop__link").classList.toggle("rotate");
});



