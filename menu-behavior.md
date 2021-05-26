## Setup

Consider the following navigation.

The word "page" in item title means that it navigates to a separate page when clicked. If the item is followed by another list, it means that this list is shown on hover, hidden otherwise.

- people page
	+ job board page
	+ employee page
		+ directory page
	+ hr page
	+ payroll page
- campus housing page

## Initial conditions

Always begin each test with focus on "people page".

## Disclosure menu pattern

### Keyboard behavior

- enter: follows the link
- tab: focus lands on the menu toggle (often shown as a down arrow)
	+ enter or space: toggles the attached submenu
	+ tab: when submenu is showing sets focus to "job board page"
	+ tab: when submenu hidden, tab sets focus on "campus housing page"
- tab: with focus on "job board page" sets focus to "employee page"


### Screen reader

- screen reader says "people link"
- enter: follows the link
- tab: sets focus to menu toggle (announced as "people submenu, collapsed" when hidden, "people submenu, expanded" when showing)
	+ enter or space: toggles the attached submenu (menu title along with new state is announced)
	+ tab: when submenu is showing sets focus to "job board page" ("job board, link" is announced)
	+ tab: when submenu hidden sets focus to "campus housing page" ("campus housing, link" is announced)
- tab: with focus on "job board page",  sets focus to "employee page" ("employee submenu, collapsed" is announced)



