{ // begin module
// all disclosure navs in document
const disclosureNavs = document.querySelectorAll("nav > ul.disclosure-nav");

disclosureNavs.forEach(disclosureNav => {
const topLevel = disclosureNav.children;
disclosureNav.addEventListener("click", toggleMenu);
});

function toggleMenu (e) {
const trigger = e.target;
const menu = trigger.parentElement.querySelector("ul");
const state = trigger.getAttribute("aria-expanded") === "true"? "false" : "true";
menu.style.display =  state === "true"? "block" : "none";
trigger.setAttribute("aria-expanded", state);
} // toggleMenu

} // end module
