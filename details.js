class CollapsibleList extends HTMLElement {
static get observedAttributes() {
return ["data-label"];
} // get observedAttributes

constructor () {
super ();
this.root = this.attachShadow({mode: "open"});
} // constructor

connectedCallback () {
//console.debug (`list connected:\n${this.innerHTML}`);
const old = this;
const list = document.createElement("ul");
const parent = this.parentElement;

if (this.hasAttribute("data-label")) {
const labelText = this.getAttribute("data-label");
const top = parent.nodeName.toLowerCase() !== this.nodeName.toLowerCase();
const listItem = document.createElement("li");
const details = document.createElement("details");
details.innerHTML = top? `<h2>${labelText}` : labelText;
details.setAttribute("role", "presentation");

listItem.appendChild(details);
Array.from(this.children).forEach(child => details.appendChild(child));
list.append(listItem);

} else {
Array.from(this.children).forEach(child => list.appendChild(child));
} // if

parent.replaceChild(list, this);
} // connectedCallback 

attributeChanged (name, value) {
console.log(`attributeChanged ${name}`);
} //attributeChanged 


} // class CollapsibleList

customElements.define ("collapsible-list", CollapsibleList);
