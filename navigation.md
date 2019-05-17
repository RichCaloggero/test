I believe I have a solution which may work.

Since the menus are not deeply nested, the screen reader user does not need to see "menu behavior" here; we can simply show the list structure as-is.

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
- be sure the top-level menu items have their labels wrapped in heading tags


