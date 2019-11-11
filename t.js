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
trigger.setAttribute("aria-expanded", state);
//menu.style.display =  state === "true"? "block" : "none";
} // toggleMenu

} // end module
