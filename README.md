# Act on Press

A web extension that let's you trigger click actions on press instead of release.

## How

- Make `a` and `button` tags trigger their click action on `mousedown` instead of `click`.
- Overload the `onclick` attribute to be `onmousedown` on every element.
- Overload the `addEventListener` function of every element, to rename `"click"` events to be `"mousedown"` events.
