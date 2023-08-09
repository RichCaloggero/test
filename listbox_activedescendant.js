function listbox_activedescendant (l) {
const id = activeDescendantId(l.id);
l.setAttribute("role", "listbox");
l.setAttribute("tabindex", "0");
l.setAttribute("style", "list-style-type:none;");
l.querySelectorAll("li").forEach(x => x.setAttribute("role", "option"));

setInitialFocus(l);
l.addEventListener("keydown", manageFocus);

function setInitialFocus (listbox) {
const id = activeDescendantId(listbox.id);
if (listbox.children.length === 0) return;
const element = listbox.querySelector("[aria-selected]") || listbox.querySelector(`#${id}`) || listbox.children[0];
element.id = id;
element.setAttribute("aria-selected", "true");

listbox.setAttribute("aria-activedescendant", id);
} // setInitialFocus

function activeDescendantId (id) {
return `${id}-selected-item`;
} // generateActiveDescendantId 


function manageFocus (e) {
const listbox = e.target;
const selectedItemId = activeDescendantId(listbox.id);

let selectedItem = listbox.querySelector("[aria-selected]");
//console.log(selectedItem.textContent || selectedItem, " ", listbox);
if (not(selectedItem)) return;

const commands = {
"ArrowDown": function () {
let x = selectedItem.nextElementSibling;
if (x === null) x = 	listbox.children.length > 0? listbox.children[0] : selectedItem;
return x;
}, // next

"ArrowUp": function () {
let x = selectedItem.previousElementSibling;
if (x === null) x = listbox.children.length > 0? [...listbox.children].at(-1) : selectedItem;
return x;
}, // next
}; // commands

selectedItem.removeAttribute("id");
selectedItem.removeAttribute("aria-selected");
listbox.removeAttribute("aria-activedescendant");
if (e.key === "ArrowDown" || e.key === "ArrowUp") selectedItem = commands[e.key]();
selectedItem.setAttribute("id", selectedItemId);
selectedItem.setAttribute("aria-selected", "true");
listbox.setAttribute("aria-activedescendant", selectedItemId);
} // manageFocus
} // listbox_activedescendant
