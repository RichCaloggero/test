{ // local scope
const initialLevel = 2;

class CollapsibleList extends HTMLElement {
/*static get observedAttributes() {
return ["data-label"];
} // get observedAttributes
*/

constructor () {
super ();
this.root = this.attachShadow({mode: "open"});
} // constructor

connectedCallback () {
//console.debug (`list connected:\n${this.innerHTML}`);
const list = document.createElement("ul");
const listItem = document.createElement("li");
const parent = this.parentElement;
if (!this.level) this.level = initialLevel;

Array.from(this.children).forEach(child => {
child.level = this.level+1;

if (child.tagName.toLowerCase() === "li") {
 if (child.hasAttribute("data-href")) {
const hRef = child.getAttribute("data-href");
child.innerHTML = `<a href="${hRef}">${child.textContent}</a>`;

} else if (child.hasAttribute("data-action")) {
const action = child.getAttribute("data-action");
child.innerHTML = `<button data-action="${action}">${child.textContent}</button>`;
} // if
} // if

list.appendChild(child)
});
let container = list;
if (this.hasAttribute("data-label")) {
const labelText = this.getAttribute("data-label");
const top = parent.nodeName.toLowerCase() !== this.nodeName.toLowerCase();
const details = document.createElement("details");
details.innerHTML = `<summary><span role="heading" aria-level=${this.level.toString()}>${labelText}</span></summary>`;
details.setAttribute("role", "presentation");
details.appendChild(list);
container = details;
} // if

listItem.appendChild(container);
parent.replaceChild(listItem, this);
} // connectedCallback 

attributeChanged (name, value) {
console.log(`attributeChanged ${name}`);
} //attributeChanged 


} // class CollapsibleList

customElements.define ("collapsible-list", CollapsibleList);
} // end local scope
