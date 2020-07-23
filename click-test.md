# NVDA Click Test

See instructions below.

- run: https://RichCaloggero/github.io/test/click-test.html


## Purpose

Exercise a possible NVDA bug which sends click to the wrong element.
This bug occurs when clicking elements made focusable via `tabindex="0"`; here we use `div`.


## Expected Behavior
When NVDA is running, and enter is pressed on a focusable element, NVDA will synthesize a click and fire it at the currently focused element.

## Actual Behavior

If the focused element is made focusable via `tabindex="0"`, and that element has focus, pressing the Enter key sends focus to the inner most element rooted at the currently focused element.

For instance, given the following tree:
- when focus on the element with id "outer", pressing enter with NVDA running fires a click at the element whose id is "innermost".
- moving tabindex to element with id "inner", focusing that element and pressing Enter, clicked still fires at element with id "innermost"

```
<div tabindex="0" id="outer">
<div id="inner">
<div id="innermost">
some text
</div>
</div>
</div>
```

## How to Use the Test Program

- select an element from the list (outermost element is selected by default)
- press tab
   + focus should move to the element just selected and it's ID  should be announced
- press Enter key
   + the ID of the element which received the click is announced
