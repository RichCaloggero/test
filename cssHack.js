const styles = document.styleSheets[0];
const rules = styles.cssRules;
const ruleText = `.disclosure-nav button:focus {
  border-color: #005a9c;
  outline: 5px solid rgba(0, 90, 156, 0.75);
  position: relative;
}`;

let ruleIndex = -1;

document.querySelector("#remove-position-relative").addEventListener("change", e => {
if (e.target.checked) ruleIndex = removePositionRelative();
else addPositionRelative(ruleIndex);
}); // switch styles

function removePositionRelative () {
const index = findRule(/button.*relative/);
if (index >= 0) {
rules.deleteRule(index);
return index;
} else {
alert ("relative position rule not found");
return -1;
} // if
} // removePositionRelative 

function addPositionRelative (index) {
rules.insertRule (ruleText, ruleIndex);
} // addPositionRelative


function findRule (text) {
for (let i=0; i<rules.length; i++) {
let rule = rules[i];
if (rule.cssText.toLowerCase().match(text)) return i;
} // for
return -1;
} // findRule

