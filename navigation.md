I believe I have a solution which may work.

Since the menus are not deeply nested, the screen reader user does not need to see "menu behavior" here; we can simply show the list structure as-is (see below).

Non-screen reader users (both mouse and keyboard users) can see menus open / close on focus.

This will work fine if the method of hiding the menus leaves them in the dom and available to screen reader users. Hiding with CSS display:none or with the HTML "hidden" attribute *will not work*, and will exhibit bad behavior with at least some screen readers.

Three possible ways of hiding then would be:

- via css opacity property;
- via css clip property
- moving off-screen via css positioning

If deciding to go this route, then:

- remove all menu roles (i.e. menubar, menu, menuitem, etc) from the navigation
- remove the role="alert" used to announce the key to be used to navigate to the menus on page load
- remove all keyboard handlers from the menus
- be sure the top-level menu items have their labels wrapped in heading tags (see below)

### HTML

```
<nav aria-label="site wide">
<ul><li>
<h2><a href="research.html">Research</a></h2>
<ul><li>...sub menu...</li></ul>
</li><li>
<h2><a href="about.html">About</a></h2>
<ul><li>...sub menu...</li></ul>
</li><li>
<h2><a href="tools.html">Tools</a></h2>
<ul><li>...sub menu...</li></ul>
</li></ul>
</nav>
```

### Javascript

```
hideAll();

// handles case where focus moves outside the nav
document.body.addEventListener ("focusin", e => {
if (!topMenu().contains(e.target)) {
hideAll();
message(`outside nav - hiding all`);
return;
} // if
}); // focus outside nav



topMenu().addEventListener("focusin", e => {
//setTimeout(() => {
focusIn(e);
//}, focusInDelay);
}); // cfocusin

function focusIn (e) {
message("focus in");
if (!e.target) return;

const label = e.target;
const menu = menuElement(label);
const parentMenu = closestMenu(label);
message(`selecting ${menu} with parent ${parentMenu.id}`);

if (parentMenu === topMenu()) {
message("top.");
if (menu && isHidden(menu)) show(menu);
} else {
message("sub menu.");
if (isHidden(parentMenu)) show(parentMenu);
} // if
label.focus();
} // focusIn
```

### See full working example here:

- runnable: https://RichCaloggero/github.io/test/navigation.html
- source: https://github.com/RichCaloggero/test/blob/master/navigation.html


