# flight-modal

[![Build Status](https://secure.travis-ci.org/<username>/flight-modal.png)](http://travis-ci.org/<username>/flight-modal)

A [Flight](https://github.com/flightjs/flight) component for UI Modals

## Installation

```bash
bower install --save flight-modal
```

## Example

For a demo visit [https://giuseppeg.github.io/flight-modal](https://giuseppeg.github.io/flight-modal)

```javascript
define(function (require) {

	'use strict';

	var modal = require('component/modal');

	return initialize;

	function initialize() {
		modal.attachTo('#modal');

		modal.attachTo('#modal2', {
			autoOpen: true,
			closeEnabled: false
		});
	}
});
```

### Markup

What you need is a container (eg .modal) and a content container (eg .modal-content).

```html
<div class="modal" id="modal" data-size="l" data-effect="scale">
	<div class="modal-content">
		<div class="modal-header">
			<h2>Flight Modal</h2>
		</div>
		<div class="modal-body">
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
		</div>
		<div class="modal-footer">
			<p>&copy; Giuseppe Gurgone</p>
		</div>
		<nav aria-hidden="true">
			<a href="#modal" class="modal-close">close</a>
			<a href="#modal" class="modal-fullscreen-btn">toggle fullscreen</a>
		</nav>
	</div>
</div>
```

Flight modal takes care of the modal dialog only and it reacts to events.

Therefore it doesn't provide logic for an open button.

### CSS
Flight Modal doesn't ship with CSS.

However I wrote some CSS for the demo.

* [modal.css](https://giuseppeg.github.io/flight-modal/css/modal.css)
* [modal-theme.css](https://giuseppeg.github.io/flight-modal/css/modal-theme.css)
* [modal-effects.css](https://giuseppeg.github.io/flight-modal/css/modal-effects.css)

Feel free to use it.

#### Default Settings
* `dialogSelector: '.modal-content'` the modal dialog
* `activeClass: 'modal-is-active'` added to both the modal* and the `html` element
* `inactiveClass: 'modal-is-inactive'` added when the modal* is hidden
* `aboveClass: 'modal-is-above'` added to the last activated modal
* `toggleUsingCSS: false` it turns off the javascript hide/show logic and let you hiding/showing the modal with CSS (so that you can add fancy CSS3 effects for instance)
* `autoOpen: false` auto opens the modal after initialization

Close button
* `closeEnabled: true` if false disable the close functionality
* `closeBtnSelector: '.modal-close'` the close button

Fullscreen mode
* `fullScreenEnabled: true` if true allows you to toggle `fullScreenClass`
* `fullScreenClass: 'modal-fullscreen'` added to the modal* on toggle
* `fullScreenBtnSelector: '.modal-fullscreen-btn'` the toggle fullscreen button

\* the outer container

### Events
* `uiModalShown` fired when a modal is shown. The `eventData` object contains the modal id.
* `uiModalHided` fired when a modal is hided. The `eventData` object contains the modal id.
* `uiModalFullScreenEnabled` fired when a modal goes in fullscreen mode. The `eventData` object contains the modal id.
* `uiModalFullscreenDisabled` fired when a modal exits the fullscreen mode. The `eventData` object contains the modal id.
* `uiModalRequested` when fired opens all the modal dialogs in the page. Pass an id with the `eventData` object to open a specific modal eg. `this.trigger(document, 'uiModalRequested', { id: 'myModal'} )`
* `uiModalCloseRequested` when fired hides all the modal dialogs in the page. Pass an id with the `eventData` object to hide a specific modal eg. `this.trigger(document, 'uiModalCloseRequested', { id: 'myModal'} )`
* `uiModalToggleFullScreen` when fired with an id toggles the `fullScreenClass` class
* `uiModalTeardownAll` when fired it teardowns all the modal dialogs
* `uiModalTeardown` when fired with an id it teardowns the corrispondent modal

## Development

Development of this component requires [Bower](http://bower.io), and preferably
[Karma](http://karma-runner.github.io) to be globally installed:

```bash
npm install -g bower karma
```

Then install the Node.js and client-side dependencies by running the following
commands in the repo's root directory.

```bash
npm install
bower install
```

To continuously run the tests in Chrome and Firefox during development, just run:

```bash
karma start
```

## Contributing to this project

Anyone and everyone is welcome to contribute. Please take a moment to
review the [guidelines for contributing](CONTRIBUTING.md).

* [Bug reports](CONTRIBUTING.md#bugs)
* [Feature requests](CONTRIBUTING.md#features)
* [Pull requests](CONTRIBUTING.md#pull-requests)
