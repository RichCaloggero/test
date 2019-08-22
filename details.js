class CollapsibleList extends HTMLUListElement {
static get observedAttributes() {
return ["data-label"];
} // get observedAttributes

constructor () {
super ();
this.root = this.attachShadow({mode: "open"});
} // constructor

connectedCallback () {
console.debug (`list connected:\n${this.innerHTML}`);
const root = this.shadowRoot;
const listItem = document.createElement("li");
root.appendChild(listItem);
if (this.hasAttribute("data-label")) {
const details = document.createElement("details");
const summary = document.createElement("summary");
summary.textContent = this.getAttribute("data-label");
details.appendChild(summary);
details.setAttribute("role", "presentation");
Array.from(this.childNodes).forEach (child => details.appendChild(child));
listItem.appendChild(details);

} else {
Array.from(this.childNodes).forEach (child => listItem.appendChild(child));
} // if
} // connectedCallback 

attributeChanged (name, value) {
console.log(`attributeChanged ${name}`);
} //attributeChanged 


} // class CollapsibleList

customElements.define ("collapsible-list", CollapsibleList, {extends: "ul"});
