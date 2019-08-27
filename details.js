{ // local scope
const initialLevel = 2;
const id_treeActiveItem = "id_tree-active-item";

class CollapsibleList extends HTMLElement {
/*static get observedAttributes() {
return ["data-label"];
} // get observedAttributes
*/

constructor () {
super ();
} // constructor

connectedCallback () {
//console.debug (`list connected:\n${this.innerHTML}`);
const list = document.createElement("ul");
const parent = this.parentElement;
const noHeading = this.hasAttribute("no-heading");

if (this.hasAttribute("tree")) {
list.setAttribute("aria-activedescendant", id_treeActiveItem);
list.setAttribute("role", "tree");
this.tree = true;
} else if (this.tree === true) {
list.setAttribute("role", "group");
} // if

if (!this.level) {
console.log(`level is ${this.getAttribute("level")}`);
this.level = this.hasAttribute("level")? Number(this.getAttribute("level")) : initialLevel;
} // if

Array.from(this.children).forEach(child => {
if (!noHeading) child.level = this.level+1;
child.tree = this.tree;

if (child.matches("li")) {
 if (!this.tree) {
if (child.hasAttribute("data-href")) {
const hRef = child.getAttribute("data-href");
child.innerHTML = `<a href="${hRef}">${child.textContent}</a>`;
child.removeAttribute("data-href");

} else if (child.hasAttribute("data-action")) {
const action = child.getAttribute("data-action");
child.innerHTML = `<button data-action="${action}">${child.textContent}</button>`;
child.removeAttribute("data-action");
} // if
} // if

} else {
const listItem = document.createElement("li");
listItem.appendChild(child);
child = listItem;
} // if

if (this.tree) {
child.setAttribute("role", "treeitem");
if (child.querySelector("ul, collapsible-list")) child.setAttribute("aria-expanded", "false");
} // if

list.appendChild(child)
});

let container = list;
if (this.hasAttribute("data-label")) {
const labelText = this.getAttribute("data-label");
const details = document.createElement("details");
details.innerHTML = noHeading?
`<summary>${labelText}</summary>`
: `<summary><span role="heading" aria-level=${this.level.toString()}>${labelText}</span></summary>`;
details.setAttribute("role", "presentation");
details.appendChild(list);
container = details;
} // if

parent.replaceChild(container, this);
} // connectedCallback 

attributeChanged (name, value) {
console.log(`attributeChanged ${name}`);
} //attributeChanged 


} // class CollapsibleList

customElements.define ("collapsible-list", CollapsibleList);

} // end local scope

// utilities

function up (element) {
element = element.closest("role=tree > role=treeitem, role=group > role=treeitem");
if (element) {
console.log (`up: ${element.tagName}, element.getAttribute("role")`);

} else {
return null;
} // if
} // up

function down (element) {
element = element.querySelector("role=treeitem");
if (element) {
console.log (`down: ${element.tagName}, element.getAttribute("role")`);

} else {
return null;
} // if
} // down

function next (element) {
element = element.nextElementSibling;
if (element) {
console.log (`next: ${element.tagName}, element.getAttribute("role")`);

} else {
return null;
} // if
} // next

function previous (element) {
element = element.previousElementSibling;
if (element) {
console.log (`previous: ${element.tagName}, element.getAttribute("role")`);

} else {
return null;
} // if
} // previous

function markupTree (root) {
Array.from(root.querySelectorAll("li ul"))
.forEach(ul => ul.setAttribute("role", "group"));

Array.from(root.querySelectorAll("li"))
.forEach(li => {
li.setAttribute("role", "treeitem")
if (li.querySelector("ul")) li.setAttribute("aria-expanded", "false");
});

Array.from(root.querySelectorAll("a, button"))
.forEach(focusable => focusable.setAttribute("tabindex", "-1"));

root.setAttribute("aria-activedescendant", id_treeActiveItem);
root.setAttribute("role", "tree");
return root;
} // markupTree


