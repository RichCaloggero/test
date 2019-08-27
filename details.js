{ // local scope
const initialLevel = 2;

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
if (!this.level) {
console.log(`level is ${this.getAttribute("level")}`);
this.level = this.hasAttribute("level")? Number(this.getAttribute("level")) : initialLevel;
} // if

Array.from(this.children).forEach(child => {
if (!noHeading) child.level = this.level+1;

if (child.matches("li")) {
 if (child.hasAttribute("data-href")) {
const hRef = child.getAttribute("data-href");
child.innerHTML = `<a href="${hRef}">${child.textContent}</a>`;
child.removeAttribute("data-href");

} else if (child.hasAttribute("data-action")) {
const action = child.getAttribute("data-action");
child.innerHTML = `<button data-action="${action}">${child.textContent}</button>`;
child.removeAttribute("data-action");
} // if

} else {
const listItem = document.createElement("li");
listItem.appendChild(child);
child = listItem;
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
