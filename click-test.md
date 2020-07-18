
_Note: this requires the webspeech API!_

## Purpose

Exercise a possible NVDA bug which sends click to the wrong element.
This bug occurs when clicking elements made focusable via `tabindex="0"`; here we use `div`.


## Expected Behavior
When NVDA is running, and enter is pressed on a focusable control, NVDA will synthesize a click and fire it at the currently focused element.

## Actual Behavior

When NVDA is not running, the element with focus receives a keydown, which can be used directly or can be used to fire a click at the element with focus.
In our test program, we report both the keydown and results of the subsequent click, and they both occur on the correct element, the one with focus.

When NVDA is running, NVDA synthesizes a click and sends it to the first element encountered via depth first search of the elements tree, rooted at the currently focused element.

For instance, given the following tree, with focus on the element with id "outer", pressing enter with NVDA running fires a click at the element whose id is "inner2".

```
<div tabindex="0" id="outer">
<div id="inner1">
<div id="inner2">inner most</div>
</div>
</div>
```

Given the following tree with focus on "outer", pressing enter first moves focus to the button, then fires a click at the button.

```
<div id="outer">
<button id="button">text</button>
</div>
```


## How to Use the Test Program

See link below to run the test.

1. With screen reader disabled
	- tab through the document
		+ focus is announced by speaking id or class of element gaining focus
	- press enter on each of the three focusable targets
		+ click handler should speak same info as focus except preceeded with the phrase "click on" rather than "focus on"

2. With screen reader enabled:
	- screen reader and speech API should match for focus
	- when enter is pressed on target "foo" and "result 1", click is sent to a child element rather than the element with focus

[click this link to run the test](https://RichCaloggero.github.io/test/click-test.html)
[click this link to display the code](https://RichCaloggero.githubusercontent.com/test/master/blob/click-test.html)
